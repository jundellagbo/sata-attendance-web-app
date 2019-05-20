<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\AttendanceRecords;
use App\Students;
use Auth;
use App\Subjects;
use App\Rooms;
use App\SmsSessions;
use App\Http\Controllers\LogsController; 

class AttendanceController extends Controller
{
    //
    private $apiKey = "0bee39393ec3eaa09571ad11d7e2dce2";

    public function _date() {
        return Carbon::now("Asia/Manila");
    }

    public function index( Request $req ) {
        return Attendance::where('roomid', $req->roomid)->where('user_id', Auth::user()->id)->get();
    }

    public function subjGenerator($json, $id) {
        $subj = Subjects::where("id", $id);
        if( $subj->count() == 0 ) {
            return $subj->get()[0]->subjectname;
        } else {
            return $json->subjectname;
        }
    }

    public function status( $json ) {
        $ret = "Absent";
        if( $json->late != "" ) {
            $ret = "Late " . $json->late;
        }
        else if( $json->present ) {
            $ret = "Present";
        }
        return $ret;
    }

    public function attendance_records( Request $req ) {
        $records = AttendanceRecords::where("roomid", $req->roomid)->where("subjectid", $req->subjectid)->whereBetween("date_recorded", [ $req->from, $req->to ] )->orderBy('date_recorded', 'ASC')->get();
        $students = Students::where("roomid", $req->roomid )->get();
        $subjects = Subjects::where("id", $req->subjectid)->get();
        if( Rooms::where("id", $req->roomid)->count() == 0 || Subjects::where("id", $req->subjectid)->count() == 0 ) {
            return response()->json(["response" => "404"]);
        }
        return response()->json(["response" => $records, "students" => $students, "subjects" => $subjects]);
    }

    public function summary( Request $req ) {
        $records = AttendanceRecords::where("roomid", $req->roomid )->where("date_recorded", $this->_date()->format("Y-m-d"));
        if( $records->count() != 0 ) {
            $data = array();
            foreach( $records->get() as $rec ) {
                $ret = array();
                $present = 0;
                $late = 0;
                $absent = 0;
                $ret["getSubject"] = $this->subjGenerator(json_decode($rec["subject"]), $rec["subjectid"]);
                foreach(json_decode($rec["records"]) as $counter) {
                    if( $counter->present ) {
                        $present++;
                    }
                    else if( $counter->late != "" ) {
                        $late++;
                    }
                    else {
                        $absent++;
                    }
                }
                $ret["present"] = $present;
                $ret["late"] = $late;
                $ret["absent"] = $absent;
                $data[] = $ret;
            }
            return response()->json(["response" => $data]);
        }
        return response()->json(["response" => 0]);
    }

    public function sms_setter( $roomid ) {
        $students = Students::where("roomid", $roomid )->get();
        $records = SmsSessions::where("roomid", $roomid );
        $data = array();
        foreach($students as $student) {
            $getStudent = array();
            foreach($records->get() as $getRec) {
                foreach(json_decode($getRec["records"]) as $_get) {
                    if( $student["id"] == $_get->id ) {
                        $getStudent[] = [
                            "subject" => $this->subjGenerator(json_decode($getRec["subject"]), $getRec["subjectid"]),
                            "status" => $this->status($_get)
                        ];
                    }
                }
            }
            $student["records"] = $getStudent;
            $data["students_records"][] = $student;
        }
        $data["countrecord"] = $records->count();
        return $data;
    }

    public function sms_confirmation( Request $req ) {
        $setter = $this->sms_setter( $req->roomid );
        if( $setter["countrecord"] != 0 ) {
            $ch = curl_init();
            curl_setopt( $ch, CURLOPT_URL,'https://api.semaphore.co/api/v4/account?apikey=0bee39393ec3eaa09571ad11d7e2dce2' );
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
            $output = curl_exec( $ch );
            curl_close ($ch);
            return response()->json(["response" => $setter["countrecord"], "semaphore" => json_decode($output) ], 200);
        }
        return response()->json(["response" => 0], 200);
    }

    public function send_sms( Request $req ) {
        $time = $this->_date()->format('H') > 13 ? "1:00 pm - 4:00 pm" : "8:00 am - 12:00 noon";
        $date = $this->_date()->format('F j, Y');
        $sms = $this->sms_setter( $req->roomid )["students_records"];
        foreach( $sms as $row ) {
            $mms = "";
            $mms .= 'Good day maam/sir,' . PHP_EOL . "" . PHP_EOL;
            $mms .= 'Attendance of Student  ' . $row["firstname"] . ' ' . $row["middlename"] . ' ' . $row["lastname"] . ' as of ' . $time . ' ' . $date . ' are as follows: ' . PHP_EOL . PHP_EOL;
            foreach( $row["records"] as $rec ) {
                $mms .= $rec["subject"] . " - " . $rec["status"] . PHP_EOL;
            }
            $mms .= PHP_EOL;
            $this->Semaphore( $row["guardian_contact"], $mms);
            SmsSessions::where("roomid", $req->roomid)->delete();
        }
        LogsController::store("Sending SMS for attendance.");
        return response()->json(["response" => "sent"], 200);
    }

    public function Semaphore( $number, $message ) {
        $ch = curl_init();
        $parameters = array(
            'apikey' => '0bee39393ec3eaa09571ad11d7e2dce2', //Your API KEY
            'number' => $number,
            'message' => $message,
            'sendername' => 'SataApp'
        );
        curl_setopt( $ch, CURLOPT_URL,'https://semaphore.co/api/v4/messages' );
        curl_setopt( $ch, CURLOPT_POST, 1 );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $parameters ) );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        $output = curl_exec( $ch );
        curl_close ($ch);
        return $output;
    }

    public function sms_template( $row, $records ) {
        $time = $this->_date()->format('H') > 13 ? "1:00 pm - 5:00 pm" : "8:00 am - 12:00 noon";
        $date = $this->_date()->format('F j, Y');
        return 'Good day maam/sir.' . PHP_EOL . "" . PHP_EOL .
        'Attendance of Student  ' . $row["firstname"] . ' ' . $row["middlename"] . ' ' . $row["lastname"] . ' as of ' . $time . ' ' . $date . ' are as follows: ' . PHP_EOL . "" . PHP_EOL .
        $records;
    }

    public function store_record( $instance, $req ) {
        $rec = $instance;
        $rec->date_recorded = $this->_date()->toDateString();
        $rec->records = $req->records;
        $rec->room = $req->room;
        $rec->user = Auth::user()->id;
        $rec->subject = $req->subject;
        $rec->time_recorded = $this->_date()->format('h:i A');
        $rec->roomid = $req->roomid;
        $rec->subjectid = $req->subjectid;
        $rec->save();
    }

    public function submit( Request $req ) {
        $this->store_record( new AttendanceRecords, $req );
        $this->store_record( new SmsSessions, $req );
        LogsController::store("Submitting an attendance.");
        return response()->json(["response" => "success"]);
    }

    public function send_updates( Request $req ) {
        $this->Semaphore( rtrim($req->number, ','), $req->message );
        LogsController::store("Sending updates through SMS.");
        return response()->json(["response" => "sent"], 200);
    }

    public function smsSelections( Request $req ) {
        $rooms = Rooms::all();
        if( $req->id != "all" ) {
            $students = Students::where("roomid", $req->id)->get();
        } else {
            $students = Students::all();
        }
        return response()->json(["rooms" => $rooms, "students" => $students ]);
    }

}

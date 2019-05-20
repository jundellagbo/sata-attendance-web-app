<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rooms;
use App\Students;
use Auth, Validator;
use App\Http\Controllers\LogsController; 

class StudentsController extends Controller
{
    //
    public function index(Request $req) {
        $room = Rooms::where("id", $req->id);
        if( $room->count() > 0 ) {
            $return = $room->first();
            $return["students"] = Students::where("roomid", $return->id)->get();
            return $return;
        }
        return 0;
    }

    public $rules = [
        "firstname" => "required",
        "middlename" => "required",
        "lastname" => "required",
        "address" => "required",
        "contact" => "required",
        "guardian_name" => "required",
        "guardian_contact" => "required"
    ];

    public $messages = [
        "required" => "The :attribute is required",
    ];

    public function store(Request $req) {
        $validator = Validator::make($req->all(), $this->rules, $this->messages);
        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }
        $students = $req->id != 0 ? Students::findOrFail((int)$req->id) : new Students;
        $students->firstname = $req->firstname;
        $students->middlename = $req->middlename;
        $students->lastname = $req->lastname;
        $students->address = $req->address;
        $students->contact = $req->contact;
        $students->guardian_name = $req->guardian_name;
        $students->guardian_contact = $req->guardian_contact;
        $students->userid = Auth::user()->id;
        $students->roomid = (int) $req->roomid;
        $students->save();

        $fullname = $req->firstname . " " . $req->middlename . " " . $req->lastname;
        $logs = $req->id != 0 ? "editing data of " . $fullname : "adding new student named " . $fullname;
        LogsController::store($logs);

        return response()->json(['response' => $students->id]);
    }

    public function remove( Request $req ) {
        $getStudent = Students::where("id", $req->id)->get()[0];
        LogsController::store("removing student named " . $getStudent->firstname . " " . $getStudent->middlename . " " . $getStudent->lastname);

        $student = Students::findOrFail($req->id);
        $student->delete();
        return response()->json(['response' => 0]);
    }

    public function search( Request $req ) {
        $val = "%" . $req->q . "%";
        $students = Students::where( function($query) use($val)  {
            $query->where("firstname", "LIKE", $val)
            ->orWhere("middlename", "LIKE", $val)
            ->orWhere("lastname", "LIKE", $val)
            ->orWhere("address", "LIKE", $val)
            ->orWhere("contact", "LIKE", $val)
            ->orWhere("guardian_name", "LIKE", $val)
            ->orWhere("guardian_contact", "LIKE", $val);
        })
        ->where("roomid", $req->roomid);
        return response()->json(['response' => $students->get()]);
    }
}

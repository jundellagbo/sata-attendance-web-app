<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Rooms;
use App\Students;
use App\Subjects;
use App\TracksModel as Tracks;
use App\StrandModel as Strands;
use App\LevelsModel as Levels;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LogsController;
use DB;

class RoomsController extends Controller
{
    public $rules = [
        "roomname" => "required"
    ];
    public $messages = [
        "required" => "The :attribute is required"
    ];

    public function index( Request $req ) {
        $levels = Levels::where("id", $req->id);
        if( !$levels->count() ) {
            return response()->json(["response" => 404]);
        }
        $rooms = Rooms::where("levelid", $req->id);
        return response()->json(["sections" => $rooms->get()]);
    }
    //
    public function _store(Request $req) {
        $validate = Validator::make($req->all(), $this->rules, $this->messages);
        if($validate->fails()) {
            return response()->json(['error' => $validate->messages()]);
        }
        $rooms = $req->id != 0 ? Rooms::findOrFail( $req->id ) : new Rooms;
        $rooms->roomname = $req->roomname;
        $rooms->levelid = $req->levelid;
        $rooms->save();
        $log = $req->id != 0 ? "editing section named " . $rooms->roomname : "adding new section named " . $rooms->roomname;
        LogsController::store($log);
        return response()->json(['response' => $rooms->id]);
    }

    public function search( Request $req ) {
        $val = "%" . $req->q . "%";
        $rooms = Rooms::where("roomname", "LIKE", $val)->where("levelid", $req->id);
        return response()->json(['response' => $rooms->get()]);
    }

    public function tracks() {
        $tracks = Tracks::all();
        return response()->json(['response' => $tracks]);
    }

    public function searchTracks( Request $req ) {
        $val = "%" . $req->q . "%";
        $tracks = Tracks::where("tracks", "LIKE", $val);
        return response()->json(['response' => $tracks->get()]);
    }

    public function _storeTrack(Request $req) {
        $validate = Validator::make($req->all(), ["tracks" => "required"], ["required" => "The track name is required"] );
        if($validate->fails()) {
            return response()->json(['error' => $validate->messages()]);
        }
        $rooms = $req->id != 0 ? Tracks::findOrFail( $req->id ) : new Tracks;
        $rooms->tracks = $req->tracks;
        $rooms->save();
        $log = $req->id != 0 ? "editing track named " . $rooms->tracks : "adding new track named " . $rooms->tracks;
        LogsController::store($log);
        return response()->json(['response' => $rooms->id]);
    }


    public function searchStrands( Request $req ) {
        $val = "%" . $req->q . "%";
        $tracks = Strands::where("strands", "LIKE", $val)->where("trackid", $req->id);
        return response()->json(['response' => $tracks->get()]);
    }

    public function _storeStrand(Request $req) {
        $validate = Validator::make($req->all(), ["strands" => "required"], ["required" => "The strand name is required"] );
        if($validate->fails()) {
            return response()->json(['error' => $validate->messages()]);
        }
        $rooms = $req->id != 0 ? Strands::findOrFail( $req->id ) : new Strands;
        $rooms->strands = $req->strands;
        $rooms->trackid = $req->trackid;
        $rooms->save();
        $log = $req->id != 0 ? "editing strand named " . $rooms->strands : "adding new strand named " . $rooms->strands;
        LogsController::store($log);
        return response()->json(['response' => $rooms->id]);
    }

    public function strands( Request $req ) {
        $tracks = Tracks::where("id", $req->id);
        if( !$tracks->count() ) {
            return response()->json(["response" => 404]);
        }
        $strands = Strands::where("trackid", $req->id);
        return response()->json(["strands" => $strands->get(), "track" => $tracks->get()[0]]);
    }

    public function levels( Request $req ) {
        $tracks = Strands::where("id", $req->id);
        if( !$tracks->count() ) {
            return response()->json(["response" => 404]);
        }
        $strands = Levels::where("strandid", $req->id);
        return response()->json(["levels" => $strands->get(), "strand" => $tracks->get()[0]]);
    }


    public function searchLevels( Request $req ) {
        $val = "%" . $req->q . "%";
        $levels = Levels::where("level", "LIKE", $val)->where("strandid", $req->id);
        return response()->json(['response' => $levels->get()]);
    }

    public function _storeLevel(Request $req) {
        $validate = Validator::make($req->all(), ["level" => "required"], ["required" => "The level name is required"] );
        if($validate->fails()) {
            return response()->json(['error' => $validate->messages()]);
        }
        $rooms = $req->id != 0 ? Levels::findOrFail( $req->id ) : new Levels;
        $rooms->level = $req->level;
        $rooms->strandid = $req->strandid;
        $rooms->save();
        $log = $req->id != 0 ? "editing strand level named " . $rooms->level : "adding new strand level named " . $rooms->level;
        LogsController::store($log);
        return response()->json(['response' => $rooms->id]);
    }

    public function remove( Request $req ) {
        $rooms = Rooms::findOrFail( $req->id );
        LogsController::store("removing strand named " . Rooms::where("id", $req->id )->get()[0]->roomname . ", including students and subjects.");
        $rooms->delete();
        $students = Students::where("roomid", $req->id);
        $students->delete();
        $subject = Subjects::where("roomid", $req->id);
        $subject->delete();
        return response()->json(['response' => 'removed']);
    }

    public function removev2( Request $req ) {

        if( !$req->option || $req->option == "" ) {
            return response()->json(["response" => "no option"]);
        }

        switch( $req->option ) {
            case 'tracks':
            $logs = "removing track named " . Tracks::where("id", $req->id )->get()[0]->tracks . ", including strand, level, rooms, subject and students under this track.";
            $sql = "delete tracks, strand, level, rooms, subject, students from `tracks` left join `strand` on `tracks`.`id` = `strand`.`trackid` left join `level` on `strand`.`id` = `level`.`strandid` left join `rooms` on `level`.`id` = `rooms`.`levelid` left join `subject` on `rooms`.`id` = `subject`.`roomid` left join `students` on `rooms`.`id` = `students`.`roomid` where `tracks`.`id` = ?";
            break;

            case 'strand':
            $logs = "removing strand named " . Strands::where("id", $req->id )->get()[0]->strands . ", including level, rooms, subject and students under this strand.";
            $sql = "delete strand, level, rooms, subject, students from `strand` left join `level` on `strand`.`id` = `level`.`strandid` left join `rooms` on `level`.`id` = `rooms`.`levelid` left join `subject` on `rooms`.`id` = `subject`.`roomid` left join `students` on `rooms`.`id` = `students`.`roomid` where `strand`.`id` = ?";
            break;

            case 'level':
            $logs = "removing level named " . Levels::where("id", $req->id )->get()[0]->level . ", including rooms, subject and students under this level.";
            $sql = "delete level, rooms, subject, students from `level` left join `rooms` on `level`.`id` = `rooms`.`levelid` left join `subject` on `rooms`.`id` = `subject`.`roomid` left join `students` on `rooms`.`id` = `students`.`roomid` where `level`.`id` = ?";
            break;
        }

        LogsController::store( $logs );
        DB::delete($sql, array($req->id));
        return response()->json(["response" => 'removed']);
    }
}

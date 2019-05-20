<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subjects;
use App\Http\Controllers\LogsController; 

class SubjectsController extends Controller
{
    //
    public function index( Request $req ) {
        $subjects = Subjects::where("roomid", $req->id);
        return response()->json(["response" => $subjects->get()]);
    }

    public function store( Request $req ) {
        $subj = $req->id != 0 ? Subjects::find( $req->id ) : new Subjects;
        $subj->subjectname = $req->subjectname;
        $subj->timein = $req->timein;
        $subj->timeout = $req->timeout;
        $subj->roomid = $req->roomid;
        $subj->save();
        $logs = $req->id != 0 ? "editing a subject named " . $req->subjectname : "adding a subject named " . $req->subjectname;
        return response()->json(["response" => $subj->id]);
    }

    public function remove( Request $req ) {
        LogsController::store("removing subject named " . Subjects::where("id", $req->id)->get()[0]->subjectname );
        $subj = Subjects::find( $req->id );
        $subj->delete();
        return response()->json(["response" => "success"]);
    }
}

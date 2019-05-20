<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth, App\Logs;

class LogsControllerv2 extends Controller
{
    //
    public $paging = 10;

    public function index() {
        return Logs::orderBy('id', 'desc')->paginate($this->paging);
    }

    public function search(Request $req) {
        $logs = Logs::where("datelog", "LIKE", "%" . $req->filter . "%")->orderBy('id', 'asc')->get();
        return response()->json(['response' => $logs]);
    }
}

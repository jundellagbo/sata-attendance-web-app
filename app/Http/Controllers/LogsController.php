<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Logs;
use Carbon\Carbon, Auth;

trait LogsController
{
    public static function store( $name ) {
        $dt = Carbon::now('Asia/Manila');
        $logs = new Logs;
        $logs->logname = Auth::user()->firstname . " (" . Auth::user()->username . ") - " . $name;
        $logs->userid = Auth::user()->id;
        $logs->datelog = $dt->format('m/d/Y h:i A');
        $logs->save();
    }
}

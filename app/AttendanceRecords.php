<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttendanceRecords extends Model
{
    //
    public $timestamps = false;
    public $table = "attendance_records";
    protected $fillable = [
        "records", "room", "user", "subject", "date_recorded", "time_recorded", "roomid", "subjectid"
    ];
}

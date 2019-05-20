<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SmsSessions extends Model
{
    //
    public $timestamps = false;
    public $table = "smslogs";
    protected $fillable = [
        "records", "room", "user", "subject", "date_recorded", "time_recorded", "roomid", "subjectid"
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subjects extends Model
{
    //
    public $timestamps = false;
    public $table = "subject";
    protected $fillable = [
        "roomid", "subjectname", "timein", "timeout"
    ];
}

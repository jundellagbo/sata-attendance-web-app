<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    //
    public $timestamps = false;
    public $table = "logs";
    protected $fillable = [
        "logname", "datelog", "userid"
    ];
}

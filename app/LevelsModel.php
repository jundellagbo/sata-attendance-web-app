<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LevelsModel extends Model
{
    //
    public $timestamps = false;
    public $table = "level";
    protected $fillable = [
        "level", "strandid"
    ];
}

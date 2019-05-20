<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TracksModel extends Model
{
    //
    public $timestamps = false;
    public $table = "tracks";
    protected $fillable = [
        "tracks"
    ];
}

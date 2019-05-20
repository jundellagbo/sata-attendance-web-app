<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    //
    public $timestamps = false;
    public $table = "rooms";
    protected $fillable = [
        "roomname", "levelid"
    ];

    protected $hidden = ["userid"];
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StrandModel extends Model
{
    //
    public $timestamps = false;
    public $table = "strand";
    protected $fillable = [
        "strands", "trackid"
    ];
}

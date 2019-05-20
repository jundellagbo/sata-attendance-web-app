<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    //
    public $timestamps = false;
    public $table = "students";
    protected $fillable = [
        "firstname", "middlename", "lastname", "address", "contact", "guardian_name", "guardian_contact", "userid", "roomid"
    ];

    protected $hidden = [
        "userid"
    ];
}

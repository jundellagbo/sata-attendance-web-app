<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    "prefix" => "auth"
], function() {
    Route::post("login", "UserController@login");
    Route::post("register", "UserController@register");
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::get("user", "UserController@user");
        Route::get("logout", "UserController@logout");
    });
});

Route::group([
    "prefix" => "users"
], function() {
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::post("add", "UserController@add");
        Route::get("/", "UserController@users");
        Route::get("remove", "UserController@delete");
        Route::post("edit", "UserController@edit");
        Route::get("search", "UserController@search");
        Route::get("confirmation", "UserController@confirmationUsers");
        Route::post("confirm", "UserController@confirm");
        Route::post("password/change", "UserController@resetPassword");
    });
});


Route::group([
    "prefix" => "rooms"
], function() {
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::post("store", "RoomsController@_store");
        Route::get("/", "RoomsController@index");
        Route::get("/remove", "RoomsController@remove");
        Route::get("/removev2", "RoomsController@removev2");
        Route::get("/search", "RoomsController@search");
        Route::get("/all", "RoomsController@getAll");
        
        Route::group([
            "prefix" => "tracks"
        ], function() {
            Route::get("/", "RoomsController@tracks");
            Route::get("/search", "RoomsController@searchTracks");
            Route::post("/store", "RoomsController@_storeTrack");
        });

        Route::group([
            "prefix" => "strands"
        ], function() {
            Route::get("/", "RoomsController@strands");
            Route::get("/search", "RoomsController@searchStrands");
            Route::post("/store", "RoomsController@_storeStrand");
        });

        Route::group([
            "prefix" => "levels"
        ], function() {
            Route::get("/", "RoomsController@levels");
            Route::get("/search", "RoomsController@searchLevels");
            Route::post("/store", "RoomsController@_storeLevel");
        });

        // Route::group([
        //     "prefix" => "strands"
        // ], function() {
        //     Route::get("/", "RoomsController@strands");
        // });

        Route::group([
            "prefix" => "subject"
        ], function() {
            Route::get("/", "SubjectsController@index");
            Route::post("/store", "SubjectsController@store");
            Route::get("/remove", "SubjectsController@remove");
        });

    });
});


Route::group([
    "prefix" => "students"
], function() {
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::get("/", "StudentsController@index");
        Route::post("/store", "StudentsController@store");
        Route::get("/remove", "StudentsController@remove");
        Route::get("/search", "StudentsController@search");
    });
});


Route::group([
    "prefix" => "logs"
], function() {
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::get("/", "LogsControllerv2@index");
        Route::get("filter", "LogsControllerv2@search");
    });
});

Route::group([
    "prefix" => "attendance"
], function() {
    Route::group([
        "middleware" => "auth:api"
    ], function() {
        Route::get("/summary", "AttendanceController@summary");
        Route::post("/submit", "AttendanceController@submit");
        Route::get("sms/confirm", "AttendanceController@sms_confirmation");
        Route::get("/sms/send", "AttendanceController@send_sms");
        Route::get("/records", "AttendanceController@attendance_records");
        Route::post("/sms/send/updates", "AttendanceController@send_updates");
        Route::get("/sms/selections", "AttendanceController@smsSelections");
    });
});
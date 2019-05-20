<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth; 
use Validator, Hash, Mail;
use App\Http\Controllers\LogsController; 

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        if( (Auth::attempt(['email' => $request->username, 'password' => $request->password, "confirmation" => 1])) 
        || (Auth::attempt(['username' => $request->username, 'password' => $request->password, "confirmation" => 1]))) { 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('user')->accessToken; 
            return response()->json(['response' => $success, "user" => $user ]);
        }
        else{

            $user = User::where(function($query) use($request) {
                $query->where("username", $request->username)
                ->orWhere("email", $request->username);
            })
            ->where("confirmation", 0);
            return response()->json([ 'response'=>'Unauthorised', 'count' => $user->count() ]);

        }
    }
    public function user() {
        return response()->json(['success' => Auth::user()]);
    }
    public function logout() {
        $user = Auth::user()->token();
        $user->revoke();
        return response()->json(['success' => 'logout']);
    }
    public function user_instance($req, $instance) {
        $user = $instance;
        $user->firstname    = $req->firstname;
        $user->middlename   = $req->middlename;
        $user->lastname     = $req->lastname;
        $user->contact      = $req->contact;
        $user->username     = $req->username;
        $user->email        = $req->email;
        return $user;
    }

    public $rules = [
        "firstname" => "required",
        "middlename" => "required",
        "lastname" => "required",
        "contact" => "required"
    ];

    public $messages = [
        "required" => "The :attribute is required",
        "unique" => "Sorry we did not recognize that :attribute",
        "email" => "Please enter a valid email address."
    ];


    // authenticated
    public function add(Request $req) {
        $rules = $this->rules;
        $rules["password"] = "required";
        $rules["username"] = "required|unique:users";
        $rules["email"] = "required|email|unique:users";

        $validator = Validator::make($req->all(), $rules, $this->messages);
        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        LogsController::store("adding new user named " . $req->firstname . " (" . $req->username . ")");
        $user = $this->user_instance($req, new User);
        $user->password     = Hash::make($req->password);
        $user->role         = $req->role;
        $user->confirmation = 1;
        $user->save();
        return response()->json(['response' => $user->id]);
    }
    
    // not authenticated
    public function register(Request $req) {
        $rules = $this->rules;
        $rules["password"] = "required";
        $rules["username"] = "required|unique:users";
        $rules["email"] = "required|email|unique:users";

        $validator = Validator::make($req->all(), $rules, $this->messages);
        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        $user = $this->user_instance($req, new User);
        $user->password     = Hash::make($req->password);
        $user->role         = 0;
        $user->confirmation = 0;
        $user->save();
        return response()->json(['response' => $user->id]);
    }

    public function users() {
        $users = User::where("confirmation", 1)->where("id", "!=", Auth::user()->id);
        return response()->json(['response' => $users->get()]);
    }

    public function delete( Request $req ) {
        $_user = User::where("id", $req->id)->get()[0];
        LogsController::store("removing user named " . $_user->firstname . " (" . $_user->username . ")");

        $user = User::findOrFail( $req->id );
        $user->delete();
        return response()->json(['response' => 'removed']);
    }

    public function confirmationUsers() {
        $users = User::where("role", 0)->where("confirmation", 0);
        return response()->json(['response' => $users->get()]);
    }

    public function edit( Request $req ) {
        $rules = $this->rules;
        $validator = Validator::make($req->all(), $rules, $this->messages);
        if($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }
        LogsController::store("editing user named " . $req->firstname . " (" . $req->username . ")");
        $user = $this->user_instance( $req, User::findOrFail( $req->id ) );
        $user->role = $req->role;
        $user->save();
        return response()->json(['response' => $req->id]);
    }

    public function search( Request $req ) {
        $val = "%" . $req->q . "%";
        $results = User::where(function($query) use($val) {
            $query->where("firstname", "LIKE", $val)
            ->orWhere("middlename", "LIKE", $val)
            ->orWhere("lastname", "LIKE", $val)
            ->orWhere("contact", "LIKE", $val)
            ->orWhere("username", "LIKE", $val)
            ->orWhere("email", "LIKE", $val);
        })
        ->where("role", 0)
        ->where("confirmation", 1);
        return response()->json(['response' => $results->get()]);
    }

    public function confirm( Request $req ) {
        $_getUser = User::where("id", $req->id)->get()[0];
        $user = User::findOrFail( $req->id );
        if( $req->type === "approve" ) {
            $user->confirmation = 1;
            LogsController::store("approving user named " . $_getUser->firstname . " (" . $_getUser->username . ")");
            $this->Semaphore( $_getUser->contact, "Your account has been approved!" . PHP_EOL . "" . PHP_EOL .  "You can now login to SATA with your username and password.");
            $user->save();
        } else {
            LogsController::store("declined user named " . $_getUser->firstname . " (" . $_getUser->username . ")");
            $user->delete();
        }
        return response()->json(['response' => 'saved']);
    }

    public function resetPassword( Request $req ) {
        $user = User::findOrFail( $req->id );
        $user->password = Hash::make( $req->password );
        $user->save();
        return response()->json(['response' => 'saved']);
    }
    
    public function Semaphore( $number, $message ) {
        $ch = curl_init();
        $parameters = array(
            'apikey' => '0bee39393ec3eaa09571ad11d7e2dce2', //Your API KEY
            'number' => $number,
            'message' => $message,
            'sendername' => 'SataApp'
        );
        curl_setopt( $ch, CURLOPT_URL,'https://semaphore.co/api/v4/messages' );
        curl_setopt( $ch, CURLOPT_POST, 1 );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $parameters ) );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        $output = curl_exec( $ch );
        curl_close ($ch);
        return $output;
    }
}

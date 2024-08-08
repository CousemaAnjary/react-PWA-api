<?php

namespace App\Http\Controllers\api\backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'age' => 'required|integer',
            'image_path' => 'nullable|string',
        ]);

        $user = User::create($request->all());

        return response()->json($user, 201);
    }
}
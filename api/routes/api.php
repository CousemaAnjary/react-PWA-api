<?php

use App\Http\Controllers\api\backend\UserController;
use App\Http\Controllers\TodoCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/user', [UserController::class, 'store']);

// Route to  todo cards
Route::get('/todo-cards', [TodoCardController::class, 'getTodoCards']);
Route::post('/todo-card', [TodoCardController::class, 'storeTodoCard']);
Route::put('/todo-card/{id}', [TodoCardController::class, 'updateTodoCard']);
Route::delete('/todo-card/{id}', [TodoCardController::class, 'destroyTodoCard']);
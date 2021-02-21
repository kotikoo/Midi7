<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\MainContoroller;
use App\Http\Controllers\Auth\SteamAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainContoroller::class, 'index'])->name('index');
Route::get('login', [SteamAuthController::class, 'login'])->name('login');
Route::get('logout', [LoginController::class , 'logout'])->name('logout');



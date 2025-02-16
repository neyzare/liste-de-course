<?php

use App\Http\Controllers\ProduitsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/produits', [ProduitsController::class, 'index']); 
Route::get('/produits/{id}', [ProduitsController::class, 'getById']); 
Route::post('/produits', [ProduitsController::class, 'store']); 
Route::put('/produits/{id}', [ProduitsController::class, 'update']); 
Route::delete('/produits/{id}', [ProduitsController::class, 'destroy']);
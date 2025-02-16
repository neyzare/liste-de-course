<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produits extends Model
{
    use HasFactory;

   // Dans ton modèle Produits
    protected $fillable = ['name', 'quantity'];  
}
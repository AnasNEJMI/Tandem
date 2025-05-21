<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Place extends Model
{
    /** @use HasFactory<\Database\Factories\PlaceFactory> */
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'user_id', 'category_id'];

    public function expenses(){
        return $this->belongsToMany(Expense::class)->withTimestamps();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}

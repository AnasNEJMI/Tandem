<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, Notifiable;

    protected $fillable = ['name','user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function places() {
    return $this->hasMany(Place::class);
}
}

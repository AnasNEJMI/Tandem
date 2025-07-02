<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Spender extends Model
{
    /** @use HasFactory<\Database\Factories\SpenderFactory> */
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'user_id', 'color'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}

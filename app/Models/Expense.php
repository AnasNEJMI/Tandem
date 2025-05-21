<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory, Notifiable;

    protected $fillable = ['amount', 'date', 'comment', 'user_id','spender_id', 'category_id'];

    public function places(){
        return $this->belongsToMany(Place::class)->withTimestamps();
    }

    public function spender(){
        return $this->belongsTo(Spender::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function place(){
        return $this->belongsTo(Place::class);
    }
}

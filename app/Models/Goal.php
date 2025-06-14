<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $fillable = ['goal', 'period', 'user_id', 'spender_id', 'category_id'];


    public function user(){
        return $this->belongsTo(User::class);
    }
    public function spender(){
        return $this->belongsTo(Spender::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
}

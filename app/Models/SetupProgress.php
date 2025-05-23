<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SetupProgress extends Model
{
    protected $fillable = [
        'user_id',
        'current_step',
        'is_completed',
    ];

    protected $casts = [
        'is_completed' => 'boolean'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}

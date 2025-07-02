<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    protected $fillable = ['user_id', 'theme', 'language','currency', 'number_format', 'date_format', 'charts_color', 'charts_style'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}

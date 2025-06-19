<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Goal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

class SettingsService{
    public static function setCategoryColor(User $user, $categoryId, $color){
        $category = Category::findOrFail($categoryId);

        if($category->user_id !== $categoryId){
            abort(403, 'Unauthorized action.');
        }

        $category->color = $color;
        $category->save();

    }
    public static function setSpenderColor(User $user, $spenderId, $color){
        $spender = Category::findOrFail($spenderId);

        if($spender->user_id !== $spenderId){
            abort(403, 'Unauthorized action.');
        }

        $spender->color = $color;
        $spender->save();
    }

}
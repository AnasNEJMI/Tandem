<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Goal;
use App\Models\Preference;
use App\Models\Spender;
use App\Services\GoalsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalsController extends Controller
{
    public function index(){
        $user = auth()->user();

        $categories = Category::where('user_id', $user->id)->get();
        $spenders = Spender::where('user_id', $user->id)->get();

        $stats = GoalsService::getGoalStats($user, 6);

        $preferences = Preference::where('user_id', $user->id)->firstOrFail();
        return Inertia::render('goals',[
            'goal_stats' => $stats,
            'categories' => $categories,
            'spenders' => $spenders,
            'preferences' => $preferences
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'spender_id' => 'required|integer|exists:spenders,id',
            'category_id' => 'required|integer|exists:categories,id',
            'goal_integer' => 'required|numeric|min:0|max:1000000',
            'goal_decimal' => 'required|numeric|min:0|max:99',
            'period' => 'required|string|max:1',
        ]);

        $user = auth()->user();

       $goal = floatval($validated['goal_integer'] . '.' . str_pad($validated['goal_decimal'], 2, '0', STR_PAD_LEFT));

        Goal::create([
            'user_id' => $user->id,
            'spender_id' => $validated['spender_id'],
            'category_id' => $validated['category_id'],
            'goal' => $goal,
            'period' => $validated['period'],
        ]);

        $stats = GoalsService::getGoalStats($user, 6);


        Inertia::render('goals', [
            'goal_stats' => $stats,
        ]);
    }
}

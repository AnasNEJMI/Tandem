<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Preference;
use App\Models\Spender;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PhpParser\Node\Scalar\MagicConst\Function_;
use App\Services\StatsService;

class StatsController extends Controller
{
    public function index(){

        $user = auth()->user();
        $user_id = auth()->id();

        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        $categories = Category::where('user_id', $user_id)->get();
        $spenders = Spender::where('user_id', $user_id)->get();
        
        $monthStats = StatsService::getMonthlySpendingStats($user, [['index'=>$month-2, 'year'=>$year], ['index'=>$month-1, 'year'=>$year],['index'=>$month, 'year'=>$year]]);
        $evolutionStats = StatsService::getSpendingEvolutionStats($user, 3, $spenders, $categories, 'comparison');
        
        $preferences = Preference::where('user_id', $user_id)->firstOrFail();

        return Inertia::render('stats', 
            [
                'month_stats' => $monthStats,
                'evolution_stats' => $evolutionStats,
                'spenders' => $spenders,
                'categories' => $categories,
                'preferences' => $preferences,
            ]);
    }

    public function getMonthStats(Request $request){
        $validated = $request->validate([
            'months' => 'required|array',
            'months.*.index' => 'required|integer',
            'months.*.year' => 'required|integer',
        ]);

        $user = auth()->user();

        $monthStats = StatsService::getMonthlySpendingStats($user, [
            ['index'=>$validated['months'][0]['index'], 'year'=>$validated['months'][0]['year']], 
            ['index'=>$validated['months'][1]['index'], 'year'=>$validated['months'][1]['year']], 
            ['index'=>$validated['months'][2]['index'], 'year'=>$validated['months'][2]['year']]
        ]);

        return Inertia::render('stats', 
            [
                'month_stats' => $monthStats
            ]);
    }

    public function getSpendingEvolutionStats(Request $request){
        $validated = $request->validate([
            'num_months' => 'required|integer',
            'spenders' => 'required|array',
            'spenders.*.id' => 'exists:spenders,id',
            'spenders.*.name' => 'string|max:50',
            'spenders.*.color' => 'string|max:100',
            'categories' => 'required|array',
            'categories.*.id' => 'exists:categories,id',
            'categories.*.name' => 'required|string|max:50',
            'categories.*.color' => 'required|string|max:100',
            'analysis_style' => 'required|string'
        ]);

        $user = auth()->user();

        $spendingEvolutionStats = StatsService::getSpendingEvolutionStats($user, $validated['num_months'],$validated['spenders'],$validated['categories'], $validated['analysis_style']);

        return Inertia::render('stats', 
            [
                'evolution_stats' => $spendingEvolutionStats,
            ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
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

        $expenses = Expense::with(['spender', 'category', 'places'])
                            ->where('user_id', $user_id)
                            ->get();
        
        $categories = Category::where('user_id', $user_id)->pluck('id')->toArray();
        $spenderIds = Spender::where('user_id', $user_id)->pluck('id')->toArray();

        $expensesByMonth = $expenses->groupBy(function($expense){ return Carbon::parse($expense->date)->format('Y-m');});
        $spendingTrendPerSpender = StatsService::getSpendingTrendPerSpender($user, $spenderIds);
        $stats = StatsService::getSpendingEvolutionByCategory($user, $categories);
        
        $monthStats = StatsService::getMonthlySpendingStats($user, [['index'=>$month-2, 'year'=>$year], ['index'=>$month-1, 'year'=>$year],['index'=>$month, 'year'=>$year]]);
        
        Log::debug('monthstats', ['stats', $monthStats]);
        return Inertia::render('stats', 
            [
                'expenses' => $expensesByMonth,
                'general_stats' => $stats,
                'per_spender_stats' => $spendingTrendPerSpender,
                'month_stats' => $monthStats
            ]);
    }

    public function store(Request $request){
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
}

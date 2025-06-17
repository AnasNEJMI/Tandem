<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Goal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

class GoalsService{
    public static function getGoalStats(User $user, $numPeriods){
        
        
        $goals = Goal::with('spender:id,name,color', 'category:id,name,color')
        ->where('user_id', $user->id)
        ->get(['id', 'goal', 'period','created_at', 'spender_id', 'category_id']);
        
        Log::debug('goals', ['goals', $goals]);
        
        collect($goals)->each(function($goal) use ($user, $numPeriods){
            $periods = collect();
            $end = Carbon::today();
            $start = Carbon::today();
            
            for($i = 0; $i< $numPeriods; $i++){
                $end = $start->copy();
    
                switch($goal['period']){
                    case 'w' : 
                        $start = $end->copy()->subWeek();
                        break;
                    case 'm' : 
                        $start = $end->copy()->subMonth();
                        break;
                    case 'y' : 
                        $start = $end->copy()->subYear();
                        break;
                    default : 
                        throw new InvalidArgumentException("Invalid period");
                }
    
                $periods->push([
                    'startDate' => $start->format('m-d-Y'),
                    'endDate' => $end->format('m-d-Y'),
                ]);
            }
    
            Log::debug('periods : ', $periods->toArray());
            
            $goal['stats'] = $periods->map(function($period) use ($user, $goal){
                $startDate = Carbon::createFromFormat('m-d-Y', $period['startDate'])->startOfDay();
                $endDate = Carbon::createFromFormat('m-d-Y', $period['endDate'])->endOfDay();
                $amount = Expense::where('user_id', $user->id)
                                    ->where('category_id', $goal->category_id)
                                    ->where('spender_id', $goal->spender_id)
                                    ->whereBetween('date', [$startDate, $endDate])
                                    ->sum('amount');
                return [
                    'startDate' => $period['startDate'],
                    'endDate' => $period['endDate'],
                    'amount' => $amount
                ];
            })->sortBy(function($stat) {
                    return Carbon::createFromFormat('m-d-Y', $stat['startDate']);
            })->values()->all();
        });

        
        Log::debug('goals : ', $goals->toArray());

        return $goals;
    }

}
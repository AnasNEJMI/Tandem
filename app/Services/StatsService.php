<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class StatsService{
    public static function getSpendingEvolutionByCategory(User $user,array $categoryIds){
        $expenses = Expense::with(['category', 'spender'])
                            ->where('user_id', $user->id)
                            ->whereIn('category_id', $categoryIds)
                            ->orderBy('date', 'asc')
                            ->get();
        $expensesByMonth = $expenses->groupBy(function($expense){
            $date = Carbon::parse($expense->date)->locale('fr')->timezone('Europe/Paris');
            return ucfirst($date->isoFormat('MMMM YYYY'));
        });

        $data = [];
        $config = [];
        
        foreach($expensesByMonth as $month => $expenses){
            $amount = $expenses->sum('amount');
            $data[] = [
                'month' => $month,
                'amount' => $amount,
            ];
        };

        $config['amount'] = [
            'label' => 'Total Dépensé',
            'color' => $expenses->first()->category->color,
        ];

        return [
            'data' => $data,
            'config' => $config,
        ];
    }


    public static function getSpendingTrendPerSpender(User $user,array $spenderIds){
        $expenses = Expense::with(['category', 'spender'])
                            ->where('user_id', $user->id)
                            ->whereIn('spender_id', $spenderIds)
                            ->orderBy('date', 'asc')
                            ->get();
        // $expensesByMonth = $expenses->groupBy(function($expense){
        //     $date = Carbon::parse($expense->date)->locale('fr')->timezone('Europe/Paris');
        //     return ucfirst($date->isoFormat('MMMM YYYY'));
        // });

        $data = [];
        $config = [];
        foreach($expenses as $expense){
            $date = Carbon::parse($expense->date)
                            ->locale('fr')
                            ->timezone('Europe/Paris');
            $month = ucfirst($date->isoFormat('MMMM YYYY'));

            $spenderName = $expense->spender->name;
            $spenderColor = $expense->spender->color;
            $amount = $expense->amount;
            
            if(!isset($config[$spenderName])){
                $config[$spenderName] = ['label' => $spenderName, 'color' => $spenderColor];
            }

            if(!isset($data[$month])){
                $data[$month] = ['month' => $month];
            }

            if(!isset($data[$month][$spenderName])){
                $data[$month][$spenderName] = 0;
            }

            $data[$month][$spenderName]+=$amount;   
        }

        return [
            'data' => array_values($data),
            'config' => array_values($config),
        ];
    }

    public static function getMonthlySpendingStats(User $user,array $months){
        //build the array of date ranges
        $dateRanges = collect($months)->map(function($month){
            $start = Carbon::createFromDate($month['year'], $month['index'], 1)->startOfMonth();
            $end = Carbon::createFromDate($month['year'], $month['index'], 1)->endOfMonth();
            return ['start' => $start, 'end' => $end];
        });

        //build the query
        $query = Expense::with(['category', 'spender'])
                        ->where('user_id', $user->id)
                        ->where(function($q) use ($dateRanges){
                            foreach($dateRanges as $range){
                                $q->orWhereBetween('date', [$range['start'], $range['end']]);
                            }
                        })->orderBy('date', 'asc');

        //fetch the expenses
        $expenses = $query->get();

        return collect($months)->map(function($month) use ($expenses){
            $monthIndex = $month['index'];
            $year = $month['year'];

            $monthStart = Carbon::createFromDate($year, $monthIndex, 1)->startOfMonth();
            $monthEnd = Carbon::createFromDate($year, $monthIndex, day: 1)->endOfMonth();

            $monthExpenses = $expenses->filter(function($expense) use ($monthStart, $monthEnd){
                $expenseDate = Carbon::parse($expense->date);
                return $expenseDate->between($monthStart, $monthEnd);
            });

            $monthString = $monthStart->locale('fr')->isoFormat('MMMM YYYY');
            $amount = $monthExpenses? $monthExpenses->sum('amount') : 0;
            $transactions = $monthExpenses? $monthExpenses->count() : 0;

            $categories = $monthExpenses? $monthExpenses->groupBy(fn($e) => $e->category->name)
                                                        ->map(function($catExpenses, $catName) {
                                                            return [
                                                                'name' => $catName,
                                                                'amount' => $catExpenses->sum('amount'),
                                                                'transactions' => (int) $catExpenses->count(),
                                                                'color' => $catExpenses->first()->category->color,
                                                                'spenders' => $catExpenses->groupBy('spender_id')->map(function($group){
                                                                    return [
                                                                        'name' => $group->first()->spender->name,
                                                                        'amount'=> $group->sum('amount'),
                                                                        'transactions' => $group->count(),

                                                                    ];
                                                                })->values()->all(),
                                                            ];
                                                        })->values()->all()
                                        : [];
            $spenders = $monthExpenses? $monthExpenses->groupBy(fn($e) => $e->spender->name)
                                                        ->map(function($spExpenses, $spName) {
                                                            return [
                                                                'name' => $spName,
                                                                'amount' => $spExpenses->sum('amount'),
                                                                'transactions' => (int) $spExpenses->count(),
                                                                'color' => $spExpenses->first()->category->color,
                                                                'categories' => $spExpenses->groupBy('category_id')->map(function($group){
                                                                    return [
                                                                        'name' => $group->first()->category->name,
                                                                        'amount'=> $group->sum('amount'),
                                                                        'transactions' => $group->count(),

                                                                    ];
                                                                })->values()->all(),
                                                            ];
                                                        })->values()->all()
                                        : [];
            return [
                'month' => ucfirst($monthString),
                'month_index' => (int) $monthIndex,
                'year' => (int) $year,
                'amount' => (int) $amount,
                'transactions' => (int) $transactions,
                'categories' =>  $categories,
                'spenders' =>  $spenders,
            ];
        });
    }

    public static function getSpendingEvolutionStats($user, $numMonths, $spenders, $categories, $analysisStyle){
        Log::debug('numMonths', [$numMonths]);
        Log::debug('spenders', [...$spenders]);
        Log::debug('categories', [$categories]);
        
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        $months = [];

        for($i = $numMonths - 1 ; $i > 0; $i--){
            if($month - $i < 1){
                $months[] = ['month' => 12 + $month - $i, 'year' => $year - 1];
            }else{
                $months[] = ['month' =>$month - $i, 'year' => $year];
            }
        }

        $months[] = ['month' => $month, 'year' => $year];
        $stats = [];
        
        if($analysisStyle === 'comparison'){
            $data =  collect($months)->map(function($month) use ($user, $spenders, $categories){
                $monthStart = Carbon::createFromDate($month['year'], $month['month'], 1)->startOfMonth();
                $monthEnd = Carbon::createFromDate($month['year'], $month['month'], 1)->endOfMonth();
                
                $monthData = [];
                $monthData['month'] =  ucfirst($monthStart->locale('fr')->isoFormat('MMMM'));
                
                collect($spenders)->each(function($spender) use ($user, $categories, &$monthData, $monthStart, $monthEnd){
                    $catIds = collect($categories)->map(function($catId){
                        return $catId['id'];}
                    );
                    
                    
                    $amount = Expense::where('user_id', $user->id)
                    ->where('spender_id', $spender['id'])
                    ->whereIn('category_id', $catIds)
                    ->whereBetween('date',[$monthStart, $monthEnd])
                    ->get()
                    ->sum('amount');
                    Log::debug( 'amount', [$amount]);
                    
                    $monthData[$spender['name']] = $amount;
                });
                
                return $monthData;
            })->values()->all();
            
            $config = [];
            
            collect($spenders)->each(function($spender)use(&$config){
                $config[$spender['name']] = [
                    'label' => $spender['name'],
                    'color' => $spender['color'],
                ];
            });
            
            
            $stats['data'] = $data;
            $stats['config'] = $config;
        }else if($analysisStyle === 'global'){
            $data = collect($months)->map(function($month) use($user, $spenders, $categories){
                $monthStart = Carbon::createFromDate($month['year'], $month['month'], 1)->startOfMonth();
                $monthEnd = Carbon::createFromDate($month['year'], $month['month'], 1)->endOfMonth();
                
                $monthData = [];
                $monthData['month'] =  ucfirst($monthStart->locale('fr')->isoFormat('MMMM'));
                
                $categoryIds = collect($categories)->map(function($categoryId){
                        return $categoryId['id'];}
                );
                $spenderIds = collect($spenders)->map(function($spenderId){
                        return $spenderId['id'];}
                );

                $monthData['Global'] = Expense::where('user_id', $user->id)
                                                ->whereIn('spender_id', $spenderIds)
                                                ->whereIn('category_id', $categoryIds)
                                                ->whereBetween('date',[$monthStart, $monthEnd])
                                                ->get()
                                                ->sum('amount');
                
                return $monthData;
            })->values()->all();

            $stats['data'] = $data;
            $stats['config']['Global'] = [
                'label' => 'Global',
                'color' => 'hsl(199, 89%, 48%)'
            ];
        }
        
        Log::debug( 'stats', $stats);
        return $stats;
    }
}
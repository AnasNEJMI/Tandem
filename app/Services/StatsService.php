<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Symfony\Component\ErrorHandler\Debug;

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

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
            $monthEnd = Carbon::createFromDate($year, $monthIndex, 1)->endOfMonth();

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

        //group them by month, then map through them and run calculations for each month
        // return $expenses->groupBy(function($expense){
        //     $date = Carbon::parse($expense->date)
        //                     ->locale('fr')
        //                     ->timezone('Europe/Paris');

        //     return $date->format('m-Y');
        // })->map(function( $monthExpenses, $date){
        //     [$monthIndex, $year] = explode('-', $date);
        //     $month = Carbon::createFromFormat('m-Y', $date)->locale('fr');
        //     $monthString = ucfirst($month->isoFormat('MMMM YYYY'));
        //     $amount = $monthExpenses->sum('amount');
        //     $transactions = $monthExpenses->count();


        //     $categories = $monthExpenses->groupBy(function($monthExpense){
        //         return $monthExpense->category->name;
        //     })->map(function($catExpenses, $catName){
        //         $name = $catName;
        //         $amount = $catExpenses->sum('amount');
        //         $transactions = $catExpenses->count();
        //         $color = $catExpenses->first()->category->color;
        //         return [
        //             'name' => $name,
        //             'amount' => $amount,
        //             'transactions' => $transactions,
        //             'color' => $color,
        //             'spenders' => $catExpenses->groupBy('spender_id')->map(function($catSpExpenses){
        //                 $name = $catSpExpenses->first()->spender->name;
        //                 $amount = $catSpExpenses->sum('amount');
        //                 $transactions = $catSpExpenses->count();
        //                 return [
        //                     'name' => $name,
        //                     'amount' => $amount,
        //                     'transactions' => $transactions,
        //                 ];
        //             })->values()->all()
        //         ];
        //     })->values()->all();
            
            
            
        //     $spenders = $monthExpenses->groupBy(function($monthExpense){
        //         return $monthExpense->spender->name;
        //     })->map(function($spExpenses, $spName){
        //         $name = $spName;
        //         $amount = $spExpenses->sum('amount');
        //         $transactions = $spExpenses->count();
        //         $color = $spExpenses->first()->spender->color;
        //         return [
        //             'name' => $name,
        //             'amount' => $amount,
        //             'transactions' => $transactions,
        //             'color' => $color,
        //             'categories' => $spExpenses->groupBy('category_id')->map(function($spCatExpenses){
        //                 $name = $spCatExpenses->first()->category->name;
        //                 $amount = $spCatExpenses->sum('amount');
        //                 $transactions = $spCatExpenses->count();
        //                 return [
        //                     'name' => $name,
        //                     'amount' => $amount,
        //                     'transactions' => $transactions,
        //                 ];
        //             })->values()->all()
        //         ];
        //     })->values()->all();

        //     return [
        //         'month' => $monthString,
        //         'month_index' => (int) $monthIndex,
        //         'year' =>(int) $year,
        //         'amount' => $amount,
        //         'transactions' =>(int) $transactions,
        //         'categories' => $categories,
        //         'spenders' => $spenders,
        //     ];
        // })->values()->all();
    }
}
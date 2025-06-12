<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class MonthExpensesStatsService{
    public static function getMonthlyStats(User $user, Carbon $month){
        $monthStart = $month->copy()->startOfMonth();
        $monthEnd = $month->copy()->endOfMonth();

        $expenses = Expense::with(['category', 'spender'])
                            ->where('user_id', $user->id)
                            ->whereBetween('date', [$monthStart, $monthEnd])
                            ->get();
        
        $total = $expenses->sum('amount');
        
        $amountPerSpender = $expenses->groupBy('spender.id')->map(function ($expenses){
            return $expenses->sum('amount');
        });

        return $expenses;
    }


    public static function calculatePerCategoryStats(Collection $expenses){
        $perCategoryData = [];
        $perCategoryConfig = [];

        $perCategoryExpenses = $expenses->groupBy(fn ($expense) => $expense->category->id);

        foreach ($perCategoryExpenses as $categoryId => $categoryExpenses) {
            $amount =  $categoryExpenses->sum('amount');
            $category = $categoryExpenses->first()->category;
            $name = $category->name;
            $color = $category->color;

            $perCategoryData[] = [
                'name' => $name,
                'amount' => $amount,
                'fill' => $color,
            ];

            $perCategoryConfig[$category->name] = [
                'label' => $name,
                'color' => $color,
            ];
        }

        return [
            'data' => $perCategoryData,
            'config' => $perCategoryConfig,
        ];
    }

    public static function calculatePerSpenderStats(Collection $expenses){
        $spenders = [];
        $spendersData = [];
        $spendersConfig = [];

        $month = Carbon::now()->month;
        $monthName = Carbon::createFromDate(null, $month, 1, 'Europe/Paris')
                            ->locale('fr')
                            ->translatedFormat('F');
        $capitalizedMonthName = Str::ucfirst($monthName);
        
        $spendersData['month'] = $capitalizedMonthName;

        $perSpenderExpenses = $expenses->groupBy(fn ($expense) => $expense->spender->id);

        foreach ($perSpenderExpenses as $spenderId => $spenderExpenses) {
            $amount =  $spenderExpenses->sum('amount');
            $spender = $spenderExpenses->first()->spender;
            $name = $spender->name;
            $color = $spender->color;

            $spenders[] = [
                'name' => $name,
                'amount' => $amount,
                'fill' => $color,
            ];

            $spendersData[$spender->name]= $amount;

            $spendersConfig[$spender->name] = [
                'label' => $name,
                'color' => $color,
            ];
        }

        return [
            'spenders' => $spenders,
            'data' => $spendersData,
            'config' => $spendersConfig,
        ];
    }
}
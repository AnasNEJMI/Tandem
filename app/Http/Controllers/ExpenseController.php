<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(){

        $user = auth()->user();
        $user_id = $user->id;

        $expenses = Expense::with(['spender', 'category', 'places'])
                            ->where('user_id', $user_id)
                            ->orderByDesc('date')
                            ->get();

        // $expenses = Expense::latest()->orderBy('date', 'desc')->get();
        return Inertia::render('expenses', 
                            ['expenses' => $expenses->map(function ($expense) {
                                return [
                                    'id' => $expense->id,
                                    'amount' => $expense->amount,
                                    'date' => $expense->date,
                                    'comment' => $expense->comment,
                                    'spender' => [
                                        'id' => $expense->spender->id,
                                        'name' => $expense->spender->name,
                                    ],
                                    'category' => [
                                        'id' => $expense->category->id,
                                        'name' => $expense->category->name,
                                    ],
                                    'places' => $expense->places->map(fn($place) => [
                                        'id' => $place->id,
                                        'name' => $place->name,
                                    ]),

                                ];
                            })]);
    }
    
    public function store(Request $request){
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01|max:1000000',
            'date' => 'required|date',
            'comment'=>'nullable|string|max:250',
            'spender_id' => 'required|integer|exists:spenders,id',
            'category_id' => 'required|integer|exists:categories,id',
            'place_ids' => 'nullable|array',
            'place_ids.*'=>'exists:places,id'
        ]);

        $user = auth()->user();

        if(!$user->spenders()->where('id', $validated['spender_id'])->exists()){
            abort(403, 'Unauthorized spender ID');
        }

        if(!$user->categories()->where('id', $validated['category_id'])->exists()){
            abort(403, 'Unauthorized category ID');
        }

        if(!empty($validated['place_id']) && !$user->places()->where('id', $validated['place_id'])->exists()){
            abort(403, 'Unauthorized place ID');
        }

        $expense = Expense::create([
            'user_id' -> $user->id,
            'spender_id'->$validated['spender_id'],
            'category_id'->$validated['category_id'],
            'amount'->$validated['amount'],
            'date'->$validated['date'],
            'comment'->$validated['comment'] ?? null,
        ]);

        $expense->places()->attach($validated['place_ids']);

        return Inertia::render('expenses', [
            'expenses' => Expense::latest()->orderBy('date', 'desc')->get(),
        ]);
    }
}

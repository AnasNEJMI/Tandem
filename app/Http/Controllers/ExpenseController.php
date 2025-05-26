<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Place;
use App\Models\Spender;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class ExpenseController extends Controller
{
    public function index(){
        $user_id = auth()->id();
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        $expenses = Expense::with(['spender', 'category', 'places'])
                            ->where('user_id', $user_id)
                            ->whereMonth('date', $month)
                            ->whereYear('date', $year)
                            ->orderByDesc('date')
                            ->get();
        
        $categories = Category::with(['places'])->where('user_id', $user_id)->get();
        $spenders = Spender::where('user_id', $user_id)->get();
        
        Log::debug('categories', 
        ['payload',
            $categories->map(fn($category)=> [
                'id' => $category->id,
                'name' => $category->name,
                'places' => $category->places->map(fn($place)=> [
                    'id' => $place->id,
                    'name' => $place->name,
                ])
            ])
        ]);
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
                                    }),
                                    'categories' => $categories->map(fn($category)=> [
                                        'id' => $category->id,
                                        'name' => $category->name,
                                        'places' => $category->places->map(fn($place)=> [
                                            'id' => $place->id,
                                            'name' => $place->name,
                                        ])
                                    ]),
                                    'spenders' => $spenders->map(fn($spender)=> [
                                        'id' => $spender->id,
                                        'name' => $spender->name
                                    ]),
                                    'date' => [
                                        'month' => $month,
                                        'year' => $year,
                                    ]
                                    
                        ]);
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

        if(!Spender::where('id', $validated['spender_id'])->exists()){
            abort(403, 'Unauthorized spender ID');
        }

        if(!Category::where('id', $validated['category_id'])->exists()){
            abort(403, 'Unauthorized category ID');
        }

        if(!empty($validated['place_id']) && !Place::where('id', $validated['place_id'])->exists()){
            abort(403, 'Unauthorized place ID');
        }

        $expense = Expense::create([
            'user_id' => auth()->id(),
            'spender_id'=>$validated['spender_id'],
            'category_id'=>$validated['category_id'],
            'amount'=>$validated['amount'],
            'date'=>$validated['date'],
            'comment'=>$validated['comment'] ?? null,
        ]);

        $expense->places()->attach($validated['place_ids']);

        $expenses = Expense::with(['spender', 'category', 'places'])
                            ->where('user_id', auth()->id())
                            ->orderByDesc('date')
                            ->get();
        

                    
        return Inertia::render('expenses', [
            'expenses' => $expenses->map(function ($expense) {
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
                                    }),
        ]);
    }
}

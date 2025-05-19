<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(){
        $expenses = Expense::latest()->orderBy('date', 'desc')->get();
        return Inertia::render('expenses', ['expenses' => $expenses]);
    }
    
    public function store(Request $request){
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01|max:1000000',
            'spender' => 'required|string|max:100',
            'date' => 'required|date',
            'category'=>'required|string|max:50',
            'place'=>'nullable|string|max:100',
            'comment'=>'nullable|string|max:250',
        ]);

        Expense::create($validated);

         return Inertia::render('expenses', [
            'expenses' => Expense::latest()->orderBy('date', 'desc')->get(),
        ]);
    }
}

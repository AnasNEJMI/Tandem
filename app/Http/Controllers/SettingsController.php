<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Spender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(){
        $userId = auth()->id();

        $categories = Category::where('user_id', $userId)
                                ->get()
                                ->map(function($category){
                                    return [
                                        'id' => $category->id,
                                        'name' => $category->name,
                                        'color' => $category->color,
                                        'transactions' =>(int) $category->expenses->count(),
                                    ];
                                })->values()->all();

        $spenders = Spender::where('user_id', $userId)->get();
        return Inertia::render('settings', [
            'categories' => $categories,
            'spenders' => $spenders,
        ]);
    }

    public function deleteCategory(Request $request){
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id'
        ]);

        $userId = auth()->id();

        $category = Category::where('user_id', $userId)
                            ->where('id', $validated['category_id'])
                            ->firstOrFail();
    
        foreach($category->expenses as $expense){
            $expense->places()->detach();
            $expense->delete();
        }

        $category->delete();

        return back();
    }

    public function updateCategory(Request $request){
        $validated = $request->validate([
            'id' => 'required|integer|exists:categories,id',
            'color' => 'required|string|min:5|max:100',
            'name' => 'required|string|min:1|max:100'
        ]);

        $userId = auth()->id();

        $category = Category::where('user_id', $userId)
                            ->where('id', $validated['id'])
                            ->firstOrFail();
    
        $category->name = $validated['name'];
        $category->color = $validated['color'];
        $category->save();
        return back();
    }

    public function createCategory(Request $request){
        $validated = $request->validate([
            'color' => 'required|string|min:5|max:100',
            'name' => 'required|string|min:1|max:100'
        ]);

        $userId = auth()->id();

        Category::create([
            'user_id' => $userId,
            'name' => $validated['name'],
            'color' => $validated['color']
        ]);
    
        return back();
    }

    
}

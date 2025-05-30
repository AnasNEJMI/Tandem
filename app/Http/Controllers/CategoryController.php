<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class CategoryController extends Controller
{
    public function index(){
        return Inertia::render('setup-categories');
    }


    public function store(Request $request){

        $validated = $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*.name' => 'required|string|min:2|max:50',
            'categories.*.color' => ['required', 'regex:/^hsl\(\d{1,3},\s?\d{1,3}%,\s?\d{1,3}%\)$/i'],
        ]);

        Category::insert(
            collect($validated['categories'])->map(fn($category) => [
                'user_id' => auth()->id(),
                'name' => $category['name'],
                'color' => $category['color'],
                'created_at'=> now(),
                'updated_at'=> now(),
            ])->all()
        );

        $setupProgress = auth()->user()->setupProgress;

        $setupProgress->update([
            'current_step' => 'places',
        ]);

        Log::debug("category", ['value', 'about to move to places']);

        redirect()->route('setup.places');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class PlaceController extends Controller
{
    public function index(){
        $id = auth()->id();
        $categories = Category::where('user_id', $id)
                                ->whereIn('name', ['Courses', 'Restaurants', 'Vêtements', 'Chaussures'])->get();


        //TODO: if none of these categories were chosen by the user, skip this step
        // if($categories->count() === 0){}

        return Inertia::render('setup-places', [
            'categories' => $categories->map(function($category){
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            })
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*.id' => 'required|integer|exists:categories,id',
            'categories.*.name' => 'required|string|min:2|max:50',
            'categories.*.places' => 'required|array|min:1',
            'categories.*.places.*.name' => 'required|string|min:2|max:100',
        ]);

        collect($validated['categories'])->each(function($category){
            Place::Insert(
                collect($category['places'])->map(fn($place) => [
                    'user_id' => auth()->id(),
                    'category_id' => $category['id'],
                    'name' => $place['name'],
                    'created_at'=> now(),
                    'updated_at'=> now(),
                ])->all()
            );
        });

        $setupProgress = auth()->user()->setupProgress;

        $setupProgress->update([
            'is_completed' => true,
        ]);

        Log::debug("category", ['value', 'about to move to places']);

        redirect()->route('expenses');
    }

}

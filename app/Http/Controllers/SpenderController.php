<?php

namespace App\Http\Controllers;

use App\Models\Spender;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Log;

class SpenderController extends Controller
{
    public function index() {
         return Inertia::render('setup-spenders');
    }

    public function store(Request $request){

        //trimming white space so things like "  " dont pass
        $request->merge([
            'spenders' => collect($request->input('spenders'))
                ->map(fn ($spender) => [
                    'name' => trim($spender['name'] ?? ''),
                    'color' => $spender['color'],
                ])
                ->all(),
        ]);


        $validated = $request->validate([
            'spenders' => 'required|array|min:1',
            'spenders.*.name' => 'required|string|min:2|max:100',
            'spenders.*.color' => 'regex:/^hsl\(\d{1,3},\s?\d{1,3}%,\s?\d{1,3}%\)$/i',
        ]);

        Log::debug("spenders", ['value', $validated['spenders']]);

        Spender::insert(
            collect($validated['spenders'])->map(fn($spender) => [
                'user_id' => auth()->id(),
                'name' => $spender['name'],
                'color' => $spender['color'],
                'created_at'=> now(),
                'updated_at'=> now(),
            ])->all()
        );

        $setupProgress = auth()->user()->setupProgress;

        $setupProgress->update([
            'current_step' => 'categories',
        ]);

        Log::debug("spender", ['value', 'about to move to categories']);

        redirect()->route('setup.categories');
    }
}

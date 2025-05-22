<?php

namespace App\Http\Controllers;

use App\Models\Spender;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SpenderController extends Controller
{
    public function index() {
         return Inertia::render('setup-spenders');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'name'=>'required|string|max:100',
        ]);

        Spender::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
        ]);

        redirect()->intended(route('setup.categories', absolute:false));
    }
}

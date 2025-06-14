<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalsController extends Controller
{
    public function index(){
        return Inertia::render('goals');
    }
}

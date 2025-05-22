<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

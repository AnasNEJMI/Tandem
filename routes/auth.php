<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SpenderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function(){
        return Inertia::render('home');})
        ->name('home');

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
    //     ->name('password.request');

    // Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
    //     ->name('password.email');

    // Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
    //     ->name('password.reset');

    // Route::post('reset-password', [NewPasswordController::class, 'store'])
    //     ->name('password.store');
});

Route::middleware('auth')->group(function () {

    Route::get('/expenses',[ExpenseController::class, 'index'])
        ->name('expenses');
    Route::post('/expenses', [ExpenseController::class, 'store'])
        ->name('expenses.store');

    Route::get('/setup/spenders',[SpenderController::class, 'index'])
        ->name('setup.spenders');
    
    Route::post('/setup/spenders',[SpenderController::class, 'store'])
        ->name('setup.spenders.store');

    Route::get('/setup/categories',function(){
            return Inertia::render('setup-categories');
        })
        ->name('setup.categories');

    Route::get('/setup/places',function(){
            return Inertia::render('setup-places');
        })
        ->name('setup.places');
    
    Route::get('/stats',[ExpenseController::class, 'index'])
        ->name('stats');

    Route::get('/goals',[ExpenseController::class, 'index'])
        ->name('goals');
    Route::post('/goals', [ExpenseController::class, 'store'])
        ->name('goals.store');

    Route::get('/settings',[ExpenseController::class, 'index'])
        ->name('settings');
    Route::post('/settings', [ExpenseController::class, 'store'])
        ->name('settings.store');


    // Route::get('verify-email', EmailVerificationPromptController::class)
    //     ->name('verification.notice');

    // Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    //     ->middleware(['signed', 'throttle:6,1'])
    //     ->name('verification.verify');

    // Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    //     ->middleware('throttle:6,1')
    //     ->name('verification.send');

    // Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
    //     ->name('password.confirm');

    // Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    //     ->name('logout');
});

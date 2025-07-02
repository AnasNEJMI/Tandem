<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SpenderController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserPreferencesController;
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
        
    Route::get('/stats',[StatsController::class, 'index'])
      ->name('stats');
    Route::post('/stats',[StatsController::class, 'getMonthStats'])
      ->name('stats.getMonthStats');
    Route::put('/stats',[StatsController::class, 'getSpendingEvolutionStats'])
    ->name('stats.getSpendingEvolutionStats');
    
    Route::get('/goals',[GoalsController::class, 'index'])
        ->name('goals');
    Route::post('/goals', [GoalsController::class, 'store'])
        ->name('goals.store');

    Route::get('/settings',[SettingsController::class, 'index'])
        ->name('settings');
    Route::put('/settings/{type}', [UserPreferencesController::class, 'update'])
        ->name('settings.update');
    Route::delete('/settings/category', [SettingsController::class, 'deleteCategory'])
        ->name('settings.deleteCategory');
    Route::post('/settings/category', [SettingsController::class, 'createCategory'])
    ->name('settings.createCategory');
    Route::delete('/settings/spender', [SettingsController::class, 'deleteSpender'])
        ->name('settings.deleteSpender');
    Route::post('/settings/spender', [SettingsController::class, 'createSpender'])
    ->name('settings.createSpender');

      Route::get('/setup/spenders',[SpenderController::class, 'index'])
        ->name('setup.spenders');
    
    Route::post('/setup/spenders',[SpenderController::class, 'store'])
        ->name('setup.spenders.store');
        
        Route::get('/setup/categories',[CategoryController::class, 'index'])
    
        ->name('setup.categories');
        Route::post('/setup/categories',[CategoryController::class, 'store'])
        ->name('setup.categories.store');

    Route::get('/setup/places',[PlaceController::class, 'index'])
        ->name('setup.places');

    Route::post('/setup/places',[PlaceController::class, 'store'])
        ->name('setup.places.store');



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

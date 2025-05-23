<?php

use App\Http\Middleware\HandleAccountSetupNotCompleted;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Models\SetupProgress;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
        
        $middleware->redirectGuestsTo('/');

        
        $middleware->redirectUsersTo(function(){
            if(auth()->check()){
                $isSetupCompleted = auth()->user()->setupProgress->is_completed;
                $currentStep = auth()->user()->setupProgress->current_step;
                return $isSetupCompleted? '/expenses' : "/setup/$currentStep";
            }else{
                return '/';
            }
        });

        $middleware->web(append: [
            HandleAccountSetupNotCompleted::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

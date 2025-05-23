<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class HandleAccountSetupNotCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $guestRoutes = ['/', 'login', 'register'];
        $setupRoutes = ['setup/*'];
        $protectedRoutes = ['expenses', 'stats', 'goals', 'settings','expenses/*', 'stats/*', 'goals/*', 'settings/*'];
        $isAuth = auth()->check();
        $user = $request->user();
        $isSetupCompleted = $user?->setupProgress->is_completed;
        $currentStep = $user?->setupProgress->current_step;

        Log::debug('current step: ', ['step' => $currentStep]);
        Log::debug('target route', ['route', "setup.$currentStep"]);
        Log::debug('Request:', ['path' => $request->path(), 'user_id' => $user? $user->id : null]);
        Log::debug('Auth', ['isAtuh' => auth()->check(), 'user_id'=>auth()->user()? auth()->id() : null]);
        Log::debug('checks',
        ['is_setup_completed' =>$user? $isSetupCompleted : null,
                 'ids_match'=>$user? $user->id === auth()->id() : null,
                 'path_in_setup_routes' =>$user? $request->is($setupRoutes) : null,
                 'path_in_protected_routes' =>$user? $request->is($protectedRoutes) : null,
                 'path_in_guest_routes' =>$user? in_array($request->path(), $guestRoutes) : null,
                ]);

        if (!$user || !$isAuth || $user->id !== auth()->id()){
            if($request->is($protectedRoutes) || $request->is($setupRoutes)){
                return to_route('home');
            }
        }else if($isSetupCompleted){
            if($request->is($setupRoutes) || in_array($request->path(), $guestRoutes)){
                return to_route('expenses');
            }
        }elseif($request->is($protectedRoutes) || 
                in_array($request->path(), $guestRoutes) || 
                ($request->is($setupRoutes) && $request->path() !== "setup/$currentStep")){
            return to_route("setup.$currentStep");
        }

        return $next($request);
    }
}

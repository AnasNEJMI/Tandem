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

        // Log::debug('Request:', ['path' => $request->path(), 'user_id' => $user? $user->id : null]);
        // Log::debug('Auth', ['isAtuh' => auth()->check(), 'user_id'=>auth()->user()? auth()->user()->id : null]);
        // Log::debug('checks',
        // ['is_setup_completed' =>$user? $user->is_setup_completed : null,
        //          'ids_match'=>$user? $user->id === auth()->user()->id : null,
        //          'path_in_setup_routes' =>$user? $request->is($setupRoutes) : null,
        //          'path_in_protected_routes' =>$user? $request->is($protectedRoutes) : null,
        //          'path_in_guest_routes' =>$user? in_array($request->path(), $guestRoutes) : null,
        //         ]);

        if (!$user || !$isAuth || $user->id !== auth()->user()->id){
            if($request->is($protectedRoutes) || $request->is($setupRoutes)){
                return redirect('/');
            }
        }else if($user->is_setup_completed){
            if($request->is($setupRoutes) || in_array($request->path(), $guestRoutes)){
                return redirect('/expenses');
            }
        }else if($request->is($protectedRoutes) || in_array($request->path(), $guestRoutes)){
            return redirect('/setup/spenders');
        }

        return $next($request);
    }
}

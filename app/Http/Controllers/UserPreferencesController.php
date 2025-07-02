<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Spender;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Enums\PreferenceOptions;

class UserPreferencesController extends Controller
{
    public function update(Request $request,string $type){
        switch($type){
            case 'category':
                $validated = $request->validate([
                    'id' => 'required|integer|exists:categories,id',
                    'color' => 'required|string|min:5|max:100',
                    'name' => 'required|string|min:1|max:100'
                ]);
                
                $userId = auth()->id();

                $category = Category::where('user_id', $userId)
                                    ->where('id', $validated['id'])
                                    ->firstOrFail();
            
                $category->name = $validated['name'];
                $category->color = $validated['color'];
                $category->save();

                break;
            case 'spender':
                $validated = $request->validate([
                    'id' => 'required|integer|exists:spenders,id',
                    'color' => 'required|string|min:5|max:100',
                    'name' => 'required|string|min:1|max:100'
                ]);
                
                $userId = auth()->id();
                
                $spender = Spender::where('user_id', $userId)
                ->where('id', $validated['id'])
                ->firstOrFail();
                
                $spender->name = $validated['name'];
                $spender->color = $validated['color'];
                $spender->save();
                break;
            case 'currency':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::CURRENCIES)]
                ]);

                $request->user()->preferences()->update(['currency' => $validated['value']]);
                break;
            case 'language':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::LANGUAGES)]
                ]);

                $request->user()->preferences()->update(['language' => $validated['value']]);
                break;
            case 'theme':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::THEMES)]
                ]);

                $request->user()->preferences()->update(['theme' => $validated['value']]);
                
                break;
            case 'date-format':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::DATE_FORMATS)]
                ]);

                $request->user()->preferences()->update(['date_format' => $validated['value']]);
                
                break;
            case 'number-format':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::NUMBER_FORMATS)]
                ]);

                $request->user()->preferences()->update(['number_format' => $validated['value']]);
                
                break;
            case 'charts-color':
                $validated = $request->validate([
                    'value' => 'required|string|max:50',
                ]);

                $request->user()->preferences()->update(['charts_color' => $validated['value']]);
                
                break;
            case 'charts-style':
                $validated = $request->validate([
                    'value' => ['required', Rule::in(PreferenceOptions::CHARTS_STYLES)]
                ]);

                $request->user()->preferences()->update(['charts_style' => $validated['value']]);
                break;
            default :
                abort(404);
        }

        return back();
    }
}

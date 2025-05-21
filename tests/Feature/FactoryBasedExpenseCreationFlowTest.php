<?php

use App\Models\Category;
use App\Models\Expense;
use App\Models\Place;
use App\Models\Spender;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use function Pest\Laravel\assertDatabaseCount;
use function PHPUnit\Framework\assertContainsEquals;
use function PHPUnit\Framework\assertEquals;

class FactoryBasedExpenseCreationFlowTest extends TestCase{
    use RefreshDatabase;

    /** @test */
    public function test(){
        $numUsers = 5;
        $numSpendersPerUser = 2;
        $numCategoriesPerUser = 5;
        $numPlacesPerCategory = 4;
        $numExpensesPerUser = 3;
    
        $users = User::factory($numUsers)->create();

        assertDatabaseCount('users', $numUsers);

        foreach($users as $user){
            $categories = Category::factory($numCategoriesPerUser)->create(['user_id' => $user->id]);
            $spenders = Spender::factory($numSpendersPerUser)->create(['user_id' => $user->id]);

            foreach($categories as $category){
                Place::factory($numPlacesPerCategory)->create(['user_id' => $user->id, 'category_id' => $category->id]);
            }

            assertEquals($numCategoriesPerUser, Category::where('user_id', $user->id)->count());
            assertEquals($numPlacesPerCategory, Place::where('user_id', $user->id)->where('category_id', $category->id)->count());
            assertEquals($numPlacesPerCategory*$numCategoriesPerUser, Place::where('user_id', $user->id)->count());

            for($i = 0; $i < $numExpensesPerUser; $i++){
                $spender = $spenders->random();
                $category = $categories->random();
                $places = Place::where('user_id', $user->id)
                                ->where('category_id', $category->id)
                                ->inRandomOrder()
                                ->limit(rand(1,3))
                                ->get();
                
                $expense = Expense::factory()->create([
                    'user_id' => $user->id,
                    'spender_id' => $spender->id,
                    'category_id' => $category->id
                ]);

                $expense->places()->attach($places->pluck('id')->toArray());
                
                assertEquals($places->count(), DB::table('expense_place')->where('expense_id',$expense->id)->count());
            }

            assertEquals($numExpensesPerUser, Expense::where('user_id', $user->id)->count());

        }

        assertDatabaseCount('spenders', $numUsers*$numSpendersPerUser);
        assertDatabaseCount('categories', $numUsers*$numCategoriesPerUser);
    }
}
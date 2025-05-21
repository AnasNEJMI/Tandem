<?php

use App\Models\Category;
use App\Models\Expense;
use App\Models\Place;
use App\Models\Spender;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use function Pest\Laravel\assertDatabaseHas;
use function PHPUnit\Framework\assertTrue;

class ExpenseCreationFlowTest extends TestCase{
    use RefreshDatabase;

    /** @test */
    public function it_creates_user_with_all_dependencies_and_expense_flow(){
        //1- Create user
        $user = User::factory()->create();
        //dump("user : ",$user->toArray());
        $this->assertDatabaseHas('users', ['id' => $user->id]);
        $this->assertIsBool($user->is_setup_completed); // Optional: make sure it's a boolean
        $this->assertFalse($user->is_setup_completed); // Since the factory creates it as fa
    
        //2- Create Spender
        $spender = Spender::create([
            'user_id' => $user->id,
            'name' => 'Alice'
        ]);

        //dump("spender : ",$spender->toArray());
        $this->assertDatabaseHas('spenders', ['name' => 'Alice']);
        $this->assertTrue($spender->user_id === $user->id);
        
        //3- create a category
        $category = Category::create([
            'user_id' => $user->id,
            'name' => 'Food',
        ]);
        //dump("category : ",$category->toArray());

        $this->assertDatabaseHas('categories', ['name' => 'Food']);
        $this->assertTrue($category->user_id === $user->id);
        
        //4- create places : 
        // -- place1 -- //
        $place1 = Place::create([
            'user_id'=> $user->id,
            'category_id'=>$category->id,
            'name' => 'Marka Market',
        ]);

        //dump("place1 : ",$place1->toArray());

        $this->assertDatabaseHas('places', ['id' => $place1->id,
                                                         'name' => 'Marka Market',
                                                         'user_id' => $user->id,
                                                         'category_id' => $category->id]);
        $this->assertTrue($place1->user_id === $user->id);
        $this->assertTrue($place1->category_id === $category->id);

        // -- place2 -- //
        $place2 = Place::create([
            'user_id'=> $user->id,
            'category_id'=>$category->id,
            'name' => 'Lidl',
        ]);

        //dump("place2 : ",$place2->toArray());

        $this->assertDatabaseHas('places', ['id' => $place2->id,
                                                         'name' => 'Lidl',
                                                         'user_id' => $user->id,
                                                         'category_id' => $category->id]);
        $this->assertTrue($place2->user_id === $user->id);
        $this->assertTrue($place2->category_id === $category->id);

        // -- place3 -- //
        $place3 = Place::create([
            'user_id'=> $user->id,
            'category_id'=>$category->id,
            'name' => 'Carrefour',
        ]);

        //dump("place3 : ",$place3->toArray());

        $this->assertDatabaseHas('places', ['id' => $place3->id,
                                                         'name' => 'Carrefour',
                                                         'user_id' => $user->id,
                                                         'category_id' => $category->id]);
        $this->assertTrue($place3->user_id === $user->id);
        $this->assertTrue($place3->category_id === $category->id);

        //5 - creating an expense 
        // -- expense1 -- //
        $expense1 = Expense::create([
            'user_id' => $user->id,
            'spender_id' => $spender->id,
            'category_id' => $category->id,
            'amount' => 35.25,
            'date' => now()->toDateString(),
            'comment' => "preparation for the weekend"
        ]);

        $expense1->places()->attach([$place1->id, $place2->id]);

        //dump('expense1 : ',$expense1->toArray());
        
        assertDatabaseHas('expenses', [
            'id' => $expense1->id,
            'user_id' => $user->id,
            'spender_id' => $spender->id,
            'category_id' => $category->id,
            'amount' => 35.25,
            'comment' => "preparation for the weekend",
        ]);
        
        assertDatabaseHas('expense-place', [
            'expense_id' => $expense1->id,
            'place_id' => $place1->id,
        ]);
        
        assertDatabaseHas('expense-place', [
            'expense_id' => $expense1->id,
            'place_id' => $place2->id,
        ]);

        // -- expense2 -- //
        $expense2 = Expense::create([
            'user_id' => $user->id,
            'spender_id' => $spender->id,
            'category_id' => $category->id,
            'amount' => 123.25,
            'date' => now()->toDateString(),
            'comment' => "preparation for le mois"
        ]);

        $expense2->places()->attach([$place3->id, $place2->id]);

        //dump('expense2 : ',$expense2->toArray());
        
        assertDatabaseHas('expenses', [
            'id' => $expense2->id,
            'user_id' => $user->id,
            'spender_id' => $spender->id,
            'category_id' => $category->id,
            'amount' => 35.25,
            'comment' => "preparation for the weekend",
        ]);
        
        assertDatabaseHas('expense-place', [
            'expense_id' => $expense2->id,
            'place_id' => $place3->id,
        ]);
        
        assertDatabaseHas('expense-place', [
            'expense_id' => $expense2->id,
            'place_id' => $place2->id,
        ]);

        //6- retrieving the user from the database
        $expenses = Expense::with(['spender','category','places'])
                            ->where('user_id', $user->id)
                            ->orderByDesc('date')
                            ->get();

        $expenses = $expenses->map(function($expense){
            return [
                'id' => $expense->id,
                'amount' => $expense->amount,
                'date' => $expense->date,
                'comment'=> $expense->comment,
                'spender' => [
                    'id'=> $expense->spender->id,
                    'name' => $expense->spender->name,
                ],
                'category' => [
                    'id'=> $expense->category->id,
                    'name' => $expense->category->name,
                ],
                'places' => $expense->places->map(function($place){
                    return [
                        'id' => $place->id,
                        'name' => $place->name,
                    ];
                })
            ];
        });
        
        dump("expenses : ",$expenses->toArray());

        $expectedExpense1 = [
            'id' => $expense1->id,
            'amount' => $expense1->amount,
            'date' => $expense1->date,
            'comment'=> $expense1->comment,
            'spender' => [
                'id'=> $expense1->spender->id,
                'name' => $expense1->spender->name,
            ],
            'category' => [
                'id'=> $expense1->category->id,
                'name' => $expense1->category->name,
            ],
            'places' => [
                [
                    'id' => $place1->id,
                    'name' => $place1->name,
                ],
                [
                    'id' => $place2->id,
                    'name' => $place2->name,
                ],
            ]
        ];

        $expectedExpense2 = [
            'id' => $expense2->id,
            'amount' => $expense2->amount,
            'date' => $expense2->date,
            'comment'=> $expense2->comment,
            'spender' => [
                'id'=> $expense2->spender->id,
                'name' => $expense2->spender->name,
            ],
            'category' => [
                'id'=> $expense2->category->id,
                'name' => $expense2->category->name,
            ],
            'places' => [
                [
                    'id' => $place3->id,
                    'name' => $place3->name,
                ],
                [
                    'id' => $place2->id,
                    'name' => $place2->name,
                ],
            ]
        ];
        
        $expectedExpenses = [$expectedExpense1, $expectedExpense2];

        assertTrue($expenses[0]['places'][0]['id'] === $expectedExpenses[0]['places'][0]['id']);
        assertTrue($expenses[0]['places'][0]['id'] === $expectedExpenses[0]['places'][0]['id']);

    }
}

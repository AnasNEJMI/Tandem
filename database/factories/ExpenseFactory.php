<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Spender;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'spender_id' => Spender::factory(),
            'category_id' => Category::factory(),
            'amount' => fake()->randomFloat(2,0.01,1000000),
            'date' => fake()->date(),
            'comment' => fake()->sentence(20, true),
        ];
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preferences', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('currency');
            $table->string('language', 50);
            $table->string('theme', 50);
            $table->string('number_format', 50);
            $table->string('date_format', 50);
            $table->string('charts_color', 50);
            $table->string('charts_style', 5);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preferences');
    }
};

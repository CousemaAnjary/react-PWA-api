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
        Schema::create('todo_cards', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Nom de la tâche
            $table->boolean('is_completed')->default(false);  // Statut de la tâche (complétée ou non)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_cards');
    }
};
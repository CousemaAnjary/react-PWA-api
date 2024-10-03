<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoCardRequest;
use App\Models\TodoCard;
use Illuminate\Http\Request;

class TodoCardController extends Controller
{
    public function getTodoCards()
    {
        // Recuperée les todo cards
        $todoCards = TodoCard::all();

        return response()->json([
            'todoCards' => $todoCards,
            'message' => 'Listae des todo cards récupérée avec succès'
        ]);
    }

    public function storeTodoCard(TodoCardRequest $request)
    {
        // Validation des données
        $validated = $request->validated();

        // Création d'une nouvelle todo card
        $todoCard = TodoCard::create($validated);

        return response()->json([
            'todoCard' => $todoCard,
            'message' => 'Todo card créée avec succès'
        ]);
    }

    public function updateTodoCard(TodoCardRequest $request, $id)
    {
        // Récupération de la todo card
        $todoCard = TodoCard::find($id);

        // Validation des données
        $validated = $request->validated();

        // Mise à jour de la todo card
        $todoCard->update($validated);

        return response()->json([
            'todoCard' => $todoCard,
            'message' => 'Todo card mise à jour avec succès'
        ]);
    }

    public function destroyTodoCard($id)
    {
        // Récupération de la todo card
        $todoCard = TodoCard::find($id);

        // Suppression de la todo card
        $todoCard->delete();

        return response()->json([
            'message' => 'Todo card supprimée avec succès'
        ]);
    }
}
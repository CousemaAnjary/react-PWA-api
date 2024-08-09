<?php

namespace App\Http\Controllers\api\backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\backend\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(UserRequest $request)
    {
        // Valider les données de la requête
        $validated = $request->validated();

        // Vérifier si l'image est envoyée
        if ($request->hasFile('image_path')) {

            //Stocker l'image_path dans le dossier de stockage 'images' du disque 'public' 
            $validated['image_path'] = $request->file('image_path')->store('images', 'public');
        }

        // Créer un nouvel utilisateur
        $user = User::create($validated);

        // Retourner la réponse
        return response()->json($user, 201);
    }
}
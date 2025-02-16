<?php

namespace App\Http\Controllers;

use App\Models\Produits;
use Illuminate\Http\Request;

class ProduitsController extends Controller
{
    // 🔹 Récupérer tous les produits
    public function index()
    {
        return response()->json(Produits::all(), 200);
    }

    // 🔹 Ajouter un produit
    public function store(Request $request)
{
    // Validation des données
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'quantite' => 'required|integer',
    ]);

    // Création du produit
    $produit = Produits::create([
        'name' => $validated['name'],
        'quantite' => $validated['quantite'],
    ]);

    return response()->json($produit, 201);
}

    //  Récupérer un produit par ID
    public function show($id)
    {
        $produit = Produits::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }
        return response()->json($produit, 200);
    }

    // 🔹 Modifier un produit
    public function update(Request $request, $id)
    {
        $produit = Produits::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'string|max:255',
            'quantite' => 'integer|min:1'
        ]);

        $produit->update($request->only(['nom', 'quantite']));

        return response()->json(['message' => 'Produit mis à jour', 'produit' => $produit], 200);
    }

    // 🔹 Supprimer un produit
    public function destroy($id)
    {
        $produit = Produits::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->delete();
        return response()->json(['message' => 'Produit supprimé'], 200);
    }
}
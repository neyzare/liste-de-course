<?php

namespace App\Http\Controllers;

use App\Models\Produits;
use Illuminate\Http\Request;

class ProduitsController extends Controller
{
    public function index()
    {
        return response()->json(Produits::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',  
        ]);

        $produit = Produits::create([
            'name' => $validated['name'],
            'quantity' => $validated['quantity'],  
        ]);

        return response()->json($produit, 201);
    }

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

        $validated = $request->validate([
            'name' => 'string|max:255',
            'quantity' => 'integer|min:1', 
        ]);

        $produit->update([
            'name' => $validated['name'] ?? $produit->name,  
            'quantity' => $validated['quantity'] ?? $produit->quantity,  
        ]);

        return response()->json(['message' => 'Produit mis à jour', 'produit' => $produit], 200);
    }

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
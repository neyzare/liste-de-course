import { create } from "zustand";
import axios from "axios";

const useShoppingStore = create((set) => ({
    produits: [],

    
    fetchProduits: async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        console.log("Données récupérées :", response.data); // Ajoute ceci
        set({ produits: response.data });
    } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
    }
},

   
    addProduit: async (produit) => {
    try {
        const { nom, quantite } = produit;  // récupère 'nom' et 'quantite'
        const response = await axios.post("http://127.0.0.1:8000/api/produits", {
            name: nom,  // change 'nom' en 'name'
            quantite,
        });
        set((state) => ({ produits: [...state.produits, response.data] }));
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit", error);
    }
},
    
    deleteProduit: async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
            set((state) => ({ produits: state.produits.filter(produit => produit.id !== id) }));
        } catch (error) {
            console.error("Erreur lors de la suppression du produit", error);
        }
    }
}));

export default useShoppingStore;
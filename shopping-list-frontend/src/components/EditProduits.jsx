import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useShoppingStore from "../stores/shoppingStore";
import { useState, useEffect } from "react";

export const EditProduits = () => {

  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
};
    const { id } = useParams(); 
    const { getProduitById, updateProduit } = useShoppingStore();
    
    const [produit, setProduit] = useState({ nom: "", quantite: 1 });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProduit = async () => {
            const data = await getProduitById(id);
            if (data) {
                setProduit(data);
            } else {
                setMessage(" Produit introuvable !");
            }
        };
        fetchProduit();
    }, [id, getProduitById]);

    const handleChange = (e) => {
        setProduit({ ...produit, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateProduit(id, produit);
        if (success) {
            setMessage("✅ Produit mis à jour avec succès !");
            setTimeout(() => navigate("/"), 1000); 
        } else {
            setMessage(" Erreur lors de la mise à jour du produit.");
        }
    };


  return(
    <>
       <div className="bg-white min-h-screen">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Liste de course</a>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a onClick={() => handleNavigate("/")} className="btn btn-ghost text-xl">MemoCourse</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li onClick={() => handleNavigate('/modifier')}>
                <a>Modifier course</a>
              </li>
              <li onClick={() => handleNavigate('/liste-course')}>
                <a>Liste de course</a>
              </li>
              <li onClick={() => handleNavigate('/add-produits')}>
                <a>Ajouter course</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn btn-ghost text-xl">MemoCourse</a>
          </div>
        </div>
        <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-black"> Modifier le Produit</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label font-semibold text-black">Nom du produit</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        name="nom"
                        value={produit.nom}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="label font-semibold text-black">Quantité</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        name="quantite"
                        min="1"
                        value={produit.quantite}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary w-full text-black">💾 Enregistrer</button>
                <button type="button" className="btn btn-error w-full mt-2 text-black" onClick={() => navigate("/")}>❌ Annuler</button>
            </form>
        </div>
      </div>
    </>
  )
}
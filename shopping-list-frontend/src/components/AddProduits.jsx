import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useShoppingStore from "../stores/shoppingStore";

export const AddProduits = () => {
  const navigate = useNavigate();
  const { addProduit } = useShoppingStore();

  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [message, setMessage] = useState("");

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation pour le nom
    if (!nom.trim()) {
      setMessage("⚠️ Le nom du produit est obligatoire !");
      return;
    }

    // Validation pour la quantité
    if (quantite <= 0) {
      setMessage("⚠️ La quantité doit être supérieure à zéro !");
      return;
    }

    const success = await addProduit({ nom, quantite });

    if (success) {
      setMessage("✅ Produit ajouté avec succès !");
      setNom(""); // Réinitialise le nom
      setQuantite(1); // Réinitialise la quantité à 1
    } else {
      setMessage("❌ Erreur lors de l'ajout du produit.");
    }
  };

  return (
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
          <h2 className="text-2xl text-black mb-4">🛒 Ajouter un Produit</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label font-semibold text-black">Nom du produit</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Ex : Pommes"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div>
              <label className="label font-semibold text-black">Quantité</label>
              <input
                type="number"
                className="input input-bordered w-full"
                min="1"
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
              />
            </div>
            <button className="btn btn-primary w-full text-black">➕ Ajouter</button>
          </form>
        </div>
      </div>
    </>
  );
};
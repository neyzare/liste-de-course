import { useNavigate } from "react-router-dom";
import useShoppingStore from "../stores/shoppingStore";
import { useEffect } from "react";

export const ShoppingList = () => {

  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
};

  const { produits, fetchProduits } = useShoppingStore();

  useEffect(() => {
      fetchProduits();
}, []);
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
            <a  onClick={() => handleNavigate("/")} className="btn btn-ghost text-xl">MemoCourse</a>
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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-black ">📦 Liste des Produits</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-base-100 shadow-xl rounded-lg">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Nom</th>
                            <th className="p-4">Quantité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produits.length > 0 ? (
                            produits.map((produit, index) => (
                                <tr key={produit.id} className="hover">
                                    <td className="p-4 font-medium">{produit.id}</td>
                                    <td className="p-4">{produit.nom}</td>
                                    <td className="p-4">{produit.quantite}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-6 text-lg text-gray-500">
                                    Aucun produit disponible 😕
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      
    </>
  )
}
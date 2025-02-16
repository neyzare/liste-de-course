import './App.css'
import { AddProduits } from './components/AddProduits';
import { EditProduits } from './components/EditProduits';
import { Home } from './components/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShoppingList } from './components/ShoppingList';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-produits' element={<AddProduits/>}/>
          <Route path='/modifier' element={<EditProduits/>}/>
          <Route path='/liste-course' element={<ShoppingList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

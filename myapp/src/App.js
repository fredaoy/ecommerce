import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import AddProduct from './Pages/AddProduct';
import Signin from './Components/Signin/Signin';
import Profile from './Pages/Profile';
import MyProduct from './Pages/MyProduct'
// import Car from './Components/Category/Category-item/car'; // Import 
// import Baby from './Components/Category/Category-item/Baby'; // Import 
// import Cosmetic from './Components/Category/Category-item/Cosmetic'; // Import 
// import Decoration from './Components/Category/Category-item/Decoration'; // Import 
// import Electronic from './Components/Category/Category-item/Electronic'; // Import 
// import Family from './Components/Category/Category-item/Family'; // Import 
// import Game from './Components/Category/Category-item/Game'; // Import 
// import Garden from './Components/Category/Category-item/Garden'; // Import 
// import Homes from './Components/Category/Category-item/Homes'; // Import 
// import Musical from './Components/Category/Category-item/Musical'; // Import 
// import Pet from './Components/Category/Category-item/Pet'; // Import 
// import Sport from './Components/Category/Category-item/Sport'; // Import 
// import Tshirt from './Components/Category/Category-item/Tshirt'; // Import 
// import Video from './Components/Category/Category-item/Video'; // Import หน้ายานพาหนะที่สร้าง


function App() {

  return (
    <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add_product' element={<AddProduct />} />
            <Route path='/shop' element={<Product />} />
            <Route path='/MyProduct' element={<MyProduct />} />
            {/* <Route path='/product' element={<Product />} /> */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/LoginSignup' element={<LoginSignup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/:productId' element={<Product />} />
            <Route path="/Car" element={<ShopCategory category="1" />} />
            <Route path="/Baby" element={<ShopCategory category="6" />} />
            <Route path="/Cosmetic" element={<ShopCategory category="16" />} />
            <Route path="/Decoration" element={<ShopCategory category="3" />} />
            <Route path="/Electronic" element={<ShopCategory category="11" />} />
            <Route path="/Family" element={<ShopCategory category="7" />} />
            <Route path="/Game" element={<ShopCategory category="4" />} />
            <Route path="/Garden" element={<ShopCategory category="12" />} />
            <Route path="/Homes" element={<ShopCategory category="5" />} />
            <Route path="/Musical" element={<ShopCategory category="13" />} />
            <Route path="/Pet" element={<ShopCategory category="17" />} />
            <Route path="/Sport" element={<ShopCategory category="10" />} />
            <Route path="/Tshirt" element={<ShopCategory category="14" />} />
            <Route path="/Video" element={<ShopCategory category="8" />} />

            {/* <Route path='/Logout' element={<Logout />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;

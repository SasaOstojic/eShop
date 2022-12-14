import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home, Contact, Login, Reset, Register, Admin} from './pages/index';
import {Footer, Header} from './components/index';
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from './components/products/productDetails/ProductDetails'
import CheckoutDetails from './pages/checkout/CheckoutDetails'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import CheckoutSuccess from './pages/checkout/CheckoutSuccess'
import NotFound from './pages/notFound/NotFound'


function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset" element={<Reset/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        {/* adding * for adding routes to our main route */}
        <Route path="/admin/*" element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout-details" element={<CheckoutDetails/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;

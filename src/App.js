import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Navbar } from "./components/Navbar";
import { RequireUser } from "./components/RequireUser";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 500 });
  }, []);

  return (
    <>
      <Loading />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={
            <RequireUser>
              <Cart />
            </RequireUser>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireUser>
              <Checkout />
            </RequireUser>
          }
        />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

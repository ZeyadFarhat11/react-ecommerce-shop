import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";

const Context = createContext();
const url = "https://course-api.com/react-store-products";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authChanged = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user && pathname === "/") {
        navigate("/");
      }
    });
    return () => unsub();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      if (!localStorage.getItem("comfysloth-auth")) {
        setLoading(false);
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      const { cart } = doc.data();
      setCart(cart || []);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        loading,
        setLoading,
        cart,
        setCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);

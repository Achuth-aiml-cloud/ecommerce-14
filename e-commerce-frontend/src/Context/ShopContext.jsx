import React, { createContext, useEffect, useState } from "react";
import { getFirestore, collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from "../firebase"; // Import Firebase App instance

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const db = getFirestore(app);
    const productsCollectionRef = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const db = getFirestore(app);
      const userCartRef = collection(doc(db, "users", authToken), "cart");
      const unsubscribe = onSnapshot(userCartRef, (snapshot) => {
        const fetchedCartItems = {};
        snapshot.forEach((doc) => {
          fetchedCartItems[doc.id] = doc.data().quantity;
        });
        setCartItems(fetchedCartItems);
      });

      return () => unsubscribe();
    }
  }, []);

  const addToCart = (itemId) => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const db = getFirestore(app);
      const cartItemRef = doc(collection(doc(db, "users", authToken), "cart"), itemId);
      setDoc(cartItemRef, {quantity: cartItems[itemId] ? cartItems[itemId] + 1 : 1 });
    }
  };

  const removeFromCart = (itemId) => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const db = getFirestore(app);
      const cartItemRef = doc(collection(doc(db, "users", authToken), "cart"), itemId);
      if (cartItems[itemId] > 1) {
        updateDoc(cartItemRef, { quantity: cartItems[itemId] - 1 });
      } else {
        deleteDoc(cartItemRef);
      }
    }
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((acc, cur) => acc + cur, 0);
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((acc, itemId) => {
      const item = products.find((product) => product.id === itemId);
      return acc + (item ? cartItems[itemId] * item.new_price : 0);
    }, 0);
  };

  const contextValue = {
    products,
    getTotalCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

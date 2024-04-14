import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { db } from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products from Firestore
  const fetchProducts = async () => {
    const productCollectionRef = collection(db, "products");
    const data = await getDocs(productCollectionRef);
    setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove a product from Firestore
  const removeProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    fetchProducts();  // Re-fetch the products after deletion
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      {allProducts.length > 0 ? (
        <div className="listproduct-allproducts">
          {allProducts.map((product) => (
            <div key={product.id}>
              <hr />
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img className="listproduct-remove-icon" src={cross_icon} alt="Remove" onClick={() => removeProduct(product.id)} />
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ListProduct;

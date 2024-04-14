import React, { useState } from "react";
import "./AddProduct.css";
import { db } from '../../firebase-config';  // Ensure Firebase is correctly configured
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
    image: ""  // Added image URL state here
  });

  const handleAddProduct = async () => {
    if (!productDetails.image) {
      alert("Please provide an image URL!");
      return;
    }

    try {
      // Add product to Firestore
      await addDoc(collection(db, "products"), productDetails);
      alert("Product added successfully!");
      // Optionally reset the form here
      setProductDetails({
        name: "",
        category: "",
        new_price: "",
        old_price: "",
        image: ""
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + error.message);
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="cars">Cars</option>
          <option value="bikes">Bikes</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Image URL</p>
        <input type="text" name="image" value={productDetails.image} onChange={changeHandler} placeholder="http://example.com/image.jpg" />
      </div>
      <button className="addproduct-btn" onClick={handleAddProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;

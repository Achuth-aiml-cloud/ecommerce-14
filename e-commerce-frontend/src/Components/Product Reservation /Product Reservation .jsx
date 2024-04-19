import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Import your firebase configuration from firebase.js

const ProductReservation = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [reservationName, setReservationName] = useState('');
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from Firebase Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle reservation submission
  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if all required fields are filled
      if (!reservationName || !reservationEmail || !selectedProduct) {
        setError('Please fill in all required fields.');
        return;
      }

      // Save reservation data to Firebase Firestore
      await addDoc(collection(db, 'reservations'), {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        reservationName,
        reservationEmail,
        timestamp: serverTimestamp()
      });

      // Reset form and show success message
      setReservationName('');
      setReservationEmail('');
      setSelectedProduct('');
      setReservationSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error making reservation:', error);
      setError('Failed to make reservation. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product Reservation</h1>
      {reservationSuccess && <div>Reservation successful! We will contact you shortly.</div>}
      <form onSubmit={handleReservationSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={reservationName} onChange={(e) => setReservationName(e.target.value)} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={reservationEmail} onChange={(e) => setReservationEmail(e.target.value)} required />
        <label htmlFor="product">Select a product:</label>
        <select id="product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
          <option value="">Select a product...</option>
          {products.map(product => (
            <option key={product.id} value={product}>{product.name}</option>
          ))}
        </select>
        <button type="submit">Reserve Product</button>
      </form>
    </div>
  );
};

export default ProductReservation;

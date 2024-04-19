import React, { useEffect, useState } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch related products data from Firebase Firestore
        const db = getFirestore();
        const relatedProductsCollectionRef = collection(db, 'relatedProducts');
        const relatedProductsSnapshot = await getDocs(relatedProductsCollectionRef);
        const relatedProductsData = relatedProductsSnapshot.docs.map(doc => doc.data());
        
        // Fetch image URLs for each related product from Firebase Storage
        const storage = getStorage();
        const promises = relatedProductsData.map(async product => {
          const imageRef = ref(storage, product.image);
          const imageUrl = await getDownloadURL(imageRef);
          return { ...product, imageUrl };
        });

        // Set state with the retrieved related products data
        const resolvedRelatedProducts = await Promise.all(promises);
        setRelatedProducts(resolvedRelatedProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, []);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.imageUrl}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

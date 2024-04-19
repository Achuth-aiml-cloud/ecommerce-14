import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const db = getFirestore();
        const popularItemsCollection = collection(db, 'popularItems');
        onSnapshot(popularItemsCollection, (snapshot) => {
          const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPopularItems(items);
        });
      } catch (error) {
        console.error('Error fetching popular items:', error);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className='popular-item'>
        {popularItems.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;


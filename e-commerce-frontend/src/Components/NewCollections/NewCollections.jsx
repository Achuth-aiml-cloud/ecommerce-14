import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const db = getFirestore();
        const newCollectionsRef = collection(db, 'newCollections');
        const unsubscribe = onSnapshot(newCollectionsRef, (snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNewCollections(newData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching new collections:', error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className='collections'>
        {newCollections.map((item, i) => (
          <Item
            id={item.id}
            key={i}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;

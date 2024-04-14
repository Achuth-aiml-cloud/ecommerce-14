import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (searchTerm !== '') {
            const fetchProducts = async () => {
                const q = query(collection(db, "products"), where("name", ">=", searchTerm), where("name", "<=", searchTerm + '\uf8ff'));
                const docSnap = await getDocs(q);
                setProducts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            };

            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [searchTerm]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {products.length > 0 && (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;

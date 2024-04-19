import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Fetch products from Firebase Storage
    const fetchProducts = async () => {
      try {
        const storage = getStorage();
        const productsRef = ref(storage, 'products');
        const productsList = await listAll(productsRef);
        const productUrls = await Promise.all(productsList.items.map(async item => {
          const url = await getDownloadURL(item);
          return { url, name: item.name.split('.')[0] }; // Assuming product name is the file name
        }));
        setProducts(productUrls);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleItemClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    // Perform search action here, e.g., redirect to search results page
    console.log('Perform search for:', searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      {showSuggestions && (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.url} onClick={() => handleItemClick(product.name)}>
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;

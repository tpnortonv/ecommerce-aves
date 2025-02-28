import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Productos</h2>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


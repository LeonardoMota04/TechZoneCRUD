import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeProductsUser = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterPrice, setFilterPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProducts();
    }, []);

    const handleFilterChange = (e) => {
        setFilterPrice(e.target.value);
        if (e.target.value === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.product_price <= e.target.value));
        }
    };

    return (
        <div>
            <h1>TechZone</h1>
            <div className="filter">
                <input
                    type="number"
                    placeholder="Filtrar por preço máximo"
                    value={filterPrice}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="products">
                {filteredProducts.map((product) => (
                    <div className="product" key={product.product_ID} onClick={() => navigate(`/product/${product.product_ID}`)}>
                        {product.product_image && <img src={product.product_image} alt="" />}
                        <h2>{product.product_name}</h2>
                        <p>{product.product_description}</p>
                        <span>{`R$ ${product.product_price},00`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeProductsUser;

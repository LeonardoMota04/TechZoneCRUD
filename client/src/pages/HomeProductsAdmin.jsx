import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const HomeProductsAdmin = () => {
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

    const handleDelete = async (product_ID) => {
        if (window.confirm("Você tem certeza que deseja deletar este produto?")) {
            try {
                await axios.delete(`http://localhost:8800/products/${product_ID}`);
                setFilteredProducts(filteredProducts.filter((product) => product.product_ID !== product_ID));
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="filter">
                <input
                    type="number"
                    placeholder="Filtrar por preço máximo"
                    value={filterPrice}
                    onChange={handleFilterChange}
                />
            </div>
            <button className="addButton">
                <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Adicionar produto</Link>
            </button>
            <div className="products">
                {filteredProducts.map((product) => (
                    <div className="product" key={product.product_ID}>
                        {product.product_image && <img src={product.product_image} alt="" />}
                        <h2>{product.product_name}</h2>
                        <p>{product.product_description}</p>
                        <span>{`R$ ${product.product_price},00`}</span>
                        <button className='update' onClick={() => navigate(`/update/${product.product_ID}`)}>Update</button>
                        <button className='delete' onClick={() => handleDelete(product.product_ID)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeProductsAdmin;

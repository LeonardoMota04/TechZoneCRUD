import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProducts();
    }, []);

    const handleDelete = async (product_ID) => {
        try {
            await axios.delete(`http://localhost:8800/products/${product_ID}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>TechZone</h1>
            <h2 className="subtitle">Celulares</h2>
            <div className="products">
                {products.map((product, index) => (
                    <div className="product" key={index}>
                        {product.product_image && <img src={product.product_image} alt="" />}
                        <h2>{product.product_name}</h2>
                        <p>{product.product_description}</p>
                        <span>{`R$ ${product.product_price},00`}</span>
                        <button className='update'><Link to={`/update/${product.product_ID}`}>Update</Link></button>
                        <button className='delete' onClick={() => handleDelete(product.product_ID)}>Deletar</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Adicionar produto</Link>
            </button>
        </div>
    );
};

export default Products;

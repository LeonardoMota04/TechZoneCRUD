import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/products/byID/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className='product-detail'>
            {product.product_image && <img src={product.product_image} alt="Produto" />}
            <h1>{product.product_name}</h1>
            <p>{product.product_description}</p>
            <span>{`R$ ${product.product_price},00`}</span>
        </div>
    );
};

export default Product;

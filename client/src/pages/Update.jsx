import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: "",
        product_description: "",
        product_price: null,
        product_image: "",
    });

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

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/products/${id}`, product);
            navigate("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Editar produto - ID: {id}</h1>
            <input type="text" value={product.product_name} placeholder='Nome do produto' onChange={handleChange} name='product_name' />
            <input type="text" value={product.product_description} placeholder='Descrição do produto' onChange={handleChange} name='product_description' />
            <input type="number" value={product.product_price} placeholder='Preço do produto' onChange={handleChange} name='product_price' />
            <input type="text" value={product.product_image} placeholder='Imagem do produto' onChange={handleChange} name='product_image' />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;

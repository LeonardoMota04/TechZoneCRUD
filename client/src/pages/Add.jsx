import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const [product, setProduct] = useState({
        product_name: "",
        product_description: "",
        product_price: null,
        product_image: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/products", product);
            navigate("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Add novo produto</h1>
            <input type="text" placeholder='Nome do produto' onChange={handleChange} name='product_name' />
            <input type="text" placeholder='Descrição do produto' onChange={handleChange} name='product_description' />
            <input type="number" placeholder='Preço do produto' onChange={handleChange} name='product_price' />
            <input type="text" placeholder='Imagem do produto' onChange={handleChange} name='product_image' />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
    );
};

export default Add;

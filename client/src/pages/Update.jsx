import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const[product, setProduct] = useState({
        product_name:"",
        product_description:"",
        product_price: null,
        product_image:"",
    })

    // NAVEGAÇÃO
    const navigate = useNavigate()

    // PEGAR O ID
    const location = useLocation()
    const productID = location.pathname.split("/")[2]

    // PEGAR O VALOR ENQUANTO ESCREVE
    const handleChange = (e) => {
        setProduct(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    // AO CLICAR NO UPDATE, ELE MANDA USANDO AXIOS COM PUT
    const handleClick = async e => {
        e.preventDefault() // tira o refresh automático da pagina

        try {   
            await axios.put("http://localhost:8800/products/" + productID, product)
            navigate("/")
        } catch(err){
            console.log(err)
        }

    }
    console.log(product)
  return (
    <div className='form'>
        <h1>Editar produto</h1>
        <input type="text" placeholder='NOVO Nome do produto' onChange={handleChange} name='product_name'/>
        <input type="text" placeholder='NOVO Descrição do produto'onChange={handleChange} name='product_description'/>
        <input type="number" placeholder='NOVO Preço do produto' onChange={handleChange} name='product_price'/>
        <input type="text" placeholder='NOVA imagem do produto' onChange={handleChange} name='product_image'/>
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
    const[product, setProduct] = useState({
        product_name:"",
        product_description:"",
        product_price: null,
        product_image:"",
    })

    // NAVEGAÇÃO
    const navigate = useNavigate()

    // PEGAR O VALOR ENQUANTO ESCREVE
    const handleChange = (e) => {
        setProduct(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    // AO CLICAR NO ADD, ELE MANDA USANDO AXIOS COM POST
    const handleClick = async e => {
        e.preventDefault() // tira o refresh automático da pagina

        try {   
            await axios.post("http://localhost:8800/products", product)
            navigate("/")
        } catch(err){
            console.log(err)
        }

    }
    console.log(product)
  return (
    <div className='form'>
        <h1>Add novo produto</h1>
        <input type="text" placeholder='Nome do produto' onChange={handleChange} name='product_name'/>
        <input type="text" placeholder='Descrição do produto'onChange={handleChange} name='product_description'/>
        <input type="number" placeholder='Preço do produto' onChange={handleChange} name='product_price'/>
        <input type="text" placeholder='imagem do produto' onChange={handleChange} name='product_image'/>
        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
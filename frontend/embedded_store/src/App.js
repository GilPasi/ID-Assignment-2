/*Internet development course - Assignment 4 
  Authors:
    Yulia Moshan 319656510
    Gil Pasi     206500936
    Dependencies: nodemon, express, cors, mongojs
*/
import './App.css';
import {useState , useEffect} from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import Products from "./components/products";

function App() {
  const [cartContent , setCartContent] = useState([])
  
  useEffect(() => {
    const cartId = localStorage.getItem("cart id")
    const URL  = "http://localhost:3001/cart?id=" + (cartId?cartId:"")

    fetch(URL)
      .then((res) => res.json())
      .then((cartData) =>{
        //Keep the id for future actions

        if(cartId !== cartData._id)//Update only if the previous value was deleted
          localStorage.setItem("cart id",cartData._id);
        const newCartContent =cartObjectToArray(cartData)
        setCartContent(newCartContent)
      })
  },[]);


/*   cartData input example: 
      {ard:{
        product_id:arduino
        name: "Arduino",
        line_price: 9.99,
        quantity: 2
      }} */

  const cartObjectToArray = (CART_OBJECT)=>{
    const CART_ARRAY = Object.entries(CART_OBJECT.items).map(([key,value])=>({
      productId:value.product_id,
      name:value.name,
      quantity:value.quantity,
      unitPrice: value.line_price,
      }))
  return CART_ARRAY
  }


  const handleAdd =(event)=>{
    console.log( localStorage.getItem("cart id"))
    const _productId = event.target.name

    //If the item already exists its a PUT request, not a POST
    if( cartContent.some(obj => obj.id === _productId)){
      handleChangeQuantity(event)
      return;
    }

    //Adjust for a post reqest
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:localStorage.getItem("cart id"),//Saved as a ref since no render is needed
          product: _productId,//Event based trigger 
        })
    }


    fetch("http://localhost:3001/cart/product" ,requestOptions)
          .then((res) => res.json())
          .then((cartData) =>{

          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
   })}


  const handleRemove = (event)=>{
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:localStorage.getItem("cart id"),
          product: event.target.name,//Event based trigger 
        })
    }
  fetch("http://localhost:3001/cart/product" ,requestOptions)
      .then((res)=>res.json())
      .then((cartData)=>{
          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
      })
  }

  const handleChangeQuantity =(event) =>{
    const _productId = event.target.name
    const _quantity =  event.target.value !== '' ? event.target.value : '0';

    if(_quantity < 0)return

    console.log(_quantity)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:localStorage.getItem("cart id"),//Saved as a ref since no render is needed
          product: _productId,//Event based trigger 
          quantity: _quantity,
        })
    }
    // if(_quantity)
    //   requestOptions.body.quantity = _quantity

    fetch("http://localhost:3001/cart/product" ,requestOptions)
          .then((res) => res.json())
          .then((cartData) =>{

          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
   })}

  return (
    <div className="App">
      <Header selectedProducts={cartContent} handleX={handleRemove} handleEdit={handleChangeQuantity}/>
      <Products handleAdd={handleAdd}/>
      <Footer/>
    </div>
  );
}

export default App;

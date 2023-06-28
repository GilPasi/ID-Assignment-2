import './App.css';
import {useState , useEffect , useRef} from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import Products from "./components/products";

function App() {
  const [showCart , setShowCart] = useState(false)
  const [cartContent , setCartContent] = useState([])
  const cartId = useRef(0)
  
  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((cartData) =>{

        cartId.current = cartData._id

        console.log("id" , cartData._id)
        const newCartContent =Object.entries(cartData.items).map(([key,value])=>({
          name:value.name,
          quantity:value.quantity,
          unitPrice: value.line_price,
       }))

      setCartContent(newCartContent)
      
      })
  },[]);
  useEffect(() => {
  
      console.log("cart" , cartContent)
      
},[cartContent]);



/*   cartData input example: 
      {ard:{
        name: "Arduino",
        line_price: 9.99,
        quantity: 2
      }} */

  const cartObjectToArray = (CART_OBJECT)=>{
    const CART_ARRAY = Object.entries(CART_OBJECT.items).map(([key,value])=>({
      name:value.name,
      quantity:value.quantity,
      unitPrice: value.line_price,
      }))
  return CART_ARRAY
  }


  const handleAdd =(event)=>{

    //Adjust for a post request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:cartId.current,//Saved as a ref since no render is needed
          product: event.target.name,//Event based trigger 
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


  const handleDelete = (event)=>{
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cart_id:cartId.current,//Saved as a ref since no render is needed
          product: event.target.name,//Event based trigger 
        })
    }
      


  fetch("http://localhost:3001/cart/product" ,{method:"DELETE"})
      .then((res)=>res.json())
      .then((cartData)=>{
          //Customize the server data to client data
          const newCartContent =cartObjectToArray(cartData);
          //Rerender the cart component
          setCartContent(newCartContent)
      })
  }

  return (
    <div className="App">
      <Header selectedProducts={cartContent} xHandler={handleDelete}/>
      <Products handleAdd={handleAdd}/>
      <Footer/>
    </div>
  );
}

export default App;

import './App.css';
import {useState , useEffect} from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import Products from "./components/products";

function App() {
  const [showCart , setShowCart] = useState(false)
  const [cartContent , setCartContent] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((cartData) =>{
        let items = cartData.items
        console.log("i" , items)
        items = Object.entries(items)

        console.log("i=p" , items)


        const newCartContent =Object.entries(cartData.items).map(([key,value])=>({
          name:value.name,
          quantity:value.quantity,
          unitPrice: value.line_price,
       }))
       console.log("new cart" , newCartContent)
        


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

  const handleAdd =(e)=>{
    console.log("YESSS")
  }

  return (
    <div className="App">
      <Header selectedProducts={cartContent}/>
      <Products handleAdd={handleAdd}/>
      <Footer/>
    </div>
  );
}

export default App;

import './App.css';
import products from './products_view'; 
import {useState , useEffect} from 'react'
function App() {
  const [step,setStep] = useState("buy");
  const [showCart,setShowCart] = useState(false);
  const [cart, setCart ] = useState([]);
  const [itemsList , setItemsList] = useState(<></>);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((inCart) =>
      // console.log("input" , inCart)
      setCart(inCart)
      
      )
      .catch(rejected => {
        console.log(rejected);
        });
  }, []);

  useEffect(() =>{
    let items = cart.items
    if(!items)return;

    console.log("items" ,items)
    setItemsList( Object.entries(items)
          .map(([key, value])=>
          <li key={key} className="spannner">
            {value.name}
            <input ></input>
            <span className='cart-data'>{value.quantity}⚗️</span>
            <span className='cart-data'>{(value.quantity)*(value.unit_price)}💰</span>
            <button className='button-x'>X</button>
          </li>))
  },[cart])

  const handleAdd =(e)=>{
    

      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'},
          body: JSON.stringify({roduct_id : "e.target.key"})
      };
      //מאיפה זה עובד??? הקריאה הזאת?
  //כתוב לי שה - bodyparser  הוא deprecated
  //AHLA
    fetch("http://localhost:8080/products" ,requestOptions)
    .then((res) => console.log('resss',res))
    .catch(err=>console.log(err))
    // .then((inCart) =>setCart(inCart))
    
  }


  return (

    <article className="app">
      <header className='aligner'>
        <div id="cart" style={{visibility:showCart ? "" : "hidden"}}>
          <h3 className="title-small">Your cart</h3>
        <ul>
          {itemsList}
        </ul>
        </div>

        <h1 className='title'>
          Welcome to the Potion World!
        </h1>
        <div className="centerizer">
          <button onClick={()=>setShowCart(prevVis=>!prevVis)}>{showCart?"hide" : "show"} Cart</button>
        </div>
      </header>

      {step==="buy"?
      <div>
      
        <section className="products aligner">
            {products
            .map(product=><div 
                            key={product.id}
                            className="product centerizer" 
                            onClick={handleAdd}
                            >
                                    <h3>{product.name}</h3>
                                    <img src={"../images/" + product.image}/>
                                    <span>{product.price} 💰</span>
                                    <p>{product.description}</p>

                          </div>)}

        </section>
        <div className="aligner" style={{margin:"50px"}}>
          <button onClick={()=>setStep("done")}>Buy</button>

        </div>
        </div>:
          <h1 id="exit-message">Thank you for your purchase!</h1>}
      

    </article>
  );
}

export default App;

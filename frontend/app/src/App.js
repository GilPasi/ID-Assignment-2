import './App.css';
import products from './products_view'; 
import {useState , useEffect} from 'react'
function App() {
  const [step,setStep] = useState("buy");
  const [showCart,setShowCart] = useState(false);
  const [cart, setCart ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/test")
      .then((res) => res.json())
      .then((data) =>setCart(data.message))
      .catch(rejected => {
        console.log(rejected);
        });
  }, []);


  return (

    <article className="app">
      <header className='aligner'>
        <div id="cart" style={{visibility:showCart ? "" : "hidden"}}>
          <h3 className="title-small">Your cart</h3>
        <ul>
          {products.map(product=><li className="spannner">
                                    {product.name}
                                    <input value={cart.quantity}></input>
                                    <span className='cart-data'>a⚗️</span>
                                    <span className='cart-data'>a💰</span>
                                    <button className='button-x'>X</button>
                                </li>)}
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
            {products.map(product=><div className="product centerizer">
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

import { useState } from "react";
import Cart from "./cart";
const Header = (props) => {
  const { handleX, handleEdit, selectedProducts } = props;
  const [showCart, setShowCart] = useState(false);

  return (
    <header>
      <div id="top-menu">
        <h1>My shop!</h1>
        <button
          id="cart-button"
          onClick={() => setShowCart((prevShow) => !prevShow)}
        >
          {showCart ? "Hide" : "Show"} cart
        </button>

        {showCart && (
          <Cart
            productsList={selectedProducts}
            handleClick={handleX}
            handleChange={handleEdit}
          />
        )}
      </div>
    </header>
  );
};
export default Header;

const Cart = (props) => {
  const { productsList, handleClick, handleChange } = props;

  /*The products list must work by the following template:
    prodList=[
        ...
        {
        productId: "arduino",
        name:"Arduino", 
        quantity:3,
        unitPrice:25},
        ...
    ]
    */
  let listElement = <></>;

  //On the initial connection, do not calculate the cart
  if (props.productsList)
    listElement = productsList.map((prod) => (
      <li className="aligner">
        {prod.name}{" "}
        <input
          type="number"
          value={prod.quantity}
          onChange={handleChange}
          name={prod.productId}
        />
        <span>{prod.quantity * prod.unitPrice}$</span>
        <button onClick={handleClick} name={prod.productId}>
          X
        </button>
      </li>
    ));

  return (
    <div id="cartbox">
      <ul>{listElement}</ul>
      <div id="cart_summary"></div>
    </div>
  );
};
export default Cart;

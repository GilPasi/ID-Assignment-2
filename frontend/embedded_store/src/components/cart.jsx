const Cart = (props) => {
  /*The products list must work by the following template:
    prodList=[
        ...
        {name:"arduino", 
        quantity:3,
        unitPrice:25},
        ...
    ]
    */
  let listElement = <></>;
  if (props.productsList)
    listElement = props.productsList.map((prod) => (
      <li className="aligner">
        {prod.name} <input type="number" value={prod.quantity} />
        <span>{prod.quantity * prod.unitPrice}$</span>
        <button onClick={props.handleClick}>X</button>
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

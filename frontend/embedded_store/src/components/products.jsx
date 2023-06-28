import Product from "./product";

const Products = (props) => {
  return (
    <div className="products">
      <Product
        name="Arduino"
        img="ard.jpg"
        price={12}
        handleClick={props.handleAdd}
        description="Open-source electronic 
                  prototyping platform 
                  enabling users to create 
                  interactive electronic objects"
      />

      <Product
        name="Raspberry Pi"
        img="rasp.jpg"
        price={99}
        handleClick={props.handleAdd}
        description="Small single-board computer (SBCs)"
      />
      <Product
        name="ESP-32"
        img="esp.webp"
        price={9.99}
        handleClick={props.handleAdd}
        description="feature-rich MCU with integrated Wi-Fi and Bluetooth connectivity for a wide-range of applications"
      />
    </div>
  );
};
export default Products;

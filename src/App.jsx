import "./App.css";
import products from "./data/products";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [itemquantity, setItemQuantity] = useState(products.map(() => 1));

  const addNewCart = (item, index) => {
    if (cart.includes(item)) {
      const newItemquantity = [...itemquantity];
      newItemquantity[cart.indexOf(item)] += 1;
      setItemQuantity(newItemquantity);
    } else {
      const newItemquantity = [...itemquantity];
      setItemQuantity(newItemquantity);
      setCart([...cart, item]);
    }
  };

  const deleteCart = (index) => {
    const newCard = [...cart];
    newCard.splice(index, 1);
    setCart(newCard);
    const newItemquantity = [...itemquantity];
    newItemquantity.splice(index, 1);
    newItemquantity.push(1);
    setItemQuantity(newItemquantity);
  };

  const addQuantity = (index) => {
    const newItemquantity = [...itemquantity];
    newItemquantity[index] += 1;
    setItemQuantity(newItemquantity);
  };

  const deleteQuantity = (index) => {
    const newItemquantity = [...itemquantity];
    console.log(index);
    if (newItemquantity[index] > 1) {
      newItemquantity[index] -= 1;
      setItemQuantity(newItemquantity);
    } else {
      deleteCart(index);
    }
  };

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list-container">
          {products.map((item, index) => {
            return (
              <div className="product-list" key={index}>
                <div className="product">
                  <img src={item.image} alt="sample name" />
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <button onClick={() => addNewCart(item, index)}>Add to cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
      <section className="cart">
        <h1 className="cart-heading">Cart (Total Price is x Baht)</h1>
        <div className="cart-item-list">
          {cart.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <h1>Item name: {item.name}</h1>
                <h2>Price: {(item.price * itemquantity[index]).toLocaleString()} Baht</h2>
                <h2>Quantity: {itemquantity[index]}</h2>
                <button className="delete-button" onClick={() => deleteCart(index)}>
                  x
                </button>
                <div className="quantity-actions">
                  <button className="add-quantity" onClick={() => addQuantity(index)}>
                    +
                  </button>
                  <button className="subtract-quantity" onClick={() => deleteQuantity(index)}>
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

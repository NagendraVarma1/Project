import React, { useEffect, useState } from "react";
import Modal from "./UI/Modal";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

const CartItems = (props) => {
  const [allCartMedicines, setAllCartMedicines] = useState([]);

  async function fetchData() {
    const response = await axios.get(
      "https://crudcrud.com/api/ec2f46f440e44d4b8d87cc9df85914ca/cartMedicine"
    );
    const data = await response.data;
    if (data) {
      const cartMedicines = Object.keys(data).map((index) => ({
        id: data[index]._id,
        name: data[index].name,
        description: data[index].description,
        price: data[index].price,
      }));
      setAllCartMedicines(cartMedicines);
    } else {
      setAllCartMedicines([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (allCartMedicines.length === 0) {
    return (
      <Modal>
        <Container style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>No Cart Products</h1>
        <Button onClick={props.onCloseClick}>X</Button>
        </Container>
        </Modal>
    );
  }
  return (
    <Modal>
      <ul>
        <Container style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>Cart</h1>
          <Button onClick={props.onCloseClick}>X</Button>
        </Container>

        {allCartMedicines.map((product) => (
          <li
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
              marginTop: "10px",
              padding: "6px",
            }}
          >
            <h3>{product.name}</h3>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
export default CartItems;

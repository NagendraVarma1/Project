import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const AvailableMedicines = () => {
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [reload, setReload] = useState(true)

  async function fetchData() {
    setReload(false)
    const response = await axios.get(
      "https://crudcrud.com/api/ec2f46f440e44d4b8d87cc9df85914ca/medAvailable"
    );
    const data = await response.data;
    if (data) {
      const allAvailMedicines = Object.keys(data).map((index) => ({
        id: data[index]._id,
        name: data[index].medName,
        description: data[index].desc,
        price: data[index].price,
        quantity: data[index].quantity,
      }));
      setAvailableMedicines(allAvailMedicines);
    } else {
      setAvailableMedicines([]);
    }
  }

  useEffect(() => {
    if(reload){
        fetchData();
    }
    
  }, [reload]);

  async function quantityHandler(medicine) {
    console.log(medicine);
    const quantityUpdatedData = {
      ...medicine,
      quantity: medicine.quantity - 1,
    };
    await axios.put(
      `https://crudcrud.com/api/ec2f46f440e44d4b8d87cc9df85914ca/medAvailable/${medicine.id}`,
      quantityUpdatedData
    );
    const updatedCartData = {
      ...medicine,
      quantity: 1,
    };

    await axios.post(
      "https://crudcrud.com/api/ec2f46f440e44d4b8d87cc9df85914ca/cartMedicine",
      updatedCartData
    );
    setReload(true)
  };



  return (
    <Container className="mt-4" style={{width: '70%'}}>
      <ul className="list-unstyled">
        <h2>Available Medicines</h2>
        {availableMedicines.map((medicine) => (
          <li
            key={medicine.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
            }}
          >
            <h1>{medicine.name}</h1>
            <p>{medicine.description}</p>
            <h3>{medicine.price}</h3>
            <h2>{medicine.quantity}</h2>
            {medicine.quantity > 0 ? <Button onClick={() => quantityHandler(medicine)}>
              Add to Cart
            </Button> : <Button disabled>Out of Stoke</Button>} 
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default AvailableMedicines;

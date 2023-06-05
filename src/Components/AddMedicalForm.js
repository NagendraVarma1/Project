import axios from "axios";
import React, { useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";

const AddMedicalForm = () => {

    const medNameInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();
    const quantityInputRef = useRef();

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const medName = medNameInputRef.current.value;
        const desc = descriptionInputRef.current.value;
        const price = priceInputRef.current.value;
        const quantity = quantityInputRef.current.value;

        const medicineDetials = {
            medName,
            desc, 
            price,
            quantity
        }
        await axios.post('https://crudcrud.com/api/ec2f46f440e44d4b8d87cc9df85914ca/medAvailable', medicineDetials)

        medNameInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        priceInputRef.current.value = '';
        quantityInputRef.current.value = '';
        window.location.reload();
    }

  return (
    <Container  style={{width: '60%', border: '2px solid black', borderRadius: '5px', padding: '20px 40px'}}>
    <Form onSubmit={formSubmitHandler}>
      <Form.Group>
        <Form.Label>Medicine Name: </Form.Label>
        <Form.Control type="text" ref={medNameInputRef}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description: </Form.Label>
        <Form.Control type="text" ref={descriptionInputRef}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price: </Form.Label>
        <Form.Control type="number" ref={priceInputRef}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Quantity Available: </Form.Label>
        <Form.Control type="number" ref={quantityInputRef}/>
      </Form.Group>
      <div style={{textAlign : 'center', marginTop: '20px '}}>
        <Button type="submit">Add Medicine</Button>
      </div>
    </Form>
    </Container>
  );
};

export default AddMedicalForm;

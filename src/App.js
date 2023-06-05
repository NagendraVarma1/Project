import './App.css';
import { Button, Container } from 'react-bootstrap';
import AddMedicalForm from './Components/AddMedicalForm';
import AvailableMedicines from './Components/AvailableMedicines';
import CartItems from './Components/CartItems';
import { useState } from 'react';

function App() {
  const [openCart, setOpenCart] = useState(false)

  const cartOpenHandler = () => {
    setOpenCart(true)
  }

  const cartCloseHandler = () => {
    setOpenCart(false);
  }
  return (
    <>
    {openCart && <CartItems onCloseClick={cartCloseHandler}/>}
    <Container fluid style={{display: 'flex', justifyContent: 'space-around', marginTop: '30px',marginBottom: '30px'}}>
      <h1>Medical Store</h1>
      <Button onClick={cartOpenHandler}>Cart</Button>
    </Container>
    <Container><AddMedicalForm /></Container>
    <Container><AvailableMedicines /></Container>
    
    </>
  );
}

export default App;

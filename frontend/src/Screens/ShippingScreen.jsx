import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart; 
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalcode, setPostalCode] = useState(shippingAddress?.postalcode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const submitHandler = (e) => {
        e.preventDefault();
        if (!address || !city || !postalcode || !country) 
        // Display toast message for unfilled fields
        toast.error('Please fill in all fields', {
            position: toast.POSITION.TOP_CENTER,
        });
        dispatch(saveShippingAddress({address, city, postalcode, country}));
        navigate('/payment');
    };
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='postalcode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                type='text'
                placeholder='Postal Code'
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingScreen
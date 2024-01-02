import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Card, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    },[shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

  return (
    
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Card>
        <ListGroup>
        <ListGroup.Item>
        <h2>Payment Method</h2>
        </ListGroup.Item>
        <ListGroup.Item>
        <Form onSubmit={ submitHandler }>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                type='radio'
                className='my-2'
                label='PayPal or Cash'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                >  
                </Form.Check>
                </Col>
            </Form.Group><br/>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
        </ListGroup.Item>
        </ListGroup>
        </Card>

    </FormContainer>
    
  )
};

export default PaymentScreen
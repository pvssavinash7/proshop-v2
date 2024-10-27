import React from 'react';
import {Form, Button, Card, Row, Col, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../slices/cartSlice';
import { useState } from 'react';



const Product = ({product}) => {

    const dispatch = useDispatch();

    const [ qty, setQty ] = useState(1);

    const addToCartHandler = () => {
        dispatch(addToCart({...product,qty}));
        // navigate('/cart');
        // navigate('/');
        toast.success('Product added to cart');
    }

  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image} variant='top' className="product-image" />
        </Link>
        <Card.Body>
            <Link to={`/products/${product._id}`}>
                <Card.Title as='div' className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
            </Card.Text>
             
            {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    
                                    <Col>
                                    <Form.Control
                                        as='select'
                                        value={qty}
                                        onChange={(e)=>setQty(Number(e.target.value))}>
                                            {[...Array(50).keys()].map((x) =>(
                                                <option key={x+1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                    <ListGroup.Item>
                            <Button 
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                            bg='black'
                            >
                                Cart
                            </Button>
                        </ListGroup.Item>   
                                        

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                        }
                        
                        
            
            <Card.Text as='h3'>
                Rs.{product.price}
            </Card.Text>

        </Card.Body>

    </Card>
  )
}

export default Product
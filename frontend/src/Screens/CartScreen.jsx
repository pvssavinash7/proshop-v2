import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, Modal } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = useSelector((state) => state.auth); // Access user info from Redux state

    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', qty: 1 });

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    }

    const handleAddNewProduct = () => {
        if (newProduct.name && !isNaN(newProduct.price) && !isNaN(newProduct.qty)) {
            const product = {
                _id: `new-${Date.now()}`,
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                qty: parseInt(newProduct.qty, 10),
                image: '/images/default.jpg'
            };
            addToCartHandler(product, product.qty);
            setNewProduct({ name: '', price: '', qty: '' });  // Clear the fields after adding
            handleCloseModal();
        } else {
            alert("Please enter valid product details.");
        }
    };

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Shop Now</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Link to={`/products/${item._id}`}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Link>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>Rs.{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        >
                                            {[...Array(50).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <strong>Rs.{(item.price * item.qty).toFixed(2)}</strong>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                {userInfo && userInfo.isAdmin && ( // Only show button if the user is an admin
                    <Button variant='primary' className='mt-3' onClick={handleShowModal}>
                        <FaPlus /> Add New Product
                    </Button>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Total {cartItems.length} Items</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Total Price Rs.
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            {/* Modal for Adding New Product */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='productName'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                placeholder='Enter product name'
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId='productPrice' className='mt-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                name='price'
                                placeholder='Enter product price'
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId='productQty' className='mt-3'>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type='number'
                                name='qty'
                                placeholder='Enter quantity'
                                value={newProduct.qty}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>Close</Button>
                    <Button variant='primary' onClick={handleAddNewProduct}>Add Product</Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default CartScreen;

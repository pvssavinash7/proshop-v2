import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, From, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';



const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    

  return isLoading ? <Loader /> : error ? <Message variant='danger' /> : (
    <>
    <h2>Order Id: {order._id}</h2>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p>
                        <strong>Name: </strong>{order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{order.user.email}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address} ,{order.shippingAddress.city},
                        {order.shippingAddress.postalCode} {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>
                            Delivered on { order.deliveredAt }
                        </Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>
                            Paid on { order.paidAt }
                        </Message>
                    ) : (
                        <Message variant='danger'>Not Paid</Message>
                    )}

                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Order Items</h3>
                    {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>Order Summary</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>Rs.{order.totalPrice}</Col>
                    </Row>

                    <Row>
                        <Col>Shipping</Col>
                        <Col>Rs.{order.shippingPrice}</Col>
                    </Row>

                    <Row>
                        <Col>Tax</Col>
                        <Col>Rs.{order.taxPrice}</Col>
                    </Row>

                    <Row>
                        <Col>Total</Col>
                        <Col>Rs.{order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                {/*PAY ORDER PLACEORDER*/}
                {/*MARK AS DELIVERED PLACEORDER */}
            </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  );

}

export default OrderScreen
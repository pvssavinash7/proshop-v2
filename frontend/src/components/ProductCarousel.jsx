import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
// import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    // if (!Array.isArray(products)) {
    //     return <Message variant='danger'>Invalid product data</Message>;
    // }

  return isLoading ? ('') : error ? <Message variant='danger'>{error}</Message>
  : (
    <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product) => (
            <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (Rs.{product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel
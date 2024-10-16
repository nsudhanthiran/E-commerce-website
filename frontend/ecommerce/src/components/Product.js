import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded'>

        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image} />
        </Link>
        <Card.Body>
            <Link to={`/products/${product._id}`} className='text-dark'>
                <Card.Title as="div">
                    <b>{product.name}</b>
                </Card.Title>
            </Link>

            <Card.Text as="p">
                Rated {product.rating} from {product.numReviews} reviews
            </Card.Text>

            <Card.Text as="h6">
                ${product.price}
            </Card.Text>

            <Rating value={product.stars} text={`${product.numReviews} reviews`} color={'#f8e825'} />
        </Card.Body>
    </Card>
  )
}

export default Product

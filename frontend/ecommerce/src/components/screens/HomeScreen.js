import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../Product'
import { listProducts } from '../../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'


function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector((state)=>state.productList)

    const {error,loading,products} = productList

    // console.log(products)

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]); // Add this empty dependency array

    return (
        <Container>
            <br />
            {
                loading?(
                    <Loader />
                ):error? (
                    <Message variant='danger'>{error}</Message>
                ):(
                    <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
                )
            }
        </Container>
    )
}

export default HomeScreen
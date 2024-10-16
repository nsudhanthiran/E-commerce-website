import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productsActions'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Product from '../Product'
import Message from '../Message'
import { useNavigate } from 'react-router'


function SellerScreen() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)

    const { error, loading, products } = productList

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]); // Add this empty dependency array

    console.log("userInfo", userInfo)

    const userProducts = userInfo ? products.filter(product => product.user === userInfo.id) : []



    return (
        <>
            {userInfo ? (
                <div>
                    {userProducts.length > 0 ? (
                        <Container>
                         <Row>
                         {userProducts.map((product) => (
                             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                 <Product product={product} />
                             </Col>
                         ))}
                     </Row>
                     </Container>
                    ) : (
                        <div className='mt-4'>
                            <Col md={6} className='mx-auto'>
                        <Message variant='info'>No products found</Message>
                        </Col>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className='mt-4'>
                            <Col md={6} className='mx-auto'>
                        <Message variant='danger'>Please log in to sell products</Message>
                        <Button variant='primary' onClick={() => navigate('/login')}>Login</Button>
                        </Col>
                        </div>
                </div>
            )}
        </>
    )
}

export default SellerScreen

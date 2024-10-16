import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Container, Alert } from 'react-bootstrap'
import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductScreen({ match }) {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/products/${match.params.id}`);
        console.log("Fetched product data:", data); // Debug log
        setProduct(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error);
        setError('An error occurred while fetching the product.')
        setLoading(false)
      }
    }

    fetchProduct();
  }, [match.params.id]);

  if (loading) return <div>Loading...</div>
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Container>
      <h1>Tempscreen</h1>
      <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
      {product && Object.keys(product).length > 0 ? (
        <Row>
          <Col md={6}>
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name} 
                fluid 
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  e.target.src = 'placeholder.jpg'; // Replace with an actual placeholder image path
                }}
              />
            ) : (
              <Alert variant="warning">No image available</Alert>
            )}
          </Col>
          <Col md={6}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {/* Add more product details here */}
          </Col>
        </Row>
      ) : (
        <Alert variant="info">No product data available</Alert>
      )}
      <pre>{JSON.stringify(product, null, 2)}</pre> {/* Debug output */}
    </Container>
  )
}

export default ProductScreen
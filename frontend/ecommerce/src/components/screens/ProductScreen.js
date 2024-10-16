import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Container, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../Rating';
import { listProductDetails, deleteProduct } from '../../actions/productsActions';
import Loader from '../Loader';
import Message from '../Message';


function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;



  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const increaseQuantity = () => {
    if (quantity < product.stockcount) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };


  const updateHandler = () => {
    navigate(`/update/${id}`);
  }

  const confirmationHandler = () => {
    dispatch(deleteProduct(product._id));
    navigate('/products/');
  }

  const deleteHandler = () => {
    handleShow(); // Show the modal instead of using window.confirm
  }

  const confirmDeleteHandler = () => {
    confirmationHandler();
    handleClose(); // Close the modal after confirming deletion
  }

  return (
    <Container>
      <Link to='/' className='btn btn-dark my-3'>Go Back</Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.stars}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.stockcount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          className="p-2"
                          onClick={decreaseQuantity}
                          disabled={quantity === 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                        </Button>
                        <Form.Control
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          min={1}
                          max={product.stockcount}
                          readOnly
                          className="mx-2 text-center no-spinner"
                          style={{ width: '60px' }}
                        />
                        <Button
                          variant="outline-secondary"
                          className="p-2"
                          onClick={increaseQuantity}
                          disabled={quantity === product.stockcount}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  {userInfo ? (
                    userInfo.id === product.user ? (


                      <div>
                        <Row>
                          <Col md={6}>
                            <Button
                              className='btn-block btn-success'
                              disabled={product.stockcount === 0}
                              type='button'
                              onClick={addToCartHandler}
                            >
                              Add to Cart
                            </Button>
                          </Col>

                          <Col md={6}>
                            <Button className='btn-block btn-success' type='button' onClick={updateHandler}>
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : (

                      <div>
                        <Col md={6}>
                          <Button
                            className='btn-block btn-success'
                            disabled={product.stockcount === 0}
                            type='button'
                            onClick={addToCartHandler}
                          >
                            Add to Cart
                          </Button>
                        </Col>
                      </div>
                    )
                  ) : (
                    <div className="text-center text-warning">
                      Please login to start purchasing
                    </div>
                  )}
                </ListGroup.Item>

              </ListGroup>
            </Card>
            <div>
              {userInfo.id === product.user ? (
                <div className='mt-3'>
                  <Col md={6}>
                    <Button
                      variant='danger'
                      className='btn-block btn-failure'
                      type='button'
                      onClick={deleteHandler}
                    >
                      Delete Product
                    </Button>
                  </Col>
                </div>
              ) : (
                userInfo ? (
                <div className='mt-3'>
                  <Col md={6}>
                    <Button
                      variant='info'
                      className='btn-block btn-success'
                      type='button'
                      onClick={null}
                    >
                      Review Product
                    </Button>
                  </Col>
                </div>
              ): (
                <div>
                </div>
              ))}

              {/* Modal for confirming deletion */}
              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant='danger' onClick={confirmDeleteHandler}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;
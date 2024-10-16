import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Container, Form } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';



function CartScreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  console.log('quantity', quantity);

  const [cartquantity, setQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // create a var total which sums up the total price of all items in the cart

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;

  console.log('total', total);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/shipping');
  };


  useEffect(() => {
    // Clear cart items after checkout
    if (cartItems.length === 0) {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);


  return (
    <>
      <div>

        {userInfo ? (

        <div>

        <Row>
          <Container>
            <Col md={8}>

              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <Message variant="info">
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (


                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <img src={item.image} alt={item.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={3}>
                          <Link to={`/products/${item.product}`} as="h3">{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.quantity}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.stockcount).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}>
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

              )}

            </Col>
          </Container>

        </Row>
        <br />
        <Container>
          <Row>
            <Col md={3}>
              <h3>Sumtotal:</h3>
            </Col>
            <Col md={3}>
              <h3>${total}</h3>
            </Col>
            <Col md={3}>
              {userInfo ? (
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>) : (
                <div className="text-center text-warning">
                  Please login to start purchasing
                </div>
              )}
            </Col>
          </Row>
        </Container>
        </div>
        ) : (
 
          <Container className='mt-4'>
          <Message variant='danger'>Please login to access cart page</Message>
          <Button variant='primary' onClick={() => navigate('/login')}>Login</Button>
          </Container>
        )

        }

      </div>
    </>
  )
};

export default CartScreen;

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { validPassword } from './Regex'
import { login } from '../../actions/userActions'

function LoginScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!validPassword.test(formData.password)) {
      setMessage('Password must contain at least 5 characters with at least one letter and one number')
    } else {
      setMessage('')
      try {
        await dispatch(login(formData.username, formData.password))
      } catch (error) {
        setMessage(error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail)
      }
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h3" className='text-center bg-black text-light'>Login</Card.Header>
            <Card.Body>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {loading ? (
                <Loader />
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Enter Username' 
                      value={formData.username} 
                      onChange={handleInputChange}
                      required 
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Enter Password' 
                        value={formData.password} 
                        onChange={handleInputChange}
                        required 
                      />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              )}
              <Row className='py-3'>
                <Col>
                  Don't have an account? <Link to='/signup'>Register</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
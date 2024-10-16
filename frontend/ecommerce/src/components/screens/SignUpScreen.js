import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { validEmail,validPassword } from './Regex'
import {signup} from '../../actions/userActions'


function SignUpScreen() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [message,setMessage] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userSignup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = userSignup


  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect])

  const submitHandler = (e) => {
      e.preventDefault()

      if(formData.password !== formData.confirmPassword){
        setMessage('Passwords do not match');
        navigate('/signup')

  }

  else if(!validEmail.test(formData.email)){
    setMessage('Please enter a valid email address');
    navigate('/signup')
  }
  

  else if(!validPassword.test(formData.password)){
    setMessage('Password must contain at least 5 characters with at least one letter and one number');
    navigate('/signup')
  }

  else{
    dispatch(signup(formData.fname, formData.lname, formData.email, formData.username, formData.password))
    setMessage('Signup successful, please activate your account by clicking on the link sent to your email');
    window.location.href = 'http://localhost:8000/api/waiting/';
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h3" className='text-center bg-black text-light'>Sign Up</Card.Header>
            <Card.Body>

              {message && <Message variant='danger'>{message}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='fname'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter First Name' 
                    value={formData.fname} 
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='lname'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter Last Name' 
                    value={formData.lname} 
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
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
                <Form.Group className='mb-3' controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder='Confirm Password' 
                      value={formData.confirmPassword} 
                      onChange={handleInputChange}
                      required 
                    />
                    <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>

              <Row className='py-3'>
                <Col>
                  Already a User? <Link to='/login'>Login</Link>
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

export default SignUpScreen
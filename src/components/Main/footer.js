import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {PUBLIC_URL} from '../../config'

export default function footer() {
    return (
        <Navbar fixed="bottom" expand="lg" variant="dark" bg="dark" >
        <Container style={{display:'flex', marginLeft:'0px'}} >
            <Navbar.Brand href="#"><img src={`${PUBLIC_URL}/LaundryEye.ico`} alt='logo' height='50'/> LaundryEye</Navbar.Brand>
        </Container>
        </Navbar>
    )
}

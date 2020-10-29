import React from 'react'
import {Navbar, Nav, NavDropdown,Button} from 'react-bootstrap'
import {PUBLIC_URL} from '../../config';

export default function NavbarComp(props) {
    return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home"><img src={`${PUBLIC_URL}/mogan-horizontal_blanco_MODIFICACIÓN.png`} alt='logo' height='50'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Vista General</Nav.Link>
                    <NavDropdown title="Sistemas" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/cageswasher">Lavadora de Jaulas</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">A</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav><Button onClick={props.handleLogOut}>LogOut </Button></Nav>
                    </Nav>
            </Navbar.Collapse>
            </Navbar>
    )
}

import React, {useEffect, useState} from 'react'
import {Navbar, Nav, NavDropdown,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {PUBLIC_URL, API_URL} from '../../config';
import axios from 'axios';

export default function NavbarComp(props) {
    const [loggedInUser,setLoggedInUser] = useState(null);
    useEffect(() => {
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        })
    }, [])

    return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/"><img src={`${PUBLIC_URL}/mogan-horizontal_blanco_MODIFICACIÓN.png`} alt='logo' height='50'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                loggedInUser?(
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown title="Maquinaria" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/">Planchas</NavDropdown.Item>
                            <NavDropdown.Item href="/cageswasher">Lavadora de Jaulas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">A</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/gmao">Gestión de mantenimiento</Nav.Link>
                        <Nav.Link href="/gmao/laundryMan">Vista Lavanderos</Nav.Link>
                        <Nav.Link href="/boilersComsumtion">Consumo calderas</Nav.Link>
                        {
                            loggedInUser? (loggedInUser.userType === 'admin'?(<Nav.Link href='/gmao/users'>Users</Nav.Link>):('')):('')
                        }
                        </Nav>
                        {
                        loggedInUser? (<Nav>
                        <Nav><Button onClick={props.handleLogOut}>LogOut </Button></Nav>
                        </Nav>) : (<Nav>
                        <Nav><Link to={'/signin'}> <Button>Registrarse</Button></Link></Nav>
                        </Nav>)
                        }
                        
                    </Navbar.Collapse>
                ):("")
                }
            </Navbar>
    )
}

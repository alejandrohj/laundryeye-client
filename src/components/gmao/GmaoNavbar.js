import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export default function GmaoNavbar(props) {
    
    return (
        props.loggedInUser?(
        <div className="sticky-top">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
                <Navbar.Brand href="/gmao">GMAO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/gmao/maintenance">Mantenimiento de turno</Nav.Link>
                    <Nav.Link href="/gmao/tasks">Tareas</Nav.Link>
                    <Nav.Link href="/gmao/stock">Stock</Nav.Link>
                    <Nav.Link href="/gmao/warehouses">Almacenes</Nav.Link>
                    </Nav>
                    <Nav style= {{margin: '0px 20px 0px 0px', fontSize: '20px'}}><p style= {{margin: '0px'}}>{props.loggedInUser.userName}</p></Nav>                 
                </Navbar.Collapse>

            </Navbar>
        </div>): (<p>Loading...</p>)
    )
}

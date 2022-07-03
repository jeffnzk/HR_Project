import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav, Container } from 'react-bootstrap';

export default function HRNavbar() {
    return (
        <Nav bg="premium" fill variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="/">HR Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/profiles">Employee Profiles</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/visa">Visa Status Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/hiring">Hiring Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/housing">Housing Management</Nav.Link>
            </Nav.Item>
            {sessionStorage.getItem('user') ?
                <Nav.Item>
                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                </Nav.Item> :
                <Nav.Item>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav.Item>
            }
        </Nav>
    );
}
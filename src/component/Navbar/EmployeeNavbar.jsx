import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav, Container } from 'react-bootstrap';
import store from "../../redux/store";

export default function EmployeeNavbar() {
    return (
        <Nav bg="premium" fill variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/application">Onboarding Application</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/personalinformation/">Personal Information</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/evisa">Visa Status Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/housing">Housing</Nav.Link>
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
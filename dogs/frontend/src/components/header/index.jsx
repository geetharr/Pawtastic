import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import menu from '../../images/menu.png';
import logo from '../../images/logo.png';
import { useState } from 'react';

export const GetNavItem = ({selectedPaze, href, page, pageName}) => {
    return (<NavItem>
        <NavLink className={page === selectedPaze ? 'active' : ''} href={href}>{pageName}</NavLink>
    </NavItem>
    )
}
const Header = ({page}) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const navListItems = [{ href: "/home", selectedPage: "home", pageName: "Home" },
    { href: "/adopt", selectedPage: "adopt", pageName: "Adopt" },
    { href: "/donate", selectedPage: "donate", pageName: "Donate" },
    { href: "/pet-services", selectedPage: "services", pageName: "Services" },
    { href: "/volunteer", selectedPage: "volunteer", pageName: "Volunteer" },
    { href: "/meetvet", selectedPage: "meetvet", pageName: "Meet a Vet" }
    ]

    return (
        <div>
            <Navbar className="navbar-expand-lg navbar-light bg-light header" >
                <NavbarBrand href="/"> <img src={logo} style={{ width: '150px' }} /></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2">
                    <img alt="test" src={menu} />
                </NavbarToggler>
                <Collapse isOpen={!collapsed} navbar>

                    <Nav navbar className="mb-lg-0 ms-auto">
                        {navListItems.map((item) =>  <GetNavItem key={item.href} selectedPaze={item.selectedPage} href={item.href} page={page} pageName={item.pageName} />
                        )}
                        <NavItem>
                            <NavLink href="/login" onClick={() => {
                                sessionStorage.setItem("user-token", '');
                            }}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <div>
            </div>
        </div>
    )
}

export default Header
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Nav>
            <Logo>Artemere</Logo>
            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/artist">Artist</Link>
                <Link to="/breeder">Breeder</Link>
            </NavLinks>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
`;

const Logo = styled.h1`
  color: #fff;
`;

const NavLinks = styled.div`
  a {
    color: #fff;
    margin-left: 1rem;
    text-decoration: none;
  }
`;

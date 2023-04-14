import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav className='w-50 mx-auto mt-5'>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/register-rbs'>Register RBS</Link>
            <Link to='/register-bs'>Register BS</Link>
        </nav>
    );
};

export default Header;
import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const logo = (props) => (
    <Link to='/'><div className={classes.Logo}>
       <img src={burgerLogo}  alt="My Burger"/> 
    </div></Link>
);

export default logo
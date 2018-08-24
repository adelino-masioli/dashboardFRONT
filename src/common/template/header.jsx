import React from 'react'
import Navbar from './navbar'

export default props => (
    <header className='main-header'>
        <a href="/#/" className='logo'>
            <span className='logo-mini'><img src={require('./../../assets/brand_mini.png')} alt=""/> </span>
            <span className='logo-lg'><img src={require('./../../assets/brand.png')} alt=""/></span>
        </a>
            <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle="offcanvas"></a>

            <Navbar />
        </nav>
    </header>
)

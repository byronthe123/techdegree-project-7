import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({
    apiCallFinished,
    routesData
}) => {
    return (
        <div className='main-nav'>
            <ul>
            {
                apiCallFinished && 
                routesData.map((route, i) => 
                    <li key={i}>
                        <NavLink 
                            to={route.path}
                        >{route.tag}</NavLink>
                    </li>
                )
            }
            </ul>
        </div>
    );
}

export default Nav;
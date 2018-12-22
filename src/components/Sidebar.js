import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default () => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to='/users' className="nav-link" activeClassName="active">
                        Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/campaigns' className="nav-link" activeClassName="active">
                        Campaigns
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

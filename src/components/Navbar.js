import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './../actions/user.actions';
import { resolveUsername } from './../utils';

const styles = {
	brandName: {
		'color': '#fff'
	}
};

const Navbar = ( { logout, user } ) => {
    return (
        <nav className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0'>
			<Link to="/" style={styles.brandName} className='navbar-brand col-sm-3 col-md-2 mr-0'>SomeOrg</Link>
			<ul className='navbar-nav px-3'>
				<li className='nav-item text-nowrap'>
					<p className='nav-link' onClick={logout}>Logout ( {resolveUsername(user)})</p>
				</li>
			</ul>
		</nav>
    );
};

function mapStateToProps(state) {
	const { authentication } = state;
	const { user } = authentication;
    return {
		user
	};
}

function mapDispatchToProps(dispatch) {
    return {
		logout: () => dispatch(userActions.logout())
	};
}

// const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);
// export { connectedNavbar as Navbar }; 
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
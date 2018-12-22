import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './utils';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { UserListPage } from './pages/UserListPage/UserListPage';
import { UserEditPage } from './pages/UserEditPage/UserEditPage';
import { CampaignListPage } from './pages/CampaignListPage/CampaignListPage';
import { CampaignEditPage } from './pages/CampaignEditPage/CampaignEditPage';
import { Layout } from './components/Layout';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { authentication } = this.props;
        return (
            <Router history={history}>
                { authentication && authentication.user ? 
                    <Layout>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/users" component={UserListPage} />
                        <PrivateRoute exact path="/users/:id" component={UserEditPage} />
                        <PrivateRoute exact path="/campaigns" component={CampaignListPage} />
                        <PrivateRoute exact path="/campaigns/:id" component={CampaignEditPage} />
                    </Layout> :
                    <Route path="/login" component={LoginPage} />}
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
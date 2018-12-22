import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paginator from '../../components/Paginator';
import { makeParamsFromQuery } from '../../utils';

import { userActions } from '../../actions/user.actions';

class UserListPage extends React.Component {

    constructor(props) {
        super(props);
        
        const urlParams = makeParamsFromQuery(this.props.location.search);
        this.state = Object.assign({
            perPage: 6,
            page: 1
        }, urlParams);
        this.destroy = this.destroy.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search != prevProps.location.search) {
            const urlParams = makeParamsFromQuery(this.props.location.search);
            this.setState(Object.assign({
                perPage: 6,
            }, urlParams));
            this.props.getAllUsers(Object.assign({
                perPage: 6,
            }, urlParams)); 
        }
    }

    destroy () {
        window.confirm('Do you want to delete this user?');
    }

    render() {
        const { users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>User list</h1>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.items.map((user, index) =>
                                <tr key={user.id}>
                                    <th scope="row">1</th>
                                    <td>{ user.username }</td>
                                    <td>{ user.email }</td>
                                    <td>
                                        <Link to={`/users/${user._id}`} className='btn btn-primary'>Edit</Link>
                                        <button className='btn btn-danger' onClick={this.destroy}>X</button>
                                    </td>
                                </tr>
                            ) }
                        </tbody>
                    </table>
                }
                { users.total && 
                    Math.ceil(users.total/this.state.perPage) > 1 && 
                    <Paginator total={Math.ceil(users.total/this.state.perPage)} current={this.state.page} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    // const { user } = authentication;
    return {
        // user,
        users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: (params) => dispatch(userActions.getAll(params)),
        // getOne: (id) => dispatch(userActions.getOne(id))
	};
}

const connectedUserListPage = connect(mapStateToProps, mapDispatchToProps)(UserListPage);
export { connectedUserListPage as UserListPage };
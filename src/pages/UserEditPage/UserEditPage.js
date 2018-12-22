import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';

class UserEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
    }

    destroy () {
        window.confirm('Do you want to delete this user?');
    }

    render() {
        const { user, loading, error } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Edit user</h1>
                {loading && <em>Loading user...</em>}
                {error && <span className="text-danger">ERROR: {error}</span>}
                {user &&
                    <div>{ JSON.stringify(user)}</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.users;
    const { users } = state;
    return {
        user,
        loading: users.loading,
        error: users.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
		getUser: (id) => dispatch(userActions.getOne(id))
	};
}

const connectedUserEditPage = connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
export { connectedUserEditPage as UserEditPage };
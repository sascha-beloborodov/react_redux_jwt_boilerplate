import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../utils';

export const userActions = {
    login,
    logout,
    getAll,
    update,
    getOne
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(alertActions.error(error.message || error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    history.push('/login');
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll(params) {
    return dispatch => {
        dispatch(request());

        userService.getAll(params)
            .then(
                response => {
                    dispatch(success(response.users, response.total));
                },
                error => {
                    dispatch(failure(error.message || error))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users, total) { return { type: userConstants.GETALL_SUCCESS, users, total } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function update(id) {
    return dispatch => {
        dispatch(request());

        userService.update(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.UPDATE_REQUEST } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        userService.getOne(id)
            .then(
                user => {
                    dispatch(success(user.user));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_ONE_REQUEST } }
    function success(user) { return { type: userConstants.GET_ONE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
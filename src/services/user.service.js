import config from './../config';
import { authHeader, handleResponse } from './../utils';
import axios from 'axios';

export const userService = {
    login,
    logout,
    getAll,
    update,
    getOne
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { 
            email: username,
            password
        }
    };
    return axios(`${config.apiUrl}/v1/users/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // login successful if there's a jwt token in the response
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', JSON.stringify(response.token));
            }

            return response.user;
        })
        .catch(err => {
            console.log(err)
            throw err;
        });;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function getAll(params = {}) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // 
    return axios(`${config.apiUrl}/admin/users?${Object.keys(params).map(key => `${key}=${params[key]}&`).join('')}`, requestOptions)
        .then(handleResponse)
        .catch(err => {
            console.log(err)
            throw err;
        });
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios(`${config.apiUrl}/admin/users/${id}`, requestOptions).then(handleResponse).catch(err => {
        throw err;
    });
}

function update(id, payload) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        data: payload
    };
    return axios(`${config.apiUrl}/admin/users/${id}`, requestOptions).then(handleResponse).catch(err => {
        throw err;
    });
}

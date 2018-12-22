import { createBrowserHistory } from 'history';
import { userService } from './services/user.service';

export const history = createBrowserHistory();

export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return { 'Authorization': token, 'Content-Type': 'application/json' };
    }
    return { 'Content-Type': 'application/json' };
}

export function resolveUsername(user) {
    if (!user) {
        throw new Error('Needed user');
    }
    if (user.username) {
        return user.username;
    }
    if (user.firstname) {
        return user.firstname;
    }
    return 'Unknown user';
}

export function makeParamsFromQuery(query) {
    const urlParams = query.replace(/[^a-zA-Z0-9= ]/g, "").split('=').reduce((prev, curr, idx, arr) => {
        if (!curr) {
            return prev
        }
        // every even elem in this arr - will be key
        if (idx % 2 === 0) {
            prev[curr] = null
        } else {
            prev[arr[idx - 1]] = curr;
        }
        return prev;
    },{});
    return urlParams;
};

export function handleResponse(response) {
    if (response.statusText.toLowerCase() !== 'ok') {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            userService.logout();
            window.location.reload(true);
        }

        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return Promise.resolve(response.data);
}
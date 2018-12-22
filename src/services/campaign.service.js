import config from '../config';
import { authHeader, handleResponse } from './../utils';
import axios from 'axios';

export const campaignService = {
    getAll,
    update,
    getOne
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios(`${config.apiUrl}/admin/campaigns`, requestOptions).then(handleResponse).catch(err => {
        console.log(err)
    });
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios(`${config.apiUrl}/admin/campaigns/${id}`, requestOptions).then(handleResponse).catch(err => {
        console.log(err)
    });
}

function update(id, payload) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        data: payload
    };
    return axios(`${config.apiUrl}/admin/campaigns/${id}`, requestOptions).then(handleResponse).catch(err => {
        throw err;
    });
}

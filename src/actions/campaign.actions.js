import { campaignConstants } from '../constants/campaign.constants';
import { campaignService } from '../services/campaign.service';
import { alertActions } from './alert.actions';
import { history } from '../utils';

export const campaignActions = {
    getAll,
    update,
    getOne
};


function getAll() {
    return dispatch => {
        dispatch(request());

        campaignService.getAll()
            .then(
                response => {
                    dispatch(success(response.campaigns));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request() { return { type: campaignConstants.GETALL_REQUEST } }
    function success(campaigns) { return { type: campaignConstants.GETALL_SUCCESS, campaigns } }
    function failure(error) { return { type: campaignConstants.GETALL_FAILURE, error } }
}

function update(id, payload) {
    return dispatch => {
        dispatch(request());

        campaignService.update(id, payload)
            .then(
                response => {
                    dispatch(success(response.campaign));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: campaignConstants.UPDATE_REQUEST } }
    function success(campaign) { return { type: campaignConstants.UPDATE_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.UPDATE_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        campaignService.getOne(id)
            .then(
                response => {
                    dispatch(success(response.campaign));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: campaignConstants.GET_ONE_REQUEST } }
    function success(campaign) { return { type: campaignConstants.GET_ONE_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.GETALL_FAILURE, error } }
}
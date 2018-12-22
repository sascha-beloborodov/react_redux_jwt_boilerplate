import { campaignConstants } from '../constants/campaign.constants';

export function campaigns(state = {}, action) {
  switch (action.type) {
    case campaignConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.GETALL_SUCCESS:
      return {
        items: action.campaigns,
        campaign: null
      };
    case campaignConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case campaignConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.UPDATE_SUCCESS:
      return {
        campaign: action.campaign
      };
    case campaignConstants.UPDATE_FAILURE:
      return { 
        error: action.error
      };
    case campaignConstants.GET_ONE_REQUEST:
      return {
        loading: true
      };
    case campaignConstants.GET_ONE_SUCCESS:
      return {
        campaign: action.campaign
      };
    case campaignConstants.GET_ONE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
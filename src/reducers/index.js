import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { campaigns } from './campaigns.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  campaigns,
});

export default rootReducer;
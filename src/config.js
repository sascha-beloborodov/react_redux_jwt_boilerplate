require('dotenv').config();

if (!process.env.REACT_APP_ENV || process.env.REACT_APP_ENV == undefined) {
    throw new Error('Please make sure you configure your build');
}

const urlsMap = {
    local: process.env.REACT_APP_API_URL_LOCAL,
    development: process.env.REACT_APP_API_URL_DEV,
    production: process.env.REACT_APP_API_URL_PROD
};

export default {
    apiUrl: urlsMap[process.env.REACT_APP_ENV],
};
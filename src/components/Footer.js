import React, { Component } from 'react';

export default () => {
    return (
        <footer className='pull-left footer'>
            <p className='col-md-12'>
                SomeOrg {new Date().getFullYear}
            </p>
        </footer>
    );
};

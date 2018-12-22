import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, alert } = this.props;
        
        return (<div>
            <Navbar />
            <div className='container-fluid'>
                <div className="row">
                    <Sidebar />
                    { alert.message &&
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        </div>
                    }
                    {children}
                </div>
                <Footer />           
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    const { alert} = state;
    return {
        alert,
    };
}

const connectedLayout = connect(mapStateToProps)(Layout);
export { connectedLayout as Layout }; 

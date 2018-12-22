import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const links = [...Array(this.props.total).keys()].map((page, idx) => {
            return (<li key={idx} className={`page-item ${this.props.current == (page + 1) && `active`}`}><Link to={`/users/?page=${page + 1}`} className={`page-link ${(page + 1) == this.props.current && 'active' }`}>{page + 1}</Link></li>);
        });
        return (
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${this.props.current == 1 && `disabled`}`}><Link to={`/users/?page=${this.props.current - 1}`} className={`page-link`}>Previous</Link></li>
                    { links }
                    <li className={`page-item ${this.props.current == this.props.total && `disabled`}`}><Link to={`/users/?page=${parseInt(this.props.current) + 1}`} className="page-link" href="">Next</Link></li>
                </ul>
            </nav>
        );
    }
}


export default Paginator;
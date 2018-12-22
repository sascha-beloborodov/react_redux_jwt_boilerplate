import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paginator from '../../components/Paginator';
import { makeParamsFromQuery } from './../../utils';

import { campaignActions } from '../../actions/campaign.actions';

class CampaignListPage extends React.Component {

    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);

        const urlParams = makeParamsFromQuery(this.props.location.search);
        this.state = Object.assign({
            perPage: 6,
            page: 1
        }, urlParams);
    }

    componentDidMount() {
        this.props.getAll(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search != prevProps.location.search) {
            const urlParams = makeParamsFromQuery(this.props.location.search);
            this.setState(Object.assign({
                perPage: 6,
            }, urlParams));
            this.props.getAll(Object.assign({
                perPage: 6,
            }, urlParams)); 
        }
    }

    destroy () {
        window.confirm('Do you want to delete this user?');
    }

    render() {
        const { campaigns } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>campaigns list</h1>
                {campaigns.loading && <em>Loading campaigns...</em>}
                {campaigns.error && <span className="text-danger">ERROR: {campaigns.error}</span>}
                {campaigns.items &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="row">Ads Format</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            { campaigns.items.map((campaign, index) =>
                                <tr key={campaign.id}>
                                    <td>{ campaign.name }</td>
                                    <td>{ campaign.approved ? 'Yes' : 'No' }</td>
                                    <td>{ campaign.campaignType }</td>
                                    <td>
                                        <Link to={`/campaigns/${campaign._id}`} className='btn btn-primary'>Moderate</Link>
                                    </td>
                                </tr>
                            ) }
                        </tbody>
                    </table>
                }
                { campaigns.total && 
                    Math.ceil(campaigns.total/this.state.perPage) > 1 && 
                    <Paginator total={Math.ceil(campaigns.total/this.state.perPage)} current={this.state.page} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { campaigns, authentication } = state;
    return {
        campaigns
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAll: () => dispatch(campaignActions.getAll()),
	};
}

const connectedCampaignListPage = connect(mapStateToProps, mapDispatchToProps)(CampaignListPage);
export { connectedCampaignListPage as CampaignListPage };
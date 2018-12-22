import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { campaignActions } from './../../actions/campaign.actions';

class CampaignEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
        this.submit = this.submit.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.state = {
            name: this.props.campaign ? this.props.campaign.name : '',
            approved: this.props.campaign && this.props.campaign.approved ? 1 : 0,
            actived: this.props.campaign && this.props.campaign.actived ? 1 : 0,
            showReasonOfRefusal: false,
        };
    }

    async componentDidMount() {
        this.props.getOne(this.props.match.params.id);
    }

    destroy () {
        window.confirm('Do you want to delete this user?');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // state has always fresh data
        if (!this.props.campaign && nextProps.campaign) {
            this.setState(Object.assign(this.state, {
                name:  nextProps.campaign.name,
                approved: nextProps.campaign.approved ? 1 : 0,
                reasonOfRefusal: nextProps.campaign.reasonOfRefusal || ''
            }));
            return true;
        }
        return true;
    }

    submit(e) {
        e.preventDefault();
        this.props.update(this.props.match.params.id, this.state);
    }

    changeForm(e) {
        switch(e.target.name) {
            case 'approved':
                const updatedState = { [e.target.name]: e.target.value };
                if (parseInt(e.target.value)) {
                    updatedState.showReasonOfRefusal = false;
                    updatedState.reasonOfRefusal = '';
                } else {
                    updatedState.showReasonOfRefusal = true;
                }
                this.setState(Object.assign(this.state, updatedState));
                break;
            default:
                this.setState(Object.assign(this.state, {
                    [e.target.name]: e.target.value
                }));
        }
    }

    render() {
        const { campaign, loading, error } = this.props;
        const reasonOfRefusalStyle = {
            display: this.state.showReasonOfRefusal ? 'block' : 'none'
        };
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Edit campaign</h1>
                {loading && <em>Loading campaign...</em>}
                {error && <span className="text-danger">ERROR: {error}</span>}
                {campaign &&
                    <div>
                        <form onSubmit={this.submit} onChange={this.changeForm}>
                            {/* name */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={campaign.name} />
                                </div>
                            </div>
                            {/* approved */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Approved</label>
                                <div className="col-sm-10">
                                    <select className="form-control" name="approved" defaultValue={this.state.approved}>
                                        <option value="">Choose</option>
                                        {[{ val: 1, 'label': 'Yes'}, { val: 0, 'label': 'No'}].map((el, idx) => {
                                            return <option key={idx} value={el.val} selected={el.val === this.state.approved}>{el.label}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* actived */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Actived</label>
                                <div className="col-sm-10">
                                    <select className="form-control" name="actived" defaultValue={this.state.actived}>
                                        <option value="">Choose</option>
                                        {[{ val: 1, 'label': 'Yes'}, { val: 0, 'label': 'No'}].map((el, idx) => {
                                            return <option key={idx} value={el.val} selected={el.val === this.state.actived}>{el.label}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/*  reason of refusal */}
                            <div className="form-group row" style={reasonOfRefusalStyle}>
                                <label className="col-sm-2 col-form-label">Reason of refusal</label>
                                <div className="col-sm-10">
                                    <textarea type="text" className="form-control" name="reasonOfRefusal" defaultValue={this.state.reasonOfRefusal} />
                                </div>
                            </div>
                            {/*  Creative */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Creative</label>
                                <div className="col-sm-10">
                                    <img src={`http://uplify.api.grapheme.ru/${campaign.creative.path}`} width="430"/>
                                    
                                </div>
                            </div>
                            {/* Type */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Type</label>
                                <div className="col-sm-10">
                                    {campaign.campaignType}
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <input type="submit" value="Save" className="btn btn-primary"/>
                                </div>
                            </div>
                        </form>
                        {/* { JSON.stringify(campaign)} */}
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { campaign } = state.campaigns;
    const { campaigns } = state;
    return {
        campaign,
        loading: campaigns.loading,
        error: campaigns.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getOne: (id) => dispatch(campaignActions.getOne(id)),
        update: (id, payload) => dispatch(campaignActions.update(id, payload))
	};
}

const connectedCampaignEditPage = connect(mapStateToProps, mapDispatchToProps)(CampaignEditPage);
export { connectedCampaignEditPage as CampaignEditPage };
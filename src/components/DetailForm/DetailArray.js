import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataArray extends Component {
    constructor(props) {
		super(props);
        const { data, field, name } = props;

        this.state = {
            data,
            name,
            field,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { data, field, name } = nextProps;

        return {
            data,
            name,
            field,
        };
    }

    addKpi = () => {}

    render() {
        const { data, field, name } = this.state;
        return (
            <div className="data-array" style={field !== 'kpi' ? { marginRight: '2.875rem' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '0.25rem', height: '0.25rem', border: '1px solid', borderRadius: '50%' }} />
                    <div style={{ height: '0.0625rem', width: '25%', background: 'black', marginRight: '1rem' }} />
                    <div style={{}}>{name}</div>
                </div>
                <div className="block">
                    {(data[field] && data[field].length > 0) && data[field].map((item, index) => (<div key={index} style={{ fontSize: '14px' }}>{item}</div>))}
                </div>
            </div>
        );
    }
}

DataArray.propTypes = {
    data: PropTypes.object,
    field: PropTypes.string,
    name: PropTypes.string,
};

DataArray.defaultProps = {
    data: {},
    field: '',
    name: '',
    closeModal: () => {},
};

export default DataArray;

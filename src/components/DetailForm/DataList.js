import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataList extends Component {
    constructor(props) {
		super(props);
        const { addData, data, type, field, name } = props;

        this.state = {
            addData,
            data,
            name,
            type,
            field,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { addData, data, type, field, name } = nextProps;

        return {
            addData,
            data,
            name,
            type,
            field,
        };
    }

    addKpi = () => {}

    render() {
        const { addData, data, type, field, name } = this.state;
        return (
            <div className="data-list">
                <div className="field">
                    <div className="text">
                        {name}
                    </div>
                    <div className="lists">
                        <div style={{ marginBottom: '0.8rem' }}>
                            {(type === 'editModal' && data[field] && data[field].length > 0) &&
                                data[field].map((item, index) => (
                                    <div className="list" key={index} style={{ fontSize: '14px' }}>
                                        {item}
                                        <button className="btn delete-btn">DELETE<i className="fa fa-trash" style={{ color: '#b73434' }}></i></button>
                                    </div>
                                )
                            )}
                            {(type === 'addModal' && addData.kpi && addData.kpi.length > 0) &&
                                addData.kpi.map((item, index) => (
                                    <div className="list" key={index} style={{ fontSize: '14px' }}>
                                        {item}
                                        <button className="btn delete-btn">DELETE<i className="fa fa-trash" style={{ color: '#b73434' }}></i></button>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="add-block">
                            <button className="btn add-btn" onClick={this.addKpi}>ADD</button>
                            <input className="selector" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DataList.propTypes = {
    addData: PropTypes.object,
    data: PropTypes.object,
    type: PropTypes.string,
    field: PropTypes.string,
    name: PropTypes.string,
};

DataList.defaultProps = {
    addData: {},
    data: {},
    type: '',
    field: '',
    name: '',
    closeModal: () => {},
};

export default DataList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Pagination extends Component {
    constructor(props) {
		super(props);

        this.state = {
            pageNumber: props.pageNumber,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.pageNumber <= (Math.round(nextProps.data.length / 10))) {
            this.setState({ pageNumber: nextProps.pageNumber });
        } else {
            this.setState({ pageNumber: 1 });
            this.props.updatePageNumber(1);
        }
    }

    render() {
        const { pageNumber } = this.state;
        const { data } = this.props;
        let pagination = [];
        const dataLength = Math.round(data.length / 10);
        for(let i = 0; i < (Math.round(data.length / 10)); i++) {
            pagination.push(
                <div
                    key={i}
                    className={`pagination-field${(i + 1) === pageNumber ? ' active' : ''}`}
                    onClick={() => this.props.updatePageNumber(i + 1)}
                >
                    {i + 1}
                </div>
            );
        }
        let fn = pageNumber > 4 ? pageNumber - 4 : 1;
        let ln = pageNumber < 6 ? 10 : dataLength > pageNumber + 5 ? pageNumber + 5 : dataLength + 1;
        return (
            <div className="pagination-container">
                <div className="btn" onClick={() => this.props.updatePageNumber(1)}>
                    <i className="fa fa-angle-double-left"></i> First
                </div>
                <div className="btn" style={{ marginRight: '0.5rem' }} onClick={() => this.props.updatePageNumber(pageNumber > 9 ? pageNumber - 9 : 1)}>
                    <i className="fa fa-angle-left"></i> Prev
                </div>
                {pagination.slice(fn - 1, ln - 1)}
                <div className="btn" style={{ marginLeft: '0.5rem' }} onClick={() => this.props.updatePageNumber((pageNumber + 9) < dataLength ? pageNumber + 9 : dataLength)}>
                    Next <i className="fa fa-angle-right"></i>
                </div>
                <div className="btn" onClick={() => this.props.updatePageNumber(dataLength)}>
                    Last <i className="fa fa-angle-double-right"></i>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    data: PropTypes.array,
    pageNumber: PropTypes.number,
    updatePageNumber: PropTypes.func,
};

Pagination.defaultProps = {
    data: [],
    pageNumber: 1,
    updatePageNumber: () => {},
};

export default Pagination;

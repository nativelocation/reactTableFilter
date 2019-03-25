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
        const { pageNumber } = this.state;
        if (pageNumber <= (Math.round(nextProps.data.length / 10))) {
            this.setState({ pageNumber: nextProps.pageNumber });
        } else if (this.props.data.length !== nextProps.data.length && pageNumber > (Math.round(nextProps.data.length / 10))) {
            this.setState({ pageNumber: 1 }, () => {
                this.props.updatePageNumber(1);
            });
        }
    }

    render() {
        const { pageNumber } = this.state;
        const { data } = this.props;
        let pagination = [];
        const dataLength = Math.round(data.length / 10);
        const loopValue = dataLength < 1 ? 1 : dataLength;
        for(let i = 0; i < loopValue; i++) {
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
                <div onClick={() => this.props.updatePageNumber(1)}>
                    <i className="fa fa-angle-double-left"></i>
                </div>
                <div style={{ marginRight: '0.5rem' }} onClick={() => this.props.updatePageNumber(pageNumber > 9 ? pageNumber - 9 : 1)}>
                    <i className="fa fa-angle-left"></i>
                </div>
                {pagination.slice(fn - 1, ln - 1)}
                <div style={{ marginLeft: '0.5rem' }} onClick={() => this.props.updatePageNumber((pageNumber + 9) < dataLength ? pageNumber + 9 : dataLength)}>
                    <i className="fa fa-angle-right"></i>
                </div>
                <div onClick={() => this.props.updatePageNumber(dataLength)}>
                    <i className="fa fa-angle-double-right"></i>
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

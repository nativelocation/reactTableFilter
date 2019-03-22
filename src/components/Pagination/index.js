import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor(props) {
		super(props);

        this.state = {
            pageNumber: props.pageNumber,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let pageNumber = 1;
        if (prevState.pageNumber <= (Math.round(nextProps.data.length / 10))) {
            pageNumber = nextProps.pageNumber;
        } else {
            pageNumber = 1;
            nextProps.updatePageNumber(1);
        }
        return {
            pageNumber,
        }
    }

    render() {
        const { pageNumber } = this.state;
        const { data } = this.props;
        let pagination = [];
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
        return (
            <div className="pagination-container">{pagination}</div>
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

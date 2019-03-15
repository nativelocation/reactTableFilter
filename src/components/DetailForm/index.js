
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Modal } from 'react-bootstrap';

import './style.css';

class DetailForm extends Component {
    render() {
        const { data, showModal } = this.props;
        return (
            <Modal
                show={showModal}
                className="detail-form show"
            >
                <Modal.Body>
                    <div className="modal-title">{data.moduleEN}</div>
                    <div className="duration">
                        <div className="value">{data.duration}</div>
                        <div className="duration-unit">Minutes</div>
                    </div>
                    <div className="detail">Details</div>
                </Modal.Body>
            </Modal>
        );
    }
}

DetailForm.propTypes = {
    data: PropTypes.object.isRequired,
    showModal: PropTypes.bool,
};

DetailForm.defaultProps = {
	showModal: false,
};

export default DetailForm;

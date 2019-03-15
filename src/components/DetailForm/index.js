
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
                    <div className="detail-fields">
                        <div className="detail-field">
                            <div style={{ width: '50%', paddingRight: '3rem', paddingLeft: '0.5rem' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '70%', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>TRAINING TYPE</div><span>{data.trainingType}</span>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '70%', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>CATEGORY</div><span>{data.groupEN}</span>
                                </div>
                            </div>
                            <div style={{ width: '50%', paddingRight: '3rem' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>DESCRIPTION</div><span>{data.descriptionEN}</span>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>SIDE BY SIDE</div><span>{data.sideBySide === '1' ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="detail-array">
                            <div className="segments">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '0.25rem', height: '0.25rem', border: '1px solid', borderRadius: '50%' }} />
                                    <div style={{ height: '0.0625rem', width: '25%', background: 'black', marginRight: '1rem' }} />
                                    <div style={{}}>SEGMENTS</div>
                                </div>
                                <div className="block">
                                </div>
                            </div>
                            <div className="bp-flows">
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ width: '0.25rem', height: '0.25rem', border: '1px solid', borderRadius: '50%' }} />
                                    <div style={{ height: '0.0625rem', width: '25%', background: 'black', marginRight: '1rem' }} />
                                    <div style={{}}>BP FLOWS</div>
                                </div>
                                <div className="block">
                                </div>
                            </div>
                            <div className="kpi">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: '0.25rem', height: '0.25rem', border: '1px solid', borderRadius: '50%' }} />
                                    <div style={{ height: '0.0625rem', width: '25%', background: 'black', marginRight: '1rem' }} />
                                    <div style={{}}>KPI</div>
                                </div>
                                <div className="block">
                                </div>
                            </div>
                        </div>
                    </div>
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


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

import './style.css';

class DetailForm extends Component {
    constructor(props) {
		super(props);

        this.state = {
            data: props.data,
            mode: props.mode,
            type: props.type,
            addData: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        const { data, type, mode } = nextProps;
        if (data !== this.props.data) {
            this.setState({ data, type, mode });
        } else {
            this.setState({ type, mode });
        }
    }

    clickAssign = () => this.setState({ mode: 'assign' });

    clickConfirm = () => {}

    closeModal = () => this.props.closeModal(this.state.type);

    cancelModal = () => this.props.closeModal(this.state.type);

    addSegment = () => {}
    
    addKpi = () => {}

    addBpi = () => {}

    onFieldChange = (event, field) => {
        const data = Object.assign({}, this.state.data);
        data[field] = event.target.value;
        this.setState({ data });
    }

    renderField = (field, name) => (
        <div className="field">
            <div className="text">
                <span className="mandatory">*</span><span>{name}</span>
            </div>
            <input type="text" onChange={(event) => this.onFieldChange(event, field)} value={this.state.type === 'editModal' ? this.state.data[field] : ''}></input>
        </div>
    );

    renderDataList = (field, name) => {
        const { addData, data, type } = this.state;
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

    renderDetailArray = (field, name) => {
        const { data} = this.state;
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
    render() {
        const { showModal } = this.props;
        const { data, addData, mode, type } = this.state;
        return (
            <Modal
                show={showModal}
                onHide={this.closeModal}
                className="detail-form show"
            >
                <Modal.Body>
                    {(type === 'detailModal' || type === 'editModal') && <div className="detailForm">
                        {/* <div className="modal-title">{data.moduleEN}</div> */}
                        <div className="duration">
                            <div className="value">{data.duration}</div>
                            <div className="duration-unit">Minutes</div>
                        </div>
                    </div>}
                    <div className="modal-title">Account Balance for BM</div>
                    {type === 'addModal' && <div className="modal-title-underline"></div>}
                    {((type === 'detailModal' || type === 'editModal') && mode === 'detail') &&
                        <div className={type === 'detailModal' ? 'detailModal' : 'editModal'}>
                            <div className="detail" onClick={() => { console.log('here1'); this.setState({ type: 'detailModal' }); }}>Details</div>
                            <div className="edit" onClick={() => { console.log('here'); this.setState({ type: 'editModal' }); }}>Edit</div>
                        </div>
                    }
                    {type === 'detailModal' && <div className="detailForm">
                        {mode === 'detail' && <div className="detail-fields">
                            <div className="detail-field">
                                <div style={{ width: '50%', paddingRight: '3rem', paddingLeft: '0.5rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ minWidth: '70%', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>TRAINING TYPE</div><span>{data.trainingType}</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ minWidth: '70%', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>CATEGORY</div><span>{data.groupEN}</span>
                                    </div>
                                </div>
                                <div style={{ width: '50%', paddingRight: '3rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ minWidth: '8.25rem', paddingRight: '10px', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>DESCRIPTION</div><span>{data.descriptionEN}</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ minWidth: '8.25rem', paddingRight: '10px', color: '#004b87', marginRight: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid #0000003f' }}>SIDE BY SIDE</div><span>{data.sideBySide === '1' ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-array">
                                {this.renderDetailArray('departmentsList', 'SEGMENTS')}
                                {this.renderDetailArray('bpi', 'BP FLOWS')}
                                {this.renderDetailArray('kpi', 'KPI')}
                            </div>
                        </div>}
                        {mode === 'detail' && <div className="control">
                            <button className="btn close-btn" onClick={() => this.closeModal()}>Close <i className="fa fa-times-circle" style={{ color: 'black' }}></i></button>
                            <button className="btn close-btn" onClick={() => this.clickAssign()}>Assign to you & Launch <i className="fa fa-rocket" style={{ color: 'black' }}></i></button>
                        </div>}
                        {mode === 'assign' && <div className="assign-title">Are you sure you want to launch this document ?</div>}
                        {mode === 'assign' && <div className="assign-info">
                            By launching this document, you will be automatically assigned and redirected to it.
                        </div>}
                        {mode === 'assign' && <div className="assign-control">
                            <button className="btn cancel-btn" onClick={() => this.cancelModal()}>Cancel</button>
                            <button className="btn confirm-btn" onClick={() => this.clickConfirm()}>Confirm</button>
                        </div>}
                    </div>}
                    {(type === 'editModal' || type === 'addModal') && <div className="adddocForm">
                        <div className="edit-fields">
                            {type === 'editModal' && <div style={{ display: 'flex' }}>
                                <div className="left-edit-fields">
                                    <div className="field">
                                        <div className="text">
                                            <span className="mandatory">*</span><span>Person who approve :</span>
                                        </div>
                                        <input type="text"></input>
                                    </div>
                                </div>
                                <div className="right-edit-fields">
                                    <div className="field">
                                        <div className="text">
                                            <span className="mandatory">*</span><span>Reason for change :</span>
                                        </div>
                                        <input type="text"></input>
                                    </div>
                                </div>
                            </div>}
                            {type === 'editModal' && <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>}
                            <div style={{ display: 'flex' }}>
                                <div className="left-edit-fields">
                                    {this.renderField('moduleEN', 'Name EN :')}
                                    {this.renderField('groupEN', 'Category EN :')}
                                    {this.renderField('CDOC', 'CDOC # :')}
                                    {this.renderField('duration', 'Duration :')}
                                    {this.renderField('descriptionEN', 'Description EN :')}
                                    {this.renderField('keywordsEN', 'Keywords EN :')}
                                    {this.renderField('trainingType', 'Training Type :')}
                                </div>
                                <div className="right-edit-fields">
                                    {this.renderField('moduleFR', 'Name FR :')}
                                    {this.renderField('groupFR', 'Category FR :')}
                                    {this.renderField('onlineCode', 'Online Code :')}
                                    {this.renderField('expiryDate', 'Expiry Date :')}
                                    {this.renderField('descriptionFR', 'Description FR :')}
                                    {this.renderField('keywordsFR', 'Keywords FR :')}
                                    {this.renderField('comments', 'Comments :')}
                                </div>
                            </div>
                            <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                            <div style={{ maxHeight: '32rem', overflowY: 'scroll' }}>
                                {this.renderDataList('departmentsList', 'Segments :')}
                                <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                                {this.renderDataList('bpi', 'BPI Flows :')}
                                <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                                {this.renderDataList('kpi', 'KPI :')}
                                <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                            </div>
                        </div>
                        <div className="assign-control">
                            <button className="btn cancel-btn" onClick={() => this.cancelModal()}>Close Without Saving <i className="fa fa-times-circle" style={{ color: 'black' }}></i></button>
                            <button className="btn confirm-btn" onClick={() => this.clickConfirm()}>Confirm <i className="fa fa-save" style={{ color: 'black' }}></i></button>
                        </div>
                    </div>}
                </Modal.Body>
            </Modal>
        );
    }
}

DetailForm.propTypes = {
    data: PropTypes.object.isRequired,
    showModal: PropTypes.bool,
    type: PropTypes.string.isRequired,
    mode: PropTypes.string,
    closeModal: PropTypes.func,
};

DetailForm.defaultProps = {
    showModal: false,
    mode: 'detail',
    closeModal: () => {},
};

export default DetailForm;

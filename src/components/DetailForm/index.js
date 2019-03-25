
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import DataList from './DataList.js';
import DetailArray from './DetailArray.js';
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
        } else if (type !== this.props.type || mode !== this.props.mode) {
            this.setState({ type, mode });
        }
    }

    clickAssign = () => this.setState({ mode: 'assign' });

    clickConfirm = () => {}

    closeModal = () => this.props.closeModal(this.state.type);

    cancelModal = () => this.props.closeModal(this.state.type);

    addSegment = () => {}

    addBpi = () => {}

    onFieldChange = (event, field) => {
        const data = Object.assign({}, this.state.data);
        data[field] = event.target.value;
        this.setState({ data });
    }

    renderField = (field, name) => (
        <div className="field">
            <div className="text">
                {(field === 'moduleEN' || field === 'moduleFR') && <span className="mandatory">*</span>}<span>{name}</span>
            </div>
            <input type="text" onChange={(event) => this.onFieldChange(event, field)} value={this.state.type === 'editModal' ? this.state.data[field] : ''}></input>
        </div>
    );

    render() {
        const { showModal } = this.props;
        const { data, addData, mode, type } = this.state;
        return (
            <ReactModal 
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.closeModal}
                className="detail-form show"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                {(type === 'detailModal' || type === 'editModal') && <div className="detailForm">
                    <div className="duration">
                        <div className="value">{data.duration}</div>
                        <div className="duration-unit">Minutes</div>
                    </div>
                </div>}
                <div className="modal-title">Account Balance for BM</div>
                {type === 'addModal' && <div className="modal-title-underline"></div>}
                {((type === 'detailModal' || type === 'editModal') && mode === 'detail') &&
                    <div className={type === 'detailModal' ? 'detailModal' : 'editModal'}>
                        <div className="detail" onClick={() => this.setState({ type: 'detailModal' })}>Details</div>
                        <div className="edit" onClick={() => this.setState({ type: 'editModal' })}>Edit</div>
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
                            <DetailArray data={data} field='departmentsList' name='SEGMENTS' />
                            <DetailArray data={data} field='bpi' name='SEGMENTS' />
                            <DetailArray data={data} field='kpi' name='BP FLOWS' />
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
                    <div style={{ maxHeight: '32rem', overflowY: 'scroll' }}>
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
                                    {/* <div className="field">
                                        <div className="text">
                                            Active :
                                        </div>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div className="btn check-btn" onClick={() => this.cancelModal()}>YES</div>
                                            <div className="btn check-btn" onClick={() => this.cancelModal()}>No</div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="right-edit-fields">
                                    {this.renderField('moduleFR', 'Name FR :')}
                                    {this.renderField('groupFR', 'Category FR :')}
                                    {this.renderField('onlineCode', 'Online Code :')}
                                    {this.renderField('expiryDate', 'Expiry Date :')}
                                    {this.renderField('descriptionFR', 'Description FR :')}
                                    {this.renderField('keywordsFR', 'Keywords FR :')}
                                    {this.renderField('comments', 'Comments :')}
                                    {/* <div className="field">
                                        <div className="text">
                                            Side By Side :
                                        </div>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div className="btn check-btn" onClick={() => this.cancelModal()}>YES</div>
                                            <div className="btn check-btn" onClick={() => this.cancelModal()}>No</div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                            <DataList
                                addData={addData}
                                data={data}
                                type={type}
                                field='departmentsList'
                                name='Segments :'
                            />
                            <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                            <DataList
                                addData={addData}
                                data={data}
                                type={type}
                                field='bpi'
                                name='BPI Flows :'
                            />
                            <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                            <DataList
                                addData={addData}
                                data={data}
                                type={type}
                                field='kpi'
                                name='KPI :'
                            />
                            <div style={{ height: '0.125rem', width: 'calc(81% - 2.5rem)', background: '#000000bf', margin: '1rem 2.5rem 1rem auto' }}></div>
                        </div>
                    </div>
                    <div className="assign-control">
                        <button className="btn cancel-btn" onClick={() => this.cancelModal()}>Close Without Saving <i className="fa fa-times-circle" style={{ color: 'black' }}></i></button>
                        <button className="btn confirm-btn" onClick={() => this.clickConfirm()}>Confirm <i className="fa fa-save" style={{ color: 'black' }}></i></button>
                    </div>
                </div>}
            </ReactModal>
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

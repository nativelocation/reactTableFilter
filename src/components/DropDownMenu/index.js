
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';

class DropDownMenu extends Component {
    constructor(props) {
		super(props);

        this.state = {
            show: '',
        }
    }

    menuClick = (index) => {
        const { filter, id } = this.props;
        const filterData = filter[id];
		const data = Object.assign({}, filterData);
		const length = data.valueList.length;
		_.remove(data.valueList, item => item === filterData.list[index]);
		if (length === data.valueList.length) {
			data.valueList.push(filterData.list[index]);
		}
		let value = '';
		data.valueList.forEach(item => {
			value = value + item + ', ';
		});
        data.value = value;
        let newFilter = this.props.filter.slice();
        newFilter[id] = data;
        this.props.setFilter(newFilter);
	}

    handleShow = () => {
        this.setState({
            show: this.state.show === 'show' ? '' : 'show',
        });
    }

    render() {
        const { filter, id } = this.props;
        const { show } = this.state;
        const data = filter[id];
        return (
            <div className={`border dropdown-button-drop-${id} ${show} dropdown`} onMouseEnter={this.handleShow} onMouseLeave={this.handleShow}>
                <button id={`dropdown-button-drop-${id}`} className="dropdown-toggle btn btn-light btn-lg">
                    {data.value === '' ? data.placeholder : data.value}
                </button>
                <div className={`dropdown-menu ${show}`} style={{ position: 'absolute', willChange: 'transform; top: 0px', left: '0px', transform: 'translate3d(0px, -2px, 0px)' }}>
                    {data.list.length > 0 && data.list.map((item, index) => (
                        <div key={index}>
                            <button className="dropdown-item" role="button" onClick={() => this.menuClick(index)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>{item}</div>
                                </div>
                            </button>
                            <div role="separator" className="dropdown-divider"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

DropDownMenu.propTypes = {
    setFilter: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    filter: PropTypes.array.isRequired,
};

export default DropDownMenu;

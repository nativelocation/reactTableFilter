
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DropDownSubMenu from './DropDownSubMenu';
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
        if (index > -1) {
            _.remove(data.valueList, item => item === filterData.list[index].title);
            if (length === data.valueList.length) {
                data.valueList.push(filterData.list[index].title);
            }
        } else {
            data.valueList = [];
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
                <div id={`dropdown-button-drop-${id}`} className="dropdown-toggle btn btn-light btn-lg">
                    {data.value === '' ? data.placeholder : data.value}
                </div>
                <div className={`dropdown-menu ${show}`} style={{ position: 'absolute', willChange: 'transform; top: 0px', left: '0px', transform: 'translate3d(0px, -2px, 0px)' }}>
                    {id !== 2 && <DropDownSubMenu
                        menuClick={this.menuClick}
                        index={-1}
                        data={{ title: 'All' }}
                    />}
                    {id !== 2 && <div role="separator" className="dropdown-divider"></div>}
                    {data.list.length > 0 && data.list.map((item, index) => (
                        <div key={index}>
                            <DropDownSubMenu
                                menuClick={this.menuClick}
                                index={index}
                                data={item}
                            />
                            <div role="separator" className="dropdown-divider"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
// onMouseEnter={this.handleShow} onMouseLeave={this.handleShow}
DropDownMenu.propTypes = {
    setFilter: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    filter: PropTypes.array.isRequired,
};

export default DropDownMenu;

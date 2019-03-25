
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';

class DropDownSubMenu extends Component {
    constructor(props) {
		super(props);

        this.state = {
            show: '',
        }
    }

    handleShow = () => {
        this.setState({
            show: this.state.show === 'show' ? '' : 'show',
        });
    }

    subMenuClick = subIndex => {}

    render() {
        const { data, index } = this.props;
        const { show } = this.state;
        return (
            <div
                className={`dropdown-item ${(data.subs && data.subs.length > 0) ? 'dropdown-sub-items' : ''}`}
                style={{ position: 'relative'}}
                onClick={() => this.props.menuClick(index)}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleShow}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '0.4rem' }}>
                    {data.title}
                </div>
                {(data.subs && data.subs.length > 0) &&
                    <div className={`dropdown-subMenu ${show}`}>
                        {data.subs.map((sub, sIndex) => (
                            <div key={sIndex} >
                                <div className="dropdown-subItem" onClick={() => this.subMenuClic(sIndex)}>
                                    {sub}      
                                </div>
                                <div className="dropdown-divider"></div>
                            </div>
                        ))}
                    </div>}
            </div>
        );
    }
}

DropDownSubMenu.propTypes = {
    menuClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default DropDownSubMenu;

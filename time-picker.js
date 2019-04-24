import PropTypes from 'prop-types'
import React from 'react'

import style from './style.scss'
import extend from 'extend'
import LazyComponent from '../../lazy-component'

export default class TimePicker extends LazyComponent {
    static propTypes = {
        //workspace: WorkspacePropType.isRequired
    }

    constructor(props) {
        super(props)

        Object.assign(this.state, {
            hrOpen: false,
            minOpen: false,
            ampmOpen: false,
            hr: 0,
            min: 0,
            timeSuffix: 'am'
        })

        this.loadModules([
            'react-bootstrap',
            'react-router-bootstrap'
        ])
        this.handleToggle = this.handleToggle.bind(this)
        this.renderMenuItems = this.renderMenuItems.bind(this)
        this.handleHourValueChange = this.handleHourValueChange.bind(this)
        this.handleMinValueChange = this.handleMinValueChange.bind(this)
        this.handleAmPmValueChange = this.handleAmPmValueChange.bind(this)
    }

    handleToggle() {
        this.setState({
            hrOpen: !this.state.hrOpen,
            minOpen: !this.state.minOpen,
            ampmOpen: !this.state.ampmOpen,
        })
    }

    renderMenuItems(menuItems) {
        const {
            MenuItem
        } = this.modules['react-bootstrap']

        return menuItems.map((item, idx) => {
            const { key, value } = item

            return (
                <MenuItem
                    eventKey={key}
                    key={idx}
                    ref={key}
                >
                    {value}
                </MenuItem>)
        })
    }

    handleHourValueChange(value, eventKey) {
        this.setState({
            hr: value
        })
    }

    handleMinValueChange(value, eventKey) {
        let min = 0
        if (value === '1') {
            min = 0
        }
        else if (value === '2') {
            min = 15
        }
        else if (value === '3') {
            min = 30
        }
        else {
            min = 45
        }
        this.setState({
            min
        })
    }

    handleAmPmValueChange(value, eventKey) {
        let timeSuffix = ''
        if (value === 1) {
            timeSuffix = 'am'
        }
        else {
            timeSuffix = 'pm'
        }
        this.setState({
            timeSuffix
        })
    }

    lazyRender() {

        const {
            Button,
            Dropdown
        } = this.modules['react-bootstrap']

        const { hrOpen, minOpen, ampmOpen } = this.state

        const menuItems = [
            { key: 1, value: '1' },
            { key: 2, value: '2' },
            { key: 3, value: '3' },
            { key: 4, value: '4' },
            { key: 5, value: '5' },
            { key: 6, value: '6' },
            { key: 7, value: '7' },
            { key: 8, value: '8' },
            { key: 9, value: '9' },
            { key: 10, value: '10' },
            { key: 11, value: '11' },
            { key: 12, value: '12' },
        ]
        const menuItems1 = [
            { key: '1', value: '0' },
            { key: '2', value: '15' },
            { key: '3', value: '30' },
            { key: '4', value: '45' }
        ]
        const menuItems2 = [
            { key: '1', value: 'am' },
            { key: '2', value: 'pm' }
        ]

        return (
            <div style={{ display: 'flex' }}>
                <Dropdown
                    onSelect={this.handleHourValueChange}
                    onToggle={this.handleToggle}
                    id={'hour'}
                >
                    <Button bsRole="toggle" className={style.header}>
                        {this.state.hr}
                    </Button>
                    <Dropdown.Menu className={style.menuItems} bsRole="menu">
                        {hrOpen && this.renderMenuItems(menuItems)}
                    </Dropdown.Menu>
                </Dropdown>
                {':'}
                <Dropdown
                    onSelect={this.handleMinValueChange}
                    onToggle={this.handleToggle}
                    id={'min'}
                >
                    <Button bsRole="toggle" className={style.header}>
                        {this.state.min}
                    </Button>
                    <Dropdown.Menu className={style.menuItems1} bsRole="menu">
                        {minOpen && this.renderMenuItems(menuItems1)}
                    </Dropdown.Menu>
                </Dropdown>
                {':'}
                <Dropdown
                    onSelect={this.handleAmPmValueChange}
                    onToggle={this.handleToggle}
                    id={'ampm'}
                >
                    <Button bsRole="toggle" className={style.header}>
                        {this.state.timeSuffix}
                    </Button>
                    <Dropdown.Menu className={style.menuItems2} bsRole="menu" >
                        {ampmOpen && this.renderMenuItems(menuItems2)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

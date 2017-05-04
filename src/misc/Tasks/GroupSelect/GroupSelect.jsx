import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import CheckboxAlt from 'stemn-shared/misc/Input/CheckboxAlt/CheckboxAlt.jsx'
import classes from './GroupSelect.css'

class LabelSelectRow extends Component {
  onChange = () => {
    // The onChange function works like a checkbox
    const { item, dispatch, value, model, onChange } = this.props
    const labelIndex = value ? value.indexOf(item._id) : -1;
    if (labelIndex !== -1) {
      dispatch(actions.remove(model, labelIndex))
    } else {
      dispatch(actions.push(model, item._id))
    }
    if (onChange) { onChange() } // Run the onChange function if required
  }
  render() {
    const { item, value, onChange } = this.props
    const status = value ? value.includes(item._id) : false

    return (
      <CheckboxAlt
        status={ status }
        value={ item._id }
        onChange={ this.onChange }
        className="layout-row layout-align-start-center"
        tickOnly
      >
        <div style={ { paddingLeft: '5px'} }>
          { item.name }
        </div>
      </CheckboxAlt>
    )
  }
}

class LabelSelect extends Component {
  render() {
    const { model, value, groups, dispatch, onChange } = this.props;

    return (
      <div>
        { groups.map((item) => (
          <LabelSelectRow
            item={ item }
            model={ model }
            value={ value }
            onChange={ onChange }
            dispatch={ dispatch }
          />
        ))}
      </div>
    )
  }
}

export default connect()(LabelSelect)

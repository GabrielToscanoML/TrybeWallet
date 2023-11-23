import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './select.css';

class Select extends Component {
  render() {
    const { name, onChange, value,
      options, dataTestid } = this.props;
    return (
      <label htmlFor="moeda">
        <select
          data-testid={ dataTestid }
          name={ name }
          onChange={ onChange }
          value={ value }
        >
          {
            options.map((item, index) => (
              <option key={ index }>{ item }</option>
            ))
          }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Select;

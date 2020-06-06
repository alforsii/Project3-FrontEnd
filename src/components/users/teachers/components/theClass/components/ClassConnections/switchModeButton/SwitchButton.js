import React from 'react';
import './SwitchButton.css';

export default function SwitchButton({ switchUsersList }) {
  return (
    <React.Fragment>
      <label className="switch2">
        <input type="checkbox" />
        <span className="slider2 round2" onClick={switchUsersList}>
          <span style={{ color: '#fff' }}>
            Students <i className="far fa-arrow-alt-circle-left"></i>
          </span>
          <span style={{ color: '#2196F3' }}>
            <i className="far fa-arrow-alt-circle-right"></i> Teachers
          </span>
        </span>
      </label>
    </React.Fragment>
  );
}

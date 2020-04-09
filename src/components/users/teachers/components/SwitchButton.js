import React from 'react'
import './SwitchButton.css'

export default function SwitchButton() {
    return (
        <div>
            <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>

                    <label className="switch">
                        <input type="checkbox" checked/>
                        <span className="slider round"></span>
                    </label>
        </div>
    )
}

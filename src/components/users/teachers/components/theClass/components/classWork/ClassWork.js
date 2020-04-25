import React from 'react'

import PageMessage from './PageMessage'
import './ClassWork.css'

export default function ClassWork({ toggleClassNavDropdown }) {
    return (
        <div>
            <div>
                <div className="dropdown3">
                    <button
                    className="dropbtn3 create-btn"
                    onClick={toggleClassNavDropdown}
                    >
                    <i className="fas fa-plus"></i> Create
                    </button>
                    <div className="dropdown-content3 classNavDropdown">
                    <p><i className="fas fa-question-circle"></i> Question</p>
                    <p><i className="fas fa-book"></i> Resource</p>
                    <p><i className="fas fa-tasks"></i> Assignment</p>
                    <hr/>
                    <p><i className="fas fa-file-alt"></i> Topic</p>
                    </div>
                </div>
            </div>
            <PageMessage/>
        </div>
    )
}

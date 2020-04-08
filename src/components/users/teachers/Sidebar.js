import React from 'react'

export default function Sidebar() {
    return (
        <div>
            <div className="">
            <h2>Attendance</h2>
            <ul>
              <li>Active</li>
              <li>Absent</li>
              <li>Late</li>
              <li>Left early</li>
            </ul>
          </div>
          <div className="">
            <h2>Connect</h2>
            <ul>
              <li>Parents</li>
              <li>Students</li>
              <li>Co-Teachers</li>
            </ul>
          </div>
          <div className="">
            <h2>Skills/Behaviors</h2>
            <ul>
              <li>Active</li>
              <li>Helps others</li>
              <li>Passive</li>
            </ul>
          </div>
          <div className="">
            <h2>Ideas/Plans</h2>
            <ul>
              <li>Projects</li>
              <li>Subjects</li>
              <li>Notes</li>
              <li>Calculator</li>
              <li>Calendar</li>
            </ul>
          </div>
          <div className="">
            <h2>Announcements</h2>
            <ul>
                <li>Make Announcement</li>
            </ul>
          </div>
          <div className="">
            <h2>Classes</h2>
            <ul>
                <li><i className='fas fa-plus-circle'></i> Add New</li>
            </ul>
          </div>
        </div>
    )
}

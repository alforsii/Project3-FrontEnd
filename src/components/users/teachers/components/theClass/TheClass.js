import React, { Component } from 'react';

import { ClassworkContext } from '../../../../../myContext/ClassworkProvider';
import ClassNavbar from './components/classNavbar/ClassNavbar';
import ClassPosts from './components/classPosts/ClassPosts';
import ClassWorks from './components/classWorks/ClassWorks';
import ClassConnections from './components/ClassConnections/ClassConnections';
import ClassAlbums from './components/classAlbums/ClassAlbums';
import './TheClass.css';

export class TheClass extends Component {
  componentDidMount() {
    const { currClass } = this.props.location.state;
    this.context.getClassData(currClass._id);
    this.props.handleDrawerOpen();
  }

  render() {
    const {
      state: { users },
    } = this.props.context;
    const {
      students,
      teachers,
      restStudents,
      restTeachers,
      defaultPage,
    } = this.context.classworkState;

    const { currClass } = this.props.location.state;
    const { switchDefaultPage, updateState } = this.context;

    return (
      <React.Fragment>
        <div className="main-class-page">
          <ClassNavbar switchDefaultPage={switchDefaultPage} />

          {defaultPage === 'posts' && <ClassPosts />}

          {defaultPage === 'works' && <ClassWorks currClass={currClass} />}

          {defaultPage === 'users' && (
            <ClassConnections
              currClass={currClass}
              students={students}
              teachers={teachers}
              updateState={updateState}
              restStudents={restStudents}
              restTeachers={restTeachers}
            />
          )}

          {defaultPage === 'albums' && <ClassAlbums users={users} />}
        </div>
      </React.Fragment>
    );
  }
}

export default TheClass;
TheClass.contextType = ClassworkContext;

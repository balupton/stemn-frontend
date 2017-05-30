import React from 'react';
import moment from 'moment';
import { has }     from 'lodash';

import classNames from 'classnames';
import classes from './TaskDisplayModal.css';

import Checkbox from 'stemn-shared/misc/Input/Checkbox/Checkbox';
import UserAvatar from 'stemn-shared/misc/Avatar/UserAvatar/UserAvatar.jsx';
import LabelSelect from 'stemn-shared/misc/Tasks/LabelSelect/LabelSelect.jsx';
import UserSelect from 'stemn-shared/misc/Users/UserSelect/UserSelect.jsx';
import DatePicker from 'stemn-shared/misc/Calendar/DatePicker/DatePicker.jsx';
import Textarea from 'stemn-shared/misc/Input/Textarea/Textarea';
import CommentNew from 'stemn-shared/misc/Comments/Comment/CommentNew.jsx';
import Popover from 'stemn-shared/misc/Popover';
import PopoverMenuList from 'stemn-shared/misc/PopoverMenu/PopoverMenuList';
import SimpleIconButton from 'stemn-shared/misc/Buttons/SimpleIconButton/SimpleIconButton.jsx'
import MdMoreHoriz from 'react-icons/md/more-horiz';
import LoadingOverlay from 'stemn-shared/misc/Loading/LoadingOverlay/LoadingOverlay.jsx';
import TimelineVertical from 'stemn-shared/misc/SyncTimeline/TimelineVertical'
import TaskTimelineEmpty from 'stemn-shared/misc/Tasks/TaskTimelineEmpty'

export default React.createClass({
  showLabelEditModal(){
    this.props.showLabelEditModal({
      boardId: this.props.task.data.board
    })
  },
  toggleComplete(model, value){
    this.props.toggleComplete({
      taskId: this.props.task.data._id,
      model,
      value
    })
    this.updateTask();
  },
  updateTask(){
    setTimeout(()=>this.props.updateTask({task: this.props.task.data}), 1);
  },
  deleteTask(){
    this.props.deleteTask({
      taskId: this.props.task.data._id,
      boardId: this.props.task.data.board,
    });
    this.props.modalConfirm();
  },
  render() {
    const { taskId, task, board, entityModel, project, timeline, timelineCacheKey, modalCancel } = this.props;

    const getMain = () => {
      const menu = [{
        label: 'Refresh',
        onClick: () => {}
      },{
        label: 'Delete Task',
        onClick: this.deleteTask
      }];
      return (
        <div className="layout-column flex">
          <div className={classes.header}>
            <div className="layout-row layout-align-start-center">
              <Checkbox
                model={`${entityModel}.data.complete`}
                value={task.data.complete}
                changeAction={this.toggleComplete}
                className="text-primary"
                circle={true} />
              <div className="text-title-4 flex" style={{marginLeft: '15px'}}>
                <Textarea
                  model={`${entityModel}.data.name`}
                  onChange={this.updateTask}
                  value={task.data.name}
                  className="input-plain"
                  type="text"
                  placeholder="Task description" />
              </div>
              <Popover preferPlace="below">
                <SimpleIconButton>
                  <MdMoreHoriz size="20px"/>
                </SimpleIconButton>
                <PopoverMenuList menu={menu}/>
              </Popover>
            </div>
            <div className="text-grey-3" style={{padding: '15px 0 20px'}}>
              Created {moment(task.data.created).fromNow()} <b className="text-interpunct"></b> By <a className="link-primary">{task.data.owner.name}</a>
            </div>
          </div>
          <div className={classes.timeline + ' layout-column flex scroll-box'}>
            { timeline && timeline.length > 0 &&
              <TimelineVertical
                className={ classes.timeline }
                items={ timeline }
                timelineCacheKey={ timelineCacheKey }
                entity={ board }
                type="task"
              />
            }
            { timeline && timeline.length == 0 &&
              <TaskTimelineEmpty className="flex" />
            }
          </div>
          <div className={ classes.newComment }>
            <CommentNew
              taskId={ taskId }
              timelineCacheKey={ timelineCacheKey }
            />
          </div>
        </div>
      )
    }
    
    const getSidebar = () => {
      return (
        <div className="layout-column flex">
          <div className={classes.well}>
            <div className={classes.settingTitle + ' text-mini-caps layout-row layout-align-start-center'}>
              <div className="flex">Labels</div>
              <a className={classes.add} title="Edit labels" onClick={this.showLabelEditModal}>+</a>
            </div>
            <div style={{maxHeight: '200px', overflowY: 'auto'}}>
              {board && board.data && board.data.labels
                ?
                <LabelSelect
                  model={`${entityModel}.data.labels`}
                  value={task.data.labels}
                  onChange={this.updateTask}
                  labelInfo={board.data.labels}
                />
                : ''
              }
            </div>
          </div>
          <div className={classes.well}>
            <div className={classes.settingTitle + ' text-mini-caps layout-row layout-align-start-center'}>
              <div className="flex">Asignees</div>
            </div>
            <div style={{padding: '15px'}}>
              <UserSelect
                model={`${entityModel}.data.users`}
                onChange={this.updateTask}
                value={task.data.users}
                users={project.data.team}
              />
            </div>
          </div>
          <div className={classes.well}>
            <div className={classes.settingTitle + ' text-mini-caps layout-row layout-align-start-center'}>
              Due Date
            </div>
            <div style={{padding: '15px'}}>
              <DatePicker
                model={`${entityModel}.data.due`}
                onChange={this.updateTask}
                value={task.data.due}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={classNames(classes.taskDisplayModal, 'layout-column')}>
        <div className="layout-row flex">
          <div className="flex-70 layout-column rel-box">
            <LoadingOverlay show={!task || !task.data || !project || !project.data}/>
            {task && task.data && project && project.data ? getMain() : null}
          </div>
          <div className={classes.sidebar + ' flex'}>
            {task && task.data && project && project.data ? getSidebar() : null}
          </div>
        </div>
      </div>
    )
  }
});

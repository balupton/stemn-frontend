// Container Core
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Container Actions
import * as TasksActions from '../../Tasks.actions.js';
import * as ModalActions from 'app/renderer/main/modules/Modal/Modal.actions.js';

// Component Core
import React from 'react';
import moment from 'moment';
import { Field } from 'react-redux-form';

// Styles
import classNames from 'classnames';
import classes from './TaskListItem.css';

// Sub Components
import Checkbox from 'app/renderer/main/components/Input/Checkbox/Checkbox';
import UserAvatar from 'app/renderer/main/components/Avatar/UserAvatar/UserAvatar.jsx'
import SimpleIconButton from 'app/renderer/main/components/Buttons/SimpleIconButton/SimpleIconButton'
import { MdMoreHoriz, MdOpenInNew } from 'react-icons/lib/md';
import PopoverMenu from 'app/renderer/main/components/PopoverMenu/PopoverMenu';
import TaskLabelDots from 'app/renderer/main/modules/Tasks/TaskLabelDots/TaskLabelDots.jsx'
import Textarea from 'app/renderer/main/components/Input/Textarea/Textarea';
import UserSelect from 'app/renderer/main/components/Users/UserSelect/UserSelect.jsx';


/////////////////////////////////////////////////////////////////////////////
///////////////////////////////// COMPONENT /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


export const Component = React.createClass({
  componentWillMount() {
    this.props.TasksActions.getTask({
      taskId: this.props.item
    })
  },
  toggleComplete(model, value){
    this.props.TasksActions.toggleComplete({
      taskId: this.props.task._id,
      model,
      value
    })
  },
  deleteTask(){
    this.props.TasksActions.deleteTask({
      taskId: this.props.task._id,
      boardId: this.props.task.board,
    })
  },
  showModal(){
    this.props.ModalActions.showModal({
      modalType: 'TASK',
      modalProps: {
        item: this.props.item
      }
    })
  },
  render() {
    const { task, entityModel, draggable, layout } = this.props;
    if(!task){
      return <div>Task Loading</div>
    }
    if(layout == 'list'){
      return (
        <div className={classNames({[classes.isDragging]: task.isDragging && draggable})} onDoubleClick={this.showModal}>
          <div className={classNames(classes.listItem, 'layout-row flex layout-align-start-center')}>
            <Checkbox
              model={`${entityModel}.complete`}
              value={task.complete}
              changeAction={this.toggleComplete}
              className="text-primary"
              circle={true} />
            <div className="flex text-ellipsis">
              <Field model={`${entityModel}.title`}>
                <input
                  className="input-plain"
                  type="text"
                  placeholder="Task description" />
              </Field>
            </div>
            <TaskLabelDots labels={task.labels} labelInfo={this.context.project.data.labels} tag="true" />
            <div className={classes.listUser + ' layout-row layout-align-start-center text-ellipsis'}>
              <UserAvatar
                picture={task.users[0].picture}
                size="25px"/>
              <div style={{marginLeft: '10px'}}>{task.users[0].name}</div>
            </div>
            <div className={classes.listDate + ' text-ellipsis'}>
              {moment(task.due).fromNow()}
            </div>
            <div className={classes.listActions + ' text-ellipsis layout-row layout-align-end-center'}>
              <SimpleIconButton onClick={this.showModal}>
                <MdOpenInNew size="20px"/>
              </SimpleIconButton>
              <PopoverMenu preferPlace="below">
                <SimpleIconButton>
                  <MdMoreHoriz size="20px"/>
                </SimpleIconButton>
                <div className="PopoverMenu">
                  <a>View Task</a>
                  <a onClick={this.deleteTask}>Delete Task</a>
                </div>
              </PopoverMenu>
            </div>
          </div>
        </div>
      )
    }
    else{
      return (
        <div className={classNames(classes.card, 'layout-column flex')} onDoubleClick={this.showModal}>
          <div className={classes.cardBody + ' layout-row'}>
            <Checkbox
              model={`${entityModel}.complete`}
              value={task.complete}
              changeAction={this.toggleComplete}
              className="text-primary"
              circle={true} />
            <div className={classes.cardText + ' flex'}>
              <Textarea
                model={`${entityModel}.title`}
                value={task.title}
                className="input-plain"
                type="text"
                placeholder="Task description" />
            </div>
            <PopoverMenu preferPlace="right" disableClickClose={true}>
              <UserAvatar picture={task.users[0].picture} size="25px"/>
              <div className="PopoverMenu" style={{padding: '15px'}}>
                <UserSelect value="dropbox" />
              </div>
            </PopoverMenu>
          </div>
          { task.labels && task.labels.length > 0 ?
            <div className={classes.cardFooter + ' layout-row'}>
              <TaskLabelDots labels={task.labels} labelInfo={this.context.project.data.labels} />
            </div>
            : null
          }
        </div>
      );
    }
  }
});

Component.contextTypes = {
  project: React.PropTypes.object
}

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONTAINER /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function mapStateToProps({ tasks }, {item}) {
  const task = tasks.data[item] && tasks.data[item].data ? tasks.data[item].data : null;
  return {
    task,
    entityModel: `tasks.data[${item}].data`
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TasksActions: bindActionCreators(TasksActions, dispatch),
    ModalActions : bindActionCreators(ModalActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

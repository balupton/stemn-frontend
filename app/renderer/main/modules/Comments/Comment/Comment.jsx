// Container Core
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Container Actions
import * as CommentsActions from 'app/renderer/main/modules/Comments/Comments.actions.js';

// Component Core
import React from 'react';
import moment from 'moment';

// Styles
import classNames from 'classnames';
import classes from './Comment.css';

// Sub Components
import UserAvatar from 'app/renderer/main/components/Avatar/UserAvatar/UserAvatar.jsx';


/////////////////////////////////////////////////////////////////////////////
///////////////////////////////// COMPONENT /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const onMount = (nextProps, prevProps) => {
  if(nextProps.item){
    if(!prevProps || nextProps.item._id !== prevProps.item._id){
    }
  }
}

export const Component = React.createClass({

  // Mounting
  componentWillMount() { onMount(this.props) },
  componentWillReceiveProps(nextProps) { onMount(nextProps, this.props)},

  render() {
    const { item, comment, entityModel } = this.props;

    if(!comment){
      return <div>Comment Loading</div>
    }

    return (
      <div className={classes.comment + ' layout-row'}>
        <div className={classes.commentAvatar}>
          <UserAvatar picture={comment.data.owner.picture} />
        </div>
        <div className={classes.commentBody + ' flex'}>
          <div className={classes.commentHeader}>
            {comment.data.owner.name} · {moment(comment.data.timestamp).fromNow()}
          </div>
          <div className={classes.commentContent}>
           {comment.data.blurb}
          </div>
          <div className={classes.commentFooter}>
           <a className="link-primary">Delete</a> · <a className="link-primary">Edit</a>
          </div>
        </div>
      </div>
    )
  }
});


/////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONTAINER /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function mapStateToProps({ comments }, {item}) {
  return {
    comment: comments.data[item._id],
    entityModel: `comments.data.${item._id}`
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CommentsActions: bindActionCreators(CommentsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

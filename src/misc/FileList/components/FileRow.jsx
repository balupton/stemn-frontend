import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import classes from './FileRow.css'
import bytes from 'stemn-shared/utils/filters/bytes.js';
import FileIcon from './FileIcon'
import Label from 'stemn-shared/misc/Label/Label.jsx'
import Link from 'stemn-shared/misc/Router/Link';
import Highlight from 'stemn-shared/misc/Autosuggest/Highlight'

export default class FilwRow extends Component {
  static propTypes = {
    singleClick: PropTypes.func,
    doubleClick: PropTypes.func,
    file: PropTypes.object.isRequired,
    query: PropTypes.string,
    isActive: PropTypes.bool,
    link: PropTypes.bool,
  }
  singleClick = () => {
    const { singleClick, file } = this.props
    if (singleClick) {
      singleClick({ file })
    }
  }
  doubleClick = () => {
    const { doubleClick, file } = this.props
    if (doubleClick) {
      doubleClick({ file })
    }
  }
  render() {
    const { isActive, file, query, link } = this.props;

    const timeFromNow = moment(file.modified).fromNow();

    const getClickOverlay = () => {
      if (link) {
        const params = {
          fileId: file.fileId,
          projectId: file.project._id,
          revisionId: file.revisionId,
        }

        const getRouteName = () => {
          if (file.type === 'file') {
            return 'fileRoute'
          } else if (file.type == 'folder') {
            return 'projectFolderRoute'
          } else {
            return 'projectRoute'
          }
        }

        return (
          <Link
            className={ classes.clickOverlay }
            onClick={ this.singleClick }
            onDoubleClick={ this.doubleClick }
            name={ getRouteName() }
            params={ params }
          />
        )
      } else {
        return (
          <div
            className={ classes.clickOverlay }
            onClick={ this.singleClick }
            onDoubleClick={ this.doubleClick }
          />
        )
      }
    }

    return (
      <div className={classNames(classes.row, 'layout-row layout-align-start-center', {[classes.active]: isActive})} >
        { getClickOverlay() }
        <FileIcon fileType={file.extension} type={file.type}/>
        <div className="text-ellipsis flex">
          <Highlight
            text={ file.name }
            query={ query }
          />
        </div>
        { file.commit && file.commit.summary && file.commit._id
        ? <Link
            name='commitRoute'
            params={ { projectId: file.project._id, commitId: file.commit._id } }
            show
            scope="main"
            className={ classNames(classes.clickable, 'link-primary') }
          >
          {file.commit.summary}
          </Link>
        : null }
        <div className="flex"></div>
        { file.revisionNumber > 1
        ? <div style={{padding: '0 15px'}}><Label title={file.revisionNumber + ' revisions'}>{file.revisionNumber} Revisions</Label></div>
        : null }
        <div style={{width: '100px'}}>{file.modified ? timeFromNow : ''}</div>
        <div style={{width: '80px'}}>{bytes(file.size)}</div>
      </div>
    );
  }
}

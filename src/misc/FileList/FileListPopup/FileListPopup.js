import React, { Component, PropTypes } from 'react'
import { orderBy, omit } from 'lodash'

import classNames from 'classnames'
import classes from './FileListPopup.css'

import LoadingOverlay from 'stemn-shared/misc/Loading/LoadingOverlay/LoadingOverlay.jsx'
import MdRefresh from 'react-icons/md/refresh'
import MdHome from 'react-icons/md/home'
import SimpleIconButton from 'stemn-shared/misc/Buttons/SimpleIconButton/SimpleIconButton.jsx'
import FileIcon from 'stemn-shared/misc/FileList/components/FileIcon'

const FileRow = (props) => {
  const { file, isActive, clickFn } = props
  const rowClasses = classNames(classes.file, {[classes.active] : isActive}, 'layout-row layout-align-start-center')
  return (
    <div className={ rowClasses } onClick={ () => clickFn({ file }) }>
      <FileIcon fileType={ file.extension } type={ file.type } size={ 20 } />
      <div className="text-ellipsis">{ file.name }</div>
    </div>
  )
}

const propTypesObject = {
  activeFile: PropTypes.string.isRequired,
  clickFn: PropTypes.func,
  path: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  // From Popover
  isOpen: PropTypes.bool,
  // From Container
  fileList: PropTypes.object,
  fileListCacheKey: PropTypes.string,
  getFiles: PropTypes.func.isRequired,
}
export default class FileListPopup extends Component {
  static propTypes = propTypesObject
  render() {
    const { fileList, parentfolder, activeFile, clickFn } = this.props
    const isLoading    = !fileList || fileList.loading
    const filesOrdered = fileList && fileList.entries ? orderBy(fileList.entries, 'name') : []
    const filesOnly    = filesOrdered.filter(file => file.type == 'file')
    const foldersOnly  = filesOrdered.filter(file => file.type == 'folder')

    return (
      <div { ...omit(this.props, Object.keys(propTypesObject)) } className={classes.popup}>
        <LoadingOverlay show={ isLoading } linear noOverlay />
        { foldersOnly && foldersOnly.map(file => (
            <FileRow
              key={ file._id }
              file={ file }
              isActive={ file.fileId == activeFile }
              clickFn={ clickFn }
            />
          ))
        }
        { foldersOnly && filesOnly && <div className={classes.divider} /> }
        { filesOnly && filesOnly.map(file => (
            <FileRow
              key={ file._id }
              file={ file }
              isActive={ file.fileId == activeFile }
              clickFn={ clickFn }
            />
          ))
        }
      </div>
    );
  }
}

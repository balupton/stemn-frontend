/**************************************************************************
We pass in either revisions or file1 + file2.
**************************************************************************/

// Container Core
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Container Actions
import * as ElectronWindowsActions from 'app/shared/modules/ElectronWindows/ElectronWindows.actions.js';
import * as SystemActions    from 'app/shared/actions/system';

// Component Core
import React from 'react';
import { getViewerType } from 'app/renderer/main/modules/Files/PreviewFile/PreviewFile.utils.js';

// Styles
import classNames from 'classnames';

// Sub Components
import PopoverMenu          from 'app/renderer/main/components/PopoverMenu/PopoverMenu';
import PopoverMenuList      from 'app/renderer/main/components/PopoverMenu/PopoverMenuList';
import SimpleIconButton     from 'app/renderer/main/components/Buttons/SimpleIconButton/SimpleIconButton'
import { getCompareModes, getCompareIcon }  from '../FileCompare.utils.js';
import { MdMoreHoriz }      from 'react-icons/lib/md';

///////////////////////////////// COMPONENT /////////////////////////////////

export const Component = React.createClass({
  menu() {
    const { file1, dispatch, isChange } = this.props;
    const discardChanges = {
      label: 'Discard Changes',
      onClick: () => {
      },
    }
    const openFile = {
      label: 'Open File',
      onClick: () => {
        dispatch(SystemActions.openFile({
          path: file1.path,
          projectId: file1.project._id,
          provider: file1.provider
        }))
      },
    }
    const openFolder = {
      label: 'Open Containing Folder',
      onClick: () => {
        dispatch(SystemActions.openFile({
          location: true,
          path: file1.path,
          projectId: file1.project._id,
          provider: file1.provider
        }))
      },
    }
    const preview = {
      label: 'Open Preview Window',
      onClick: () => {
        dispatch(ElectronWindowsActions.create({
          type: 'PREVIEW',
          props: {
            fileId: file1.fileId,
            revisionId: file1.revisionId,
            projectId: file1.project._id
          }
        }))
//        setTimeout(() => dispatch(ElectronWindowsActions.parse()), 100)
      },
    }
    return isChange ? [discardChanges, openFile, openFolder, preview] : [openFile, openFolder, preview]
  },
  render() {
    const { mode, changeMode, revisions, file1, file2, dispatch } = this.props;

    if(!file1){return null};

    const previewType  = getViewerType(file1.extension, file1.provider);
    const compareModes = getCompareModes(previewType, previewType);
    const CompareIcon  = getCompareIcon(mode);
    return (
      <div>
        {
          revisions && revisions.length > 1 || file1 && file2 ?
          <PopoverMenu preferPlace="below">
            <SimpleIconButton title="Compare">
              <CompareIcon size="20px" />
            </SimpleIconButton>
            <div className="PopoverMenu">
              {compareModes.map(item=><a key={item.value}
              className={classNames({'active': mode == item.value})}
              onClick={()=>changeMode(item.value)}>
                Compare: {item.text}
              </a>)}
            </div>
          </PopoverMenu>
          : null
        }
        <PopoverMenu preferPlace="below">
          <SimpleIconButton title="Options">
            <MdMoreHoriz size="20px" />
          </SimpleIconButton>
          <PopoverMenuList menu={this.menu()} />
        </PopoverMenu>
      </div>
    );
  }
});

///////////////////////////////// CONTAINER /////////////////////////////////

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    electronWindowsActions: bindActionCreators(ElectronWindowsActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);


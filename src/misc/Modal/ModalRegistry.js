import BetaModal              from './modals/BetaModal.jsx';
import ConfirmModal           from './modals/ConfirmModal.jsx';
import ConnectionModal        from './modals/ConnectionModal.jsx';
import ErrorModal             from './modals/ErrorModal.jsx';


import AssemblyPartNotFound   from 'stemn-shared/misc/Files/PreviewFile/Messages/AssemblyPartNotFound/AssemblyPartNotFoundModal.jsx'
import FileDownload           from 'stemn-shared/misc/Files/Download/DownloadModal/DownloadModal.jsx'
import FileSelectModal        from 'stemn-shared/misc/FileSelect/FileSelectModal.jsx';
import PreviewExpired         from 'stemn-shared/misc/Files/PreviewFile/Messages/PreviewExpired/PreviewExpiredModal.jsx'
import ProviderAccessError    from './modals/ProviderAccessErrorModal.jsx'
import ProviderAccessRevoked  from './modals/ProviderAccessRevokedModal.jsx'
import TaskLabelsEditModal    from 'stemn-shared/misc/Tasks/TaskLabelsEditModal/TaskLabelsEditModal.jsx'
import TaskMentionModal       from 'stemn-shared/misc/Mentions/TaskMentionModal/TaskMentionModal.jsx'

const modalRegistry = {
//  'BETA'                    : BetaModal,
//  'CONFIRM'                 : ConfirmModal,
//  'CONNECTION'              : ConnectionModal,
//  'ERROR'                   : ErrorModal,
//
//  'ASSEMBLY_PART_NOT_FOUND' : AssemblyPartNotFound,
//  'FILE_DOWNLOAD'           : FileDownload,
//  'FILE_SELECT'             : FileSelectModal,
//  'PREVIEW_EXPIRED'         : PreviewExpired,
//  'PROVIDER_ACCESS_ERROR'   : ProviderAccessError,
//  'PROVIDER_ACCESS_REVOKED' : ProviderAccessRevoked,
//  'TASK_COMMIT'             : TaskMentionModal,
//  'TASK_LABELS'             : TaskLabelsEditModal,
};

export const registerModal = (modalType, component) => {
  if (!modalRegistry[modalType]) {
    modalRegistry[modalType] = component;
  }
};

export const getModal = (modalType) => {
  const modalComponent = modalRegistry[modalType];
  if (modalComponent) {
    return modalComponent
  } else {
    console.error(`${modalType} Modal could not be found`);
  }
}

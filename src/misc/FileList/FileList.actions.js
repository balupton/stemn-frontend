import http from 'axios'

export function fetchFiles({projectId, path, options, cacheKey}) {
  return {
    type: 'FILE_LIST/FETCH_FILES',
    http: true,
    payload: {
      method: 'GET',
      url: `/api/v1/sync/listFolder/${projectId}/${path}`
    },
    meta: {
      cacheKey,
    },
    throttle: {
      time: 500,
      endpoint:  `${projectId}/${path}`
    },
  };
}

export function exploreFolder({folderId, provider, cacheKey }) {
  return {
    type: 'FILE_LIST/EXPLORE_FOLDER',
    payload: http({
      method: 'GET',
      url: `/api/v1/remote/explore/${provider}/${folderId}`
    }),
    meta: {
      cacheKey,
    },
    throttle: {
      time: 500,
      endpoint: `${provider}/${folderId}`
    },
  };
}

export const getSearchResults = ({ projectId, folderId, query, cacheKey }) => ({
  type: 'FILE_LIST/SEARCH',
  http: true,
  payload: {
    url: `/api/v1/sync/search/${projectId}/${folderId}`,
    params: {
      query,
    },
  },
  meta: {
    cacheKey
  },
  throttle: {
    time: 500,
    endpoint: `search-${cacheKey}`,
  },
})

export const getFiles = ({ path, provider, projectId, cacheKey }) => (dispatch) => {
  if (['dropbox', 'drive'].includes(provider)){
    dispatch(exploreFolder({
      provider,
      folderId: path,
      cacheKey,
    }))
  } else if (projectId) {
    dispatch(fetchFiles({
      projectId,
      path,
      cacheKey,
    }))
  }
}


//export const joinRoom = ({fileId}) => {
//  return (dispatch, getState) => {
//    const alreadyConnected = getState().fileList.websocketRooms.includes(fileId);
//    if(!alreadyConnected){
//      dispatch({
//        type      : 'FILE_LIST/WEBSOCKET_JOIN_FILE',
//        websocket : true,
//        payload   : {
//          type    : 'ROOM/JOIN',
//          payload : {
//            room  : fileId,
//            type  : 'file'
//          }
//        }
//      });
//    }
//  }
//}
//
//export const leaveRoom = ({fileId}) => {
//  return (dispatch, getState) => {
//    const alreadyConnected = getState().fileList.websocketRooms.includes(fileId);
//    if(alreadyConnected){
//      dispatch({
//        type      : 'FILE_LIST/WEBSOCKET_LEAVE_FILE',
//        websocket : true,
//        payload   : {
//          type    : 'ROOM/LEAVE',
//          payload : {
//            room  : fileId,
//            type  : 'file'
//          }
//        }
//      });
//    }
//  }
//}

import http from 'axios';
export function getPath({projectId}) {
  return {
    type: 'LOCAL_PATH/GET_PATH',
    payload: http({
      method: 'GET',
      url: `/api/v1/remote/localPath/${projectId}`
    }),
    meta: {
      projectId
    }
  }
}
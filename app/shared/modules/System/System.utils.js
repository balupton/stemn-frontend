import fs from 'fs';
import os from 'os';
import pify from 'pify';
import Promise from 'es6-promise'

export const getInstallStatus = () => {
  if(process.platform == 'linux'){
    return pify(fs.stat)(`${os.homedir()}/.local/share/applications/appimagekit-STEMN.desktop`)
    .then(() => true)
    .catch(() => false);
  }
  // If it is not linux - it must be installed
  else{
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}
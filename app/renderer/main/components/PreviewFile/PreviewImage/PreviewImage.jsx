import React from 'react';
import styles from './PreviewImage.css';

export default class extends React.Component{
  render() {
    const {file, project} = this.props;

    const fileUrl = `http://localhost:3000/api/v1/sync/download/${project._id}/${file.fileId}`;

    console.log(fileUrl);
    return (
      <div className={styles.container + ' layout-column layout-align-center-center'}>
          <img src={fileUrl} className={styles.image} />
      </div>
    )
  }
};

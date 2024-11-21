/* eslint-disable no-console */
import storage from '@react-native-firebase/storage';
import {useState} from 'react';

const useUpload = () => {
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

  const uploadDocument = (filePath: string) => {
    const extension = filePath.split('.').pop();
    const reference = storage().ref(
      `${Math.floor(Math.random() * Date.now()).toString(16)}.${extension}`,
    );

    const task = reference.putFile(filePath);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task
      .then(async () => {
        const imageRemoteUrl: string = await reference.getDownloadURL();
        setPath(imageRemoteUrl);
      })
      .catch(() => setUploadError(true));
  };

  return {uploadDocument, path, uploadError};
};

export default useUpload;

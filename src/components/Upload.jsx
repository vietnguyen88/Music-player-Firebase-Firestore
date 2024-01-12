import { useEffect, useState } from 'react';

const Upload = () => {
  const [upload, setUpload] = useState();
  const [progress, setProgress] = useState(0);
  const uploadFile = () => {
    //make blob from file
    const blob = new Blob([upload], { type: upload.type });

    const uploadRef = ref(storage, upload.name);
    // uploadBytes(uploadRef, upload).then((snapshot) => console.log(snapshot));
    uploadBytesResumable(uploadRef, blob).on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log('error', err),
      () => {
        getDownloadURL(
          uploadBytesResumable(uploadRef, upload).snapshot.ref
        ).then((downloadURL) => console.log(downloadURL));
        setProgress(0);
      }
    );
  };
  return (
    <div className="input_file">
      <input type="file" onChange={(e) => setUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      {progress > 0 && (
        <progress id="file" value={progress} max="100">
          {progress}
        </progress>
      )}
    </div>
  );
};

export default Upload;

import { useEffect, useState } from 'react';
import {
  ref,
  listAll,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from './config/firebaseConfig';
import vinyl from './assets/vinyl.svg';
import './App.css';

function App() {
  const [tracks, setTracks] = useState([]);
  const [upload, setUpload] = useState();
  const [progress, setProgress] = useState(0);
  const path = 'https://storage.googleapis.com/';
  useEffect(() => {
    const storageRef = ref(storage);
    listAll(storageRef).then((res) =>
      res.items.forEach((itemRef) => {
        setTracks([
          ...tracks,
          {
            name: itemRef.bucket,
            path: path + itemRef.bucket + '/' + itemRef.fullPath,
          },
        ]);
        console.log(itemRef);
      })
    );
  }, []);
  console.log(tracks[0]);
  const uploadFile = () => {
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
    <>
      <div className="vinyl ">
        <img src={vinyl} alt="" className="active-spin" />
      </div>
      {tracks && (
        <div className="audio">
          {}
          <audio controls src={tracks[0]?.path} type="audio/mpeg"></audio>
        </div>
      )}
      <div className="input_file">
        <input type="file" onChange={(e) => setUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
        {progress > 0 && (
          <progress id="file" value={progress} max="100">
            {progress}
          </progress>
        )}
      </div>
    </>
  );
}

export default App;

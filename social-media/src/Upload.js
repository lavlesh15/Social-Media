import { Button } from '@material-ui/core';
import React , {useState} from 'react';
import "./upload.css";
import {db , storage} from './firebase';
import firebase from 'firebase';



function Upload({username}) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [url , setUrl] = useState('');
    const [progress , setProgress] = useState(0);

    const handleChange = (e) =>{
        if(e.target.files[0])
        {
            setImage(e.target.files[0]);
        }  
    };


    const handleUpload = () =>
    {
        const uploadtask = storage.ref(`images/${image.name}`).put(image);

        uploadtask.on(
            "state_changed",
            (snapshot)=> {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(progress);
            },
            (error) => {
                console.log(error.message);
                alert(error.message);
            },
            () => {
                // Complete Function 
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // Pushing The Image into Database for Rendering.
                    db.collection("posts").add(
                    {
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imageUrl : url,
                        username : username,
                    })

                    setProgress(0);
                    setCaption('');
                    setImage(null);
                }); 
            
            }
        )
    }

    return (
        <div className="upload_div">
            <progress className="progress" value={progress} max="100"/>
            <input className="upload_caption" type="text" placeholder="Enter a Caption " value={caption} onChange={(event) => setCaption(event.target.value)} />
            <input className="upload_file" type="file" onChange={handleChange} />
            <Button className="button_upload" onClick={handleUpload} >Upload <i className="fas fa-upload"></i>  </Button>
        </div>
    )
}

export default Upload

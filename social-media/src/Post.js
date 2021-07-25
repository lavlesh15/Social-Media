import React, { useEffect, useState } from 'react'
import "./post.css";
import { Avatar } from '@material-ui/core';
import {db} from "./firebase";
import firebase from "firebase";


function Post({username ,user, postId,  imageUrl , caption }) {

        const [comments , setComments] = useState([]);
        const [comment , setComment] = useState("");

        useEffect(() => {
            let unsubscribe;
            if(postId)
            {
                 unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                });

            }
            return () =>
            {
                unsubscribe();
            };

        }, [postId])

        const postComment = (e) => {
            e.preventDefault();

            db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text : comment,
                username : user.displayName,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            });

            setComment("");

        }



    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar"/>
                <h3>{username}</h3>
            </div>

            <img className="post_img" src={imageUrl} />

           
            <p className="post_caption"><strong>{username}</strong> : {caption}</p>

          
                <div className="post_Comments">
        
                   {
                        comments.map((comment) => (
                            <p><strong>{comment.username} : </strong>{comment.text}  <span> {new Date(comment.timestamp?.toDate()).toLocaleString()}</span></p>
                        ))
                   }
                </div>
           
        {
            user ?
             (

                <form className="Comment_form">
                <input
                 className="comment_input"
                 type="text"
                 placeholder="Add a Comment..."
                 value={comment}
                 onChange= {(e) => setComment(e.target.value)}
                 />

                 <button
                  className="post_button"
                  disabled={!comment}
                  type="submit"
                  onClick={postComment}
                 >
                 Post</button>
           </form>


            ):
            ( <p></p>)
        }
           
        </div>
    )
}

export default Post

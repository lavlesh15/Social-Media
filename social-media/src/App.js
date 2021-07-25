import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Post from './Post';
import {db , auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Upload from './Upload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  p :
  {
    textAlign:'center',
    color:'gold',
    textShadow:'1px 1px 1px gray',
    marginTop:'10px',
    wordSpacing:'2px',
    
  }
}));

function App() {


const [posts , setPosts] = useState([]);
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password , setPassword] = useState('');
const [modalStyle] = useState(getModalStyle);
const [open, setOpen] = useState(false);
const [openSignIn , setOpenSignIn] = useState(false);
const classes = useStyles();
const [user , setUser] = useState(null);

useEffect(()=> {
 
     const unsubscribe = auth.onAuthStateChanged((authUser) => {

      if(authUser)
      {
        console.log(authUser);
        setUser(authUser);
      }
      else
      {
        setUser(null);
      }
  })

  return () => {
    unsubscribe();
  }
   
},[user,username]);



useEffect(() => {
  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
     setPosts(snapshot.docs.map((doc) =>
    ({
      id : doc.id,
      post: doc.data()
    })));
  })
 
}, []);

const signup = (event) =>
{

  event.preventDefault();
  auth.createUserWithEmailAndPassword(email , password)
  .then((authUser)=> {
      return authUser.user.updateProfile({
          displayName : username
       });
  })
  .catch((error)=> alert(error.message));

  setOpen(false);
  
};

const signIn = (event) =>{
      event.preventDefault();

      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      
      setOpenSignIn(false);

};

 
  return (
    <div className="App">

      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper} >
          
        <form className="app_signup">
        <center>
          <div>
            <img className="signup_img" src="https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_960_720.png" alt="" />

          </div>
        </center>
          <Input 
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <Input 
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={signup} > Sign Up <LockOpenRoundedIcon style={{ color: "gray",fontSize:"18px",marginLeft:"5px"}}/>  </Button> 

            <small className={classes.p}> 2021 &copy; Lavlesh Singh | all rights reserved <i className="fas fa-heart"></i></small>
         

          </form>

        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper} >
          
        <form className="app_signup">
        <center>
          <div>
            <img className="signup_img" src="https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_960_720.png" alt="" />

          </div>
        </center>
            <Input 
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={signIn} > Sign In  <VpnKeyRoundedIcon style={{ color: "gray",fontSize:"18px",marginLeft:"5px"}}/> </Button> 
         
            <small className={classes.p}> 2021 &copy; Lavlesh Singh |  all rights reserved <i className="fas fa-heart"></i> </small>
         
          </form>

        </div>
      </Modal>

      <Header/>

      <div className="buttons">

      {
        user ? (
          <Button onClick={() => auth.signOut()}>Logout  <i className="fas fa-sign-out-alt"></i></Button>
        ) :(

          <div className="signin_div">
            <Button onClick={() => setOpenSignIn(true) }>Sign In </Button>
            <Button onClick={() => setOpen(true)}>Sign Up </Button>

          </div>

        )
      }

      </div>

      

      
       {
         posts.map(({id , post}) => (
          <Post key={id} postId={id} user={user} username = {post.username} imageUrl={post.imageUrl} caption = {post.caption} />
         ))
       }

      { user?.displayName ? (
        <Upload username={user.displayName} />
      ):(
        <p>Sorry You Need To Login To Upload Posts</p>
      )}


   </div>
  );
}

export default App;

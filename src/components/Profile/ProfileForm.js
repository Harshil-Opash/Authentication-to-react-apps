import classes from './ProfileForm.module.css';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { newData } from '../Auth/AuthForm';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAClpY1T6Nyk9epRZ-Q8ChTaGZprvrmh2E',{
      method : 'POST',
      body : JSON.stringify({
        idToken : newData.idToken,
        password : enteredNewPassword,
        returnSecureToken : false,
      }),
      headers: {
        "Content-Type": "application/json",}
    })
    const data = await res.json();
    console.log(data)
    if(data.emailVerified === false){
      history.replace('/')
    }

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

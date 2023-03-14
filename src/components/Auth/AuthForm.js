import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import classes from './AuthForm.module.css';
import { showActions } from '../../store/auth-context';

export let newData;
const AuthForm = () => {
  const emailInputRef = useRef();
  const history = useHistory();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const show = useSelector(state => state.show.show);
  console.log(show)
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log(isLogin)
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAClpY1T6Nyk9epRZ-Q8ChTaGZprvrmh2E', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json",}
        })
        const data = await res.json();
        newData = data;
      console.log(data)
      if(data.registered){
        dispatch(showActions.toggleButton());
      }
      if (!res.ok) {
        console.log(data.error.message)
        setError(data.error.message);
      } else {
        history.replace('/');
        setError("Login Sucessfully")
      }
      
    } else {
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAClpY1T6Nyk9epRZ-Q8ChTaGZprvrmh2E", {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      // console.log(res)
      const data = await res.json();
      // console.log(data)
      if (!res.ok) {
        console.log(data.error.message)
        setError(data.error.message);
      } else {
        setError("Registered Sucessfully")
      }
    }
    
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        <p style={{ color: "white" }}>{error}</p>
      </form>
    </section>
  );
};

export default AuthForm;

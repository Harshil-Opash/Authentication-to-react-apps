import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './MainNavigation.module.css';
import { showActions } from '../../store/auth-context';
// import { useState } from 'react';

const MainNavigation = () => {
  const show = useSelector(state => state.show.show);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(show)
  useEffect(() => {
  history.replace('/auth')
  }, [history])
  const logout = ()=>{
    dispatch(showActions.toggleButton());
    history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!show && <li><Link to='/auth'>Login</Link></li>}
          {show && <li><Link to='/profile'>Profile</Link></li>}
          {show && <li><button onClick={logout}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

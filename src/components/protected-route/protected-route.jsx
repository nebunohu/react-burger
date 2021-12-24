import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { SET_IS_AUTH } from '../../services/actions/auth-actions';
import { getUser } from '../../services/actions/user-actions';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { user, auth } = useSelector(store => store);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  
  //const { isAuth, accessToken } = useSelector(store => store.auth.isAuth);
  
  const init = useCallback(() => {
    if(auth.accessToken) {
      dispatch(getUser(auth.accessToken));
    }
    //dispatch({ type: SET_IS_USER_LOADED });
    if(isUserLoaded) return;
    setIsUserLoaded(true);
    if(user.name && auth.accessToken) dispatch({ type: SET_IS_AUTH, accessToken: auth.accessToken });
  }, [isUserLoaded, auth.accessToken, dispatch, user.name]);

  useEffect(() => {
    init();
  }, [init])

  if ( !isUserLoaded ) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({location}) => 
        auth.isAuth ? (
          children
         ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: location}
           }} />
         )
      }
    />
  );
} 
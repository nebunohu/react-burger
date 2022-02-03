import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { SET_IS_AUTH } from '../../services/actions/auth-actions';
import { getUser } from '../../services/actions/user-actions';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((store) => store);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location = useLocation();
  
  //const { isAuth, accessToken } = useSelector(store => store.auth.isAuth);
  
  const init= useCallback(() => {
    if(auth.accessToken) {
      dispatch(getUser(auth.accessToken));
    } /*else {
      const token = getCookie('token');
      if(token) dispatch(refreshToken({token}));
      return;
    }*/
    //dispatch({ type: SET_IS_USER_LOADED });
    if(isUserLoaded) return;
    if(user.name && auth.accessToken) dispatch({ type: SET_IS_AUTH, accessToken: auth.accessToken });
  }, [isUserLoaded, auth.accessToken, dispatch, user.name]);

  useEffect(() => {
    init();
  }, [init])

  if ( !isUserLoaded ) {
    if(user.name) setIsUserLoaded(true);
    if(!auth.accessToken) {
      return <Navigate to='/login' state={{from: location}} replace />
    }
    return null;
  }

  if(!auth.isAuth) {
    return <Navigate to='/login' state={{from: location}} replace />
  }
  return children;
} 
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { checkAuth, SET_IS_AUTH } from '../../services/actions/auth-actions';
import { getUser } from '../../services/actions/user-actions';
//import { refreshToken } from '../../services/actions/auth-actions';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((store) => store);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location = useLocation();
  
  //const { isAuth, accessToken } = useSelector(store => store.auth.isAuth);
  
  const init= useCallback(() => {
    if(localStorage.getItem('accessToken')) {
      dispatch(checkAuth());
      dispatch(getUser(localStorage.getItem('accessToken')));
    } 
      if(isUserLoaded) return;
      if(user.name && auth.accessToken) dispatch({ type: SET_IS_AUTH, accessToken: auth.accessToken });
    }, [isUserLoaded, auth.accessToken, dispatch, user.name]);

  useEffect(() => {
    init();
  }, [init])

  if ( !isUserLoaded ) {
    if(user.name) setIsUserLoaded(true);
    return null;
  }

  if(!auth.isAuth) {
    return <Navigate to='/login' state={{from: location}} replace />
  }
  return children;
} 
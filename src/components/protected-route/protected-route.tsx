import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../../services/actions/auth-actions';
import { getUser } from '../../services/actions/user-actions';
import { TLocationWithState } from '../../react-burger-env';
//import { refreshToken } from '../../services/actions/auth-actions';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const location = useLocation() as TLocationWithState;
  
  const init= useCallback(() => {
    dispatch(checkAuth());
    if(localStorage.getItem('accessToken')) {
      
      dispatch(getUser(localStorage.getItem('accessToken')));
    } 
    }, [dispatch]);

  useEffect(() => {
    init();
  }, [init])

  if(!auth.isAuth) {
    return location.state ?
      <Navigate to='/login' state={{from: location, backgroundProtected: location.state.background}} replace />
    :
      <Navigate to='/login' state={{from: location}} replace />
  }
  return children;
} 
import { useCallback, useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { SET_IS_AUTH } from '../../services/actions/auth-actions';
import { getUser } from '../../services/actions/user-actions';

interface RootState {
  user: {
    getUserRequest: boolean;
    getUserRequestFailed: boolean;
    isUserLoaded: boolean;
    name: string;
    email: string;
  };
  auth: {
    isAuth: boolean;

    refreshTokenRequest: boolean;
    refreshTokenRequestFailed: boolean;

    loginRequest: boolean;
    loginRequestFailed: boolean;
    fromLoginRedirect: boolean;
    accessToken?: string;
  };
};

type TProtectedRouteProps = {
  path: string;
};

export const ProtectedRoute: FC<TProtectedRouteProps & RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { user, auth } = useSelector((store) => store);
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
    //return null;
  }

  return (
    <Route
      {...rest}
      element={({location}: {location: string}) => 
        auth.isAuth ? (
          children
         ) : (
          <Route path={location} children={<Navigate to='/login' state={{from: location}} replace />} />
         )
      }
    />
  );
} 
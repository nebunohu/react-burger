import { TAuthActions } from "../services/actions/auth-actions";
import { TBurgerActions } from "../services/actions/burger-actions";
import { TTabActions } from "../services/actions/constructor-tab-actions";
import { TPasswordActions } from "../services/actions/password-actions";
import { TRegisterActions } from "../services/actions/register-actions";
import { TUserActions } from "../services/actions/user-actions";
import { store } from '../index';
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TOrderActions } from "../services/actions/order-actions";
import { TWsActions } from "../services/actions/ws-actions";

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationActions = 
  TAuthActions | 
  TBurgerActions | 
  TTabActions | 
  TPasswordActions | 
  TUserActions | 
  TRegisterActions |
  TOrderActions |
  TWsActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
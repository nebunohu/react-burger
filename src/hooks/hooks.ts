import { AppThunk, AppDispatch } from './../types/index';
import { 
  TypedUseSelectorHook, 
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from "react-redux";
import { TRootState } from "../types";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
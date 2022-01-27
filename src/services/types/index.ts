import { Dispatch } from "redux";
import { TAuthActions } from "./auth-actions-types";

type TApplicationActions = TAuthActions;

export type AppDispatch = Dispatch<TApplicationActions>;
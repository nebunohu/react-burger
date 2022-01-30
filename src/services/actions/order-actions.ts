import { AppDispatch, AppThunk } from "../../types"

export const FEED_REQUEST: 'FEED_REQUEST' = 'FEED_REQUEST';

export interface IFeedRequest {
  readonly type: typeof FEED_REQUEST;
}
export type TOrderActions = IFeedRequest;

export const getOrders: AppThunk = () => async (dispatch: AppDispatch) => {
      
  }


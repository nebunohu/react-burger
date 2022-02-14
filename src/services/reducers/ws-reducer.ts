import { TOrder } from '../../types/orders';
import { TWsActions, WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_GET_MESSAGE } from './../actions/ws-actions';

type TWsState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export const initialState:TWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                wsConnected: true,
            }
        }
        case WS_CONNECTION_CLOSE: {
            return {
                ...state,
                wsConnected: false,
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }
        default: return state;
    }
}
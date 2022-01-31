
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_WITH_TOKEN: 'WS_CONNECTION_START_WITH_TOKEN' = 'WS_CONNECTION_START_WITH_TOKEN';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: any;
};

export interface IWsConnectionStartWithToken {
    readonly type: typeof WS_CONNECTION_START_WITH_TOKEN;
    readonly payload: any;
};

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export interface IWsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
    readonly payload: any;
}

export type TWsActions = IWsConnectionStart | IWsConnectionStartWithToken | IWsConnectionSuccess | IWsGetMessage | IWsConnectionClose;
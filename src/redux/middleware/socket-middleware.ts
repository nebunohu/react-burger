import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TApplicationActions, TRootState } from "../../types";
import { TWsActions, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../../services/actions/ws-actions";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsActions) => {
            const {dispatch, getState} = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }



            if ( socket ) {
                if(type === 'WS_CONNECTION_CLOSE') socket.close(1000, 'Closed by user');

                socket.onopen = (event: Event) => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                }

                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: WS_GET_MESSAGE, payload: data});
                }
            }
            next(action);
        }
    }) as Middleware;
}
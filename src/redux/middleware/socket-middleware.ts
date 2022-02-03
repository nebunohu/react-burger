import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TRootState } from "../../types";
import { TWsActions } from "../../services/actions/ws-actions";
import { TMiddlewareWsActions } from "../../types/ws";

export const socketMiddleware = (wsUrl: string, wsActions: TMiddlewareWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsActions) => {
            const {dispatch, getState} = store;
            const { type } = action;
            const { auth } = getState();
            const { wsInit, wsInitWithToken, wsClose, onOpen, onMessage } = wsActions;

            if (type === wsInit) {
                // объект класса WebSocket
                socket = new WebSocket(`${wsUrl}/all`);
            }
            
            if (type === wsInitWithToken) {
                socket = new WebSocket(`${wsUrl}?token=${auth.accessToken.split(' ')[1]}`);
            }

            if ( socket ) {
                if(type === wsClose) socket.close(1000, 'Closed by user');

                socket.onopen = (event: Event) => {
                    dispatch({type: onOpen, payload: event});
                }

                socket.onmessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: onMessage, payload: data});
                }

                socket.onclose = (event: Event) => {
                    //console.log('WS connection closed');
                }
            }
            next(action);
        }
    }) as Middleware;
}
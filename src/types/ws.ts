import { WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN, WS_CONNECTION_CLOSE, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../services/actions/ws-actions"

export type TMiddlewareWsActions = {
  readonly wsInit: typeof WS_CONNECTION_START,
  readonly wsInitWithToken: typeof WS_CONNECTION_START_WITH_TOKEN,
  readonly wsClose: typeof WS_CONNECTION_CLOSE,
  readonly onOpen: typeof WS_CONNECTION_SUCCESS,
  readonly onMessage: typeof WS_GET_MESSAGE
}
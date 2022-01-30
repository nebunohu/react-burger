import { TOrderActions } from "../actions/order-actions";

type TOrderState = {

}

const initialState: TOrderState = {

};

const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch(action.type) {
        default: return state;
    }
}

export default orderReducer;
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL } from "../constants/orderConstants";


export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,  // This contains the order details
                success: true,
                error: null
            };
        case ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
                order: null
            };
        default:
            return state;
    }
};

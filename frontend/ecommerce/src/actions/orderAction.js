import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL } from "../constants/orderConstants"; 
import axios from "axios";

const placeOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('/api/placeorder/', order, config);

        dispatch({
            type: ORDER_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

export default placeOrder;
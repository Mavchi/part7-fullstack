

const messageReducer = (state=null, action) => {
    switch(action.type) {
        case 'MESSAGE_SET':
            return action.data
        default:
            return state
    }
}

export const setMessage = (message) => {
    return async dispatch => {
        dispatch({
          type: "MESSAGE_SET",
          data: message
        });
        setTimeout(() =>
          dispatch({
            type: "MESSAGE_SET",
            data: null,
          }),
          5000
        );
    }
}

export default messageReducer
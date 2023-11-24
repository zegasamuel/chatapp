const initialState = {
    messages: [],
    hasMoreMessages: true,
    loadedMessagesCount: 0
};

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case 'LOAD_MESSAGES_BATCH':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.newMessages],
                loadedMessagesCount: action.payload.loadedMessagesCount,
                hasMoreMessages: true
            };
        case 'NO_MORE_MESSAGES':
            return {
                ...state,
                hasMoreMessages: false
            };
        default:
            return state;
    }
};

export default messagesReducer;

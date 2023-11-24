export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message
});

export const loadMessagesBatch = (batchSize) => {
    return (dispatch, getState) => {
        const allMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const loadedMessagesCount = getState().messages.loadedMessagesCount;
        if (loadedMessagesCount >= allMessages.length) {
            dispatch({ type: 'NO_MORE_MESSAGES' });
            return;
        }
        const endIndex = allMessages.length - loadedMessagesCount;
        const startIndex = Math.max(endIndex - batchSize, 0);
        const newMessages = allMessages.slice(startIndex, endIndex);
        console.log(newMessages);
        dispatch({
            type: 'LOAD_MESSAGES_BATCH',
            payload: {
                newMessages,
                loadedMessagesCount: loadedMessagesCount + newMessages.length
            }
        });
    };
};
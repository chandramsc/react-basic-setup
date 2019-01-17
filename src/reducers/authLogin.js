export default (state = {}, action) => {
    switch (action.type) {
        case 'TOKEN':
            return {
                token: action.token
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }

}
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START': {
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        }
        case 'LOGIN_SUCCESS': {
            localStorage.setItem('USER', JSON.stringify(action.payload));
            return {
                user: action.payload,
                isFetching: true,
                error: false,
            };
        }
        case 'LOGIN_FAILURE': {
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default AuthReducer;

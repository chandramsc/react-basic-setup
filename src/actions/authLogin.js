import { createToken } from '../services/loginServices';

// Login
export const loginToken = (token) => ({
    type: 'TOKEN',
    token
});

export const startLogin = (userData = {}) => {
    return async (dispatch) => {
        const {
            email = '',
            password = '',
        } = userData;
        const user = { email, password };

        try {
            let token = await createToken(user)
            return dispatch(loginToken({
                ...token
            }));
        } catch (error) {
            throw error
        }
    }
};

// Logout
export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return dispatch(logout());
    // return history.push('/');
};
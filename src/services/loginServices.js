import api from '../apiUtils';

export const createToken = async (userData) => {

    const data = {
        "grant_type": "password",
        "client_id": "pg0Tl24emyZDagqbKukO",
        "client_secret": "2j7yyY3CKHtwxvENf3obwZtONfiKeuyPeyMjlgQH",
        "email": userData.email,
        "password": userData.password
    };

    try {
        let response = await api.post('/v1/oauth/token', data)
        localStorage.setItem('token', JSON.stringify(response.data.token));
        return response.data.token
    } catch (error) {
        throw error
    }
};

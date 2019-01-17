import { history } from '../routers/AppRouter';
import api from '../apiUtils';

export const startLogin = (userData) => {

    const tokenStr = localStorage.getItem('token');
    const token = JSON.parse(tokenStr);

    if (!token.access_token) {
        const data = {
            "grant_type": "password",
            "client_id": "pg0Tl24emyZDagqbKukO",
            "client_secret": "2j7yyY3CKHtwxvENf3obwZtONfiKeuyPeyMjlgQH",
            "email": userData.email,
            "password": userData.password
        };

        api.post('/v1/oauth/token', data)
            .then(function (response) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }).catch(function (error) {
                console.log('ERROR', error);
            });
    } else {
        console.log("already get access token");
        api.get('v1/course/all', {
            params: {
                page: 2
            }
        })
            .then(function (response) {
                console.log('SUCCESS', response.data);
            }).catch(function (error) {
                console.log('ERROR1', error);
            });
    }

};

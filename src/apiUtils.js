import axios from 'axios';

const BASE_URL = "http://localhost:8888/api/";

const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use(config => {
    // check if token is present
    const tokenStr = localStorage.getItem('token');
    const token = JSON.parse(tokenStr);
    let accessToken = '';

    if (token != null) {
        accessToken = token.access_token;
    }
    // and not expired
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
})

instance.interceptors.response.use(response => {
    return response
}, async error => {
    const { config, response: { status } } = error;

    if (status === 401) {

        let token = localStorage.getItem('token')
        if (token == null) {
            throw error
        }

        // if refresh token is present in store
        try {
            let token = await refreshToken()
            // store token
            localStorage.setItem('login', token);
            // retry request
            return new Promise(async (resolve, reject) => {
                config.headers['Authorization'] = 'Bearer ' + token.token.access_token;
                try {
                    let response = await axios(config);
                    return response
                } catch (error) {
                    const status = error.response.status
                    if (status === 401) {
                        // redirect to login page since the second attempt also failed
                        redirectToLogin()
                    }
                    throw error
                }
            });

        } catch (error) {
            throw error
        }



        // return refreshToken().then(token => {

        //     const retryOrigReq = new Promise(async (resolve, reject) => {
        //         config.headers['Authorization'] = 'Bearer ' + token.token.access_token;
        //         // store in store

        //         // retry the request
        //         try {
        //             let response = await axios(config);
        //             return response
        //         } catch (error) {
        //             const status = error.response.status
        //             if (status === 401) {
        //                 // redirect to login page since the second attempt also failed
        //                 redirectToLogin()
        //             }
        //             throw error
        //         }

        //     });

        //     return retryOrigReq
        // })
    }

    return Promise.reject(error)
})

async function refreshToken() {
    const tokenStr = localStorage.getItem('token');
    const token = JSON.parse(tokenStr);
    let refreshTokenApi = '';

    if (token != null) {
        refreshTokenApi = token.refresh_token;
    }

    try {
        const response = await axios.post(`${BASE_URL}/v1/oauth/token`, {
            "client_id": "0PnGEaNtKnO4G5JTROtL",
            "client_secret": "8NquzF0cFvaJaqIWc5lybVoNblT9lpKEqCyaauqO",
            "grant_type": "refresh_token",
            "refresh-token": `${refreshTokenApi}`
        })
        return response.data
    } catch (error) {
        redirectToLogin()
        throw error
    }
}

function redirectToLogin() {
    window.location.replace("https://www.example.com");
    return
}

export default instance
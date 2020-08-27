import React from 'react'
import axios from 'axios'
const instance =  axios.create ({
        baseURL: 'https://my-burger-shop-81baf.firebaseio.com/'
    });

export default instance;
import axios from 'axios'
import { envURL } from "../config/environment";



export const logUserClicks = (payload) =>{
    debugger
    let url = envURL+'logUserClick';

    axios.post(url, payload, {withCredentials : true} )
        .then( (response) => {
            console.log(`Logged ${payload} status: ${response.status}`);
        } );
}


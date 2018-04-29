import axios from 'axios'
import { envURL } from "../config/environment";

export const logUserClicks = (payload) =>{
  
    let url = envURL+'logUserClick';

    axios.post(url, payload, {withCredentials : true} )
        .then( (response) => {
            console.log(`Logged ${payload} status: ${response.status}`);
        } );
}



export const logMovieClicks= (payload) =>{

    let url = envURL+'movieClickCount';

    axios.post(url, payload, {withCredentials : true} )
        .then( (response) => {
            console.log(`Logged ${payload} status: ${response.status}`);
        } );
}
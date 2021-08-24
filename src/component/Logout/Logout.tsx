import React from 'react';
import { AuthApiService } from '../../api';
import { JWTToken} from '../../api/authentication/index';
import { getRequestID, getSourceIp } from "../Request_ID/Request_ID";

class Logout extends React.Component {


    constructor(props) {
        super(props);
        // Don't call this.setState() here!

        let token: JWTToken = {
            username: localStorage.getItem('user') || '',
            jwt: localStorage.getItem('jwt') || ''
        }
        
        AuthApiService.resetMfa((localStorage.getItem('user') || ''), (localStorage.getItem('jwt') || ""), "1", "1", token).then((response) => {
            localStorage.clear();
            window.location.href = "/frontend/home";
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (<h2>Empty</h2>);
    }

}


export default Logout;
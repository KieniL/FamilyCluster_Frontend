import React from 'react';
import { AuthApiService } from '../../api';
import { Token} from '../../api/authentication/index';

class Logout extends React.Component {


    constructor(props) {
        super(props);
        // Don't call this.setState() here!

        let token: Token = {
            username: localStorage.getItem('user') || '',
            token: localStorage.getItem('jwt') || ''
            

        }
        AuthApiService.resetMfa((localStorage.getItem('user') || ''), token).then((response) => {
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
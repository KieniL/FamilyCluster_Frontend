import React from 'react';
import { AppApiService } from '../../api';

class RefreshApps extends React.Component {


    constructor(props) {
        super(props);
        // Don't call this.setState() here!

        AppApiService.getAppOfUser((localStorage.getItem('user') || '')).then((response) => {
            var data = response.data;

            localStorage.setItem('apps', JSON.stringify(data));

            window.location.href = "/frontend/home";
        }, (error) => {
            //Redirect User
            console.log(error);
            window.location.href = "/frontend/home";
        });
    }

    render() {
        return (<h2>Empty</h2>);
    }

}


export default RefreshApps;
import React from 'react';
import './Admin.css';
import { AppApiService, AuthApiService, MfaApiService } from '../../api';
import { JWTToken } from '../../api/authentication/index';

class Admin extends React.Component {


    constructor(props) {

        super(props);
        // Don't call this.setState() here!

        AppApiService.getApp('Adminportal', (localStorage.getItem('jwt') || ""), "1", "1").then((response) => {
            var data = response.data

            var allowedUsers = data.allowedUsers;

            //Redirect if User is not in allowedUsers
            if (!(allowedUsers?.includes(localStorage.getItem('user') || ''))) {
                AppApiService.getAppOfUser((localStorage.getItem('user') || ''), (localStorage.getItem('jwt') || ""), "1", "1").then((response) => {
                    var data = response.data;

                    localStorage.setItem('apps', JSON.stringify(data));

                    window.location.href = "/frontend/home";
                }, (error) => {
                    //Redirect User
                    console.log(error);
                    window.location.href = "/frontend/home";
                });

            }

        }, (error) => {
            //Redirect User
            console.log(error);
            window.location.href = "/frontend/home";
        });


        let token: JWTToken = {
            jwt: localStorage.getItem('jwt') || '',
            username: localStorage.getItem('user') || ''
        }


        AuthApiService.verifyToken((localStorage.getItem('jwt') || ""), "1", "1", token).then((responseVerify) => {

            var respdata = responseVerify.data;

            if (respdata.mfaNeeded) {

                var mfaAction = respdata.mfaAction;


                if (mfaAction === "setup") {
                    let mfaSetupToken: JWTToken = {
                        jwt: String(localStorage.getItem('jwt')),
                        username: String(localStorage.getItem('user'))
                    }

                    MfaApiService.mfaSetup((localStorage.getItem('jwt') || ""), "1", "1", mfaSetupToken).then((response) => {
                        var data = (response.data.qrcode || '').split(',');
                        localStorage.setItem('mfaimage', data[1]);



                        window.location.href = "/frontend/mfa/setup";

                    }, (error) => {

                        console.log(error);
                    });


                } else {
                    window.location.href = "/frontend/mfa/verify";
                }

            }

        }, (error) => {
            console.log(error);
        });


    }


    render() {
        return (
            <div>
                <div className="sidenav">
                    <a href="/frontend/admin/registerUser">Register User</a>
                    <a href="/frontend/admin/addApp">Add Application</a>
                    <a href="/frontend/admin/updateApp">Update Application</a>
                </div>
            </div>

        );
    }
}


export default Admin;
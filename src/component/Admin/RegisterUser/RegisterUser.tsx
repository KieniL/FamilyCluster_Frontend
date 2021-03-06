import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthApiService, AppApiService, MfaApiService } from '../../../api';
import { Login as loginModel, JWTToken } from '../../../api/authentication/index';
import { getRequestID, getSourceIp } from "../../Request_ID/Request_ID";


import "./RegisterUser.css";

class RegisterUser extends React.Component {


    state = {
        username: '',
        password: '',
        apps: [],
        isShown: false,
        selectedApps: [] as any,
        passwordShown: false,
        icon: "fas fa-eye-slash",
        message: ''
    };
    apps = [] as any;


    constructor(props) {
        super(props);



        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.setIsNotShown = this.setIsNotShown.bind(this);
        this.setIsShown = this.setIsShown.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);


        

        AppApiService.getApp('Adminportal', (localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
            var data = response.data

            var allowedUsers = data.allowedUsers;

            //Redirect if User is not in allowedUsers
            if (!(allowedUsers?.includes(localStorage.getItem('user') || ''))) {
                AppApiService.getAppOfUser((localStorage.getItem('user') || ''), (localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
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


        AuthApiService.verifyToken((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp(), token).then((responseVerify) => {

            var respdata = responseVerify.data;

            if (respdata.mfaNeeded) {

                var mfaAction = respdata.mfaAction;


                if (mfaAction === "setup") {
                    let mfaSetupToken: JWTToken = {
                        jwt: String(localStorage.getItem('jwt')),
                        username: String(localStorage.getItem('user'))
                    }

                    MfaApiService.mfaSetup((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp(), mfaSetupToken).then((response) => {
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

        AppApiService.getApplications((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
            var data = response.data || '{}';

            data = data!.sort((a, b) => a!.appname!.localeCompare(b!.appname!));


            this.apps = data.map((item) =>
                <div>
                    <label htmlFor={item.appname}>{item.appname}</label>
                    <input type="checkbox" id={item.appname} name={item.appname} onChange={this.handleCheckboxClick} />
                </div>

            );
            this.setState({ apps: data });

        }, (error) => {

            console.log(error);
        });
    }

    handleCheckboxClick(event) {

        if (event.target.checked) {
            this.state.selectedApps.push(event.target.name);
        } else {
            var index = this.state.selectedApps.indexOf(event.target.name)
            if (index !== -1) {
                this.state.selectedApps.splice(index, 1);
                this.setState({ selectedApps: this.state.selectedApps });
            }
        }

    }

    togglePasswordVisiblity() {

        this.state.passwordShown ? this.setState({ passwordShown: false }) :this.setState({ passwordShown: true });
        
        if (this.state.passwordShown) {
            this.setState({ icon: "fas fa-eye-slash" })
        } else {
            this.setState({ icon: "fas fa-eye" })
        }
    };

    setIsShown() {
        this.setState({ isShown: true });
    }

    setIsNotShown() {
        this.setState({ isShown: false });
    }



    handleUserNameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }


    handleSubmit(event) {

        event.preventDefault(); //Use this to stay on same page


        let login: loginModel = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        AuthApiService.register((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp(), login).then((response) => {

            this.state.selectedApps.forEach(function (entry) {
                AppApiService.addUser2App(entry, event.target.username.value, (localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
                }, (error) => {
                    console.log(error);
                });
            });


            this.setState({ isShown: false });

            window.location.href = "/frontend/admin";
        })
        .catch((error) => {
            if( error.response ){
                this.setState({ isShown: true });
                console.log(error.response.data.messages); // => the response payload 
                this.setState({ message: error.response.data.messages });
            }else{
                this.setState({ isShown: true });
                this.setState({ message: "Ein Fehler ist aufgetreten" });
            }
        });
    }



    render() {
        return (
            <div className="registerPage">
                <div>
                    <h1> Add Data</h1>
                </div>

                {this.state.isShown && (
                    <span style={{ color: "red" }}>{this.state.message}</span>
                )}
                <div className="register">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUserNameChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={this.state.passwordShown ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <i onClick={this.togglePasswordVisiblity} className={this.state.icon}></i>
                        </Form.Group>
                        <Form.Group controlId="apps">
                            <Form.Label className="appLabel">Apps</Form.Label>
                            {this.apps}
                        </Form.Group>

                        <Button id="registerUserButton" block size="lg" type="submit" disabled={!this.validateForm()}>
                            Register User
                                    </Button>
                    </Form>
                </div>
            </div >
        )
    }
}



export default RegisterUser;
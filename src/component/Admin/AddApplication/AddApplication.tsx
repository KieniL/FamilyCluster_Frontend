import React  from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AuthApiService, AppApiService, MfaApiService } from '../../../api';
import { Application as App } from '../../../api/application/index';
import { JWTToken } from '../../../api/authentication/index';
import { getRequestID, getSourceIp } from "../../Request_ID/Request_ID";



import "./AddApplication.css";

class AddApplication extends React.Component {


    state = {
        appname: '',
        url: '',
        cssClasses: '',
        users: [],
        isShown: false,
        selectedUsers: [] as any
    };
    users = [] as any;


    constructor(props) {
        super(props);



        this.handleAppNameChange = this.handleAppNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.setIsNotShown = this.setIsNotShown.bind(this);
        this.setIsShown = this.setIsShown.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.handleCSSChange = this.handleCSSChange.bind(this);

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

        AuthApiService.getUsers((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
            var data = response.data;

            data = data!.sort((a, b) => a!.username!.localeCompare(b!.username!));

            this.users = data.map((item) =>
                <div>
                    <label htmlFor={item.username}>{item.username}</label>
                    <input type="checkbox" id={item.id} name={item.username} onChange={this.handleCheckboxClick} />
                </div>

            );
            this.setState({ users: data });

        }, (error) => {

            console.log(error);
        });
    }

    handleCheckboxClick(event) {

        if (event.target.checked) {
            this.state.selectedUsers.push(event.target.name);
        } else {
            var index = this.state.selectedUsers.indexOf(event.target.name)
            if (index !== -1) {
                this.state.selectedUsers.splice(index, 1);
                this.setState({ selectedApps: this.state.selectedUsers });
            }
        }

    }

    setIsShown() {
        this.setState({ isShown: true });
    }

    setIsNotShown() {
        this.setState({ isShown: false });
    }

    handleAppNameChange(event) {
        this.setState({ appname: event.target.value });
    }

    handleURLChange(event) {
        this.setState({ url: event.target.value });
    }

    handleCSSChange(event) {
        this.setState({ cssClasses: event.target.value });
    }

    validateForm() {
        return this.state.appname.length > 0 && this.state.url.length > 0;
    }


    handleSubmit(event) {

        event.preventDefault(); //Use this to stay on same page

        let application : App = {
            appname : event.target.appname.value,
            url : event.target.url.value,
            allowedUsers : this.state.selectedUsers,
            cssClasses: this.state.cssClasses
        };

        AppApiService.addApplication((localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp(), application).then((response) => {
            this.setState({ isShown: false });

            AppApiService.getAppOfUser((localStorage.getItem('user') || ''), (localStorage.getItem('jwt') || ""), getRequestID(), getSourceIp()).then((response) => {
                var data = response.data;

                localStorage.setItem('apps', JSON.stringify(data));

                window.location.href = "/frontend/admin";
            }, (error) => {
                console.log(error);
                window.location.href = "/frontend/admin";
            });

            

        }, (error) => {
            this.setState({ isShown: true });
            console.log(error);
        });
    }



    render() {
        return (
            <div className="addAppPage">
                <div>
                    <h1> Add Data</h1>
                </div>

                {this.state.isShown && (
                    <span style={{ color: "red" }}>Ein Fehler ist aufgetreten</span>
                )}
                <div className="addApp">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="appname">
                            <Form.Label>Appname</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.appname}
                                onChange={this.handleAppNameChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="url">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.url}
                                onChange={this.handleURLChange}
                                placeholder="/test"
                            />
                        </Form.Group>
                        <Form.Group controlId="cssClasses">
                            <Form.Label className="cssLabel">Enter cssClasses</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.cssClasses}
                                onChange={this.handleCSSChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="users">
                            <Form.Label className="userLabel">Users</Form.Label>
                            {this.users}
                        </Form.Group>

                        <Button id="registerApplicationButton" block size="lg" type="submit" disabled={!this.validateForm()}>
                            Register Application
                                    </Button>
                    </Form>
                </div>
            </div >
        )
    }
}

export default AddApplication;
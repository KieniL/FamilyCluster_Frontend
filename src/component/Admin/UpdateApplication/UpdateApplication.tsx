import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AuthApiService, AppApiService, MfaApiService } from '../../../api';
import { UpdateApplication as App } from '../../../api/application/index';
import { Token } from '../../../api/authentication/index';

import "./UpdateApplication.css";

class UpdateApplication extends React.Component {


    state = {
        appname: '',
        url: '',
        cssClasses: '',
        users: [] as any,
        apps: [],
        isShown: false,
        selectedUsers: [] as any,
        selectedCss: '',
        selectedApp: '',
        usersOfSelectedApp: []
    };
    users = [] as any;
    apps = [] as any;
    usersOfSelectedApp = [] as any;


    constructor(props) {
        super(props);

        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

        AppApiService.getApp('Adminportal').then((response) => {
            var data = response.data

            var allowedUsers = data.allowedUsers;

            //Redirect if User is not in allowedUsers
            if (!(allowedUsers?.includes(localStorage.getItem('user') || ''))) {
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

        }, (error) => {
            //Redirect User
            console.log(error);
            window.location.href = "/frontend/home";
        });


        let token: Token = {
            token: localStorage.getItem('jwt') || '',
            username: localStorage.getItem('user') || ''
        }


        AuthApiService.verifyToken(token).then((responseVerify) => {

            var respdata = responseVerify.data;

            if (respdata.mfaNeeded) {

                var mfaAction = respdata.mfaAction;


                if (mfaAction === "setup") {
                    let mfaSetupToken: Token = {
                        token: String(localStorage.getItem('jwt')),
                        username: String(localStorage.getItem('user'))
                    }

                    MfaApiService.mfaSetup(mfaSetupToken).then((response) => {
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

        AppApiService.getApplications().then((response) => {

            var data = response.data;

            data = data!.sort((a, b) => a!.appname!.localeCompare(b!.appname!));

            this.apps = data.map((item) =>
                <option>{item.appname}</option>
            );

            this.setState({ apps: data });

        }, (error) => {

            console.log(error);
        });



        AuthApiService.getUsers().then((response) => {
            var data = response.data;

            data = data!.sort((a, b) => a!.username!.localeCompare(b!.username!));

            this.users = data.map((item) =>
                <div>
                    <label htmlFor={item.username}>{item.username}</label>
                    <input type="checkbox" key={item.username} id={item.username} name={item.username} onChange={this.handleCheckboxClick} />
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
                this.setState({ selectedUsers: this.state.selectedUsers });
            }
        }

    }


    handleCSSChange(event) {
        this.setState({ cssClasses: event.target.value });
    }




    onAppSelectChange(event) {
        this.setState({ selectedApp: event.target.value });

        AppApiService.getApp(event.target.value).then((response) => {
            var data = response.data;

            var users = data.allowedUsers;


            this.setState({usersOfSelectedApp: users});


            this.state.users.forEach(element => {


                var cb = document.getElementById(element.username) as HTMLInputElement || null;

                if (cb != null) {
                    cb.checked = false;
                    var index = this.state.selectedUsers.indexOf(element.username)
                    if (index !== -1) {
                        this.state.selectedUsers.splice(index, 1);
                        this.setState({ selectedApps: this.state.selectedUsers });
                    }
                }
            });

            this.state.usersOfSelectedApp.forEach(element => {

                var cb = document.getElementById(element) as HTMLInputElement || null;

                if (cb != null) {
                    cb.checked = true;
                    if (!this.state.selectedUsers.includes(element)) {
                        this.state.selectedUsers.push(element);
                    }

                }
            });


            this.setState({cssClasses: data.cssClasses});

        }, (error) => {

            console.log(error);
        });
    }

    validateForm() {
        return this.state.selectedApp.length > 0;
    }


    handleSubmit(event) {

        event.preventDefault(); //Use this to stay on same page

        let updateApplication: App = {
            appname : this.state.selectedApp,
            allowedUsers : this.state.selectedUsers,
            cssClasses: this.state.cssClasses,
            jwt: localStorage.getItem('jwt') || ''
        }

        AppApiService.updateApplication(updateApplication).then((response) => {

            AppApiService.getAppOfUser((localStorage.getItem('user') || '')).then((response) => {
                var data = response.data;

                console.log(data);

                localStorage.setItem('apps', JSON.stringify(data));

                window.location.href = "/frontend/admin";
                
            }, (error) => {
                //Redirect User
                console.log(error);
                window.location.href = "/frontend/admin";
            });

        

        }, (error) => {
            console.log(error);
        });
    }



    render() {
        return (
            <div className="updateAppPage">
                <div>
                    <h1> Update Data</h1>
                </div>
                <div className="updateApp">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="apps">
                            <Form.Label className="appLabel">Select an app</Form.Label>
                            <Form.Control as="select" custom onChange={this.onAppSelectChange.bind(this)}>
                                <option value=''></option>
                                {this.apps}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="cssClasses">
                            <Form.Label className="cssLabel">Enter cssClasses</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.cssClasses}
                                onChange={this.handleCSSChange.bind(this)}
                            />
                        </Form.Group>
                        <Form.Group controlId="apps">
                            <Form.Label className="userLabel">Users</Form.Label>
                            {this.users}
                        </Form.Group>

                        <Button id="updateApplicationButton" block size="lg" type="submit" disabled={!this.validateForm()}>
                            Update Application
                                    </Button>
                    </Form>
                </div>
            </div >
        )
    }
}

export default UpdateApplication;
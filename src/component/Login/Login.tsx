import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthApiService } from '../../api';
import { Login as loginModel, JWTToken } from '../../api/authentication/index';
import { MfaApiService } from '../../api';
import "./Login.css";


export default function Login() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShown, setIsShown] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [icon, setIcon] = useState<string>('fas fa-eye-slash');



    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if(passwordShown){
            setIcon("fas fa-eye-slash");
        }else{
            setIcon("fas fa-eye");
        }
    };

    function showError() {
        setIsShown(true);
    }

    function hideError() {
        setIsShown(false);
    }



    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {

        event.preventDefault(); //Use this to stay on same page

        let login: loginModel = {
            username: event.target.username.value,
            password: event.target.password.value
        };


        AuthApiService.authenticate((localStorage.getItem('jwt') || ""), "1", login).then((response) => {
            var data = response.data;
            hideError();


            localStorage.setItem('jwt', data.token);
            localStorage.setItem('apps', JSON.stringify(data.allowedApplicationList));
            localStorage.setItem('user', event.target.username.value);

            let token: JWTToken = {
                jwt: data.token,
                username: event.target.username.value
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

                } else {
                    window.location.href = "/frontend/mfa/verify";
                }

            }, (error) => {

                showError();
                console.log(error);
            });
        }, (error) => {

            showError();
            console.log(error);
        });

    }
    return (
        <div className="loginPage">
            <div>
                <h1> Please Login</h1>
            </div>

            {isShown && (
                <span style={{ color: "red" }}>Username or Password Wrong</span>
            )}
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i onClick={togglePasswordVisiblity} className={icon}></i>
                    </Form.Group>
                    <Button id="loginButton" block size="lg" type="submit" disabled={!validateForm()}>
                        Login
              </Button>
                </Form>
            </div>
        </div>
    )
}


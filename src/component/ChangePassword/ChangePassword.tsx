import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthApiService } from '../../api';
import { Password } from '../../api/authentication/index';
import "./ChangePassword.css";
import { getRequestID, getSourceIp } from "../Request_ID/Request_ID";

export default function ChangePassword() {


    const [password, setPassword] = useState<string>('');
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


    function validateForm() {
        return password.length > 0;
    }


    function handleSubmit(event) {

        event.preventDefault();

        let passwordModel: Password = {
            password: event.target.password.value
        };


        AuthApiService.changePassword((localStorage.getItem('user') || ''), (localStorage.getItem('jwt') || ""), "1", "1", passwordModel).then((response) => {

            window.location.href = "/frontend/home";
        }, (error) => {

            console.log(error);
        });
    }



    return (
        <div className="changePasswordPage">
            <div className="changePassword">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="password" className="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i onClick={togglePasswordVisiblity} className={icon}></i>
                    </Form.Group>
                    <Button id="changePasswordButton" block size="lg" type="submit" disabled={!validateForm()}>
                        Change Password
              </Button>
                </Form>
            </div>
        </div>
    )


}

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MfaApiService } from '../../api';
import "./MFA_Verify.css";
import { MFATokenVerification } from "../../api/authentication";


export default function MFA_Verify() {

    const [token, setToken] = useState<string>('');
    const [isShown, setIsShown] = useState(false);

    function showError() {
        setIsShown(true);
    }

    function hideError() {
        setIsShown(false);
    }



    function handleSubmit(event) {

        event.preventDefault(); //Use this to stay on same page
        localStorage.setItem('mfa_done', 'true');

        let mFATokenVerification: MFATokenVerification = {
            username: localStorage.getItem('user') || '',
            mfaToken: event.target.token.value
        };

        MfaApiService.mfaVerify((localStorage.getItem('jwt') || ""), "1", "1", mFATokenVerification).then((response) => {
            var data = response.data;

            localStorage.setItem('mfa_done', 'true');

            if (data.verificationMessage === "CORRECT CODE"){
                hideError();
                window.location.href = "/frontend/home";
            }else{
                showError();
            }
            
        }, (error) => {

            showError();
            console.log(error);
        });
    }

    function validateForm() {
        return token.length > 0;
    }


    return (
        <div className="mfaVerificationPage">
            <h2>Use the Token from your FreeOTP</h2>
            {isShown && (
                <span style={{ color: "red" }}>Wrong token. Try again.</span>
            )}
            <div className="mfaVerification">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="token">
                        <Form.Label>token</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </Form.Group>
                    <Button id="mfaVerifyButton" block size="lg" type="submit" disabled={!validateForm()}>
                        Submit Token
              </Button>
                </Form>
            </div>
        </div>
    );


}


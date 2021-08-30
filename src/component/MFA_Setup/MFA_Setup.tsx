import React from 'react';
import './MFA_Setup.css';

class MFA_Setup extends React.Component {

    imageSrc = ""


    render() {
        return (
            <div className="mfaSetup">
                <h1>Two Factor Authentication Setup</h1>
                <p>You are almost done! Please start FreeOTP on your smartphone and scan the following QR Code with it:</p>
                <p>Download from <a href="https://itunes.apple.com/us/app/freeotp/id872559395">iTunes</a> | <a href="https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp">Google Play</a></p>
                <p>
                { localStorage.getItem('mfaimage') != null? <img src={`data:image/png;base64,${ localStorage.getItem('mfaimage')}`} alt="mfaQR"/>: ''}</p>
                    <p>I'm done, take me to  <a href="/frontend/mfa/verify">Verify</a> page!</p>
            </div>
        );
    }

}


export default MFA_Setup;
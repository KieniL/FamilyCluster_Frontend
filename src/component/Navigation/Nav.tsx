import React from 'react';
import './Nav.css';

class Navigation extends React.Component {

    navLinkCondition = false;
    navCondition = false;
    linkUrl = "/";
    linkText = "";
    linkHref = "#";
    linkClass = "";
    apps;

    constructor(props) {
        super(props);

        this.apps = JSON.parse("[" + localStorage?.getItem('apps') + "]");

        if (this.apps[0]) {
            this.apps[0] = this.apps[0]!.sort((a, b) => a!.appname!.localeCompare(b!.appname!));
        }

        // Don't call this.setState() here!
        if (localStorage.getItem('jwt') == null) {
            this.linkUrl = "/login";
            this.linkText = "Login";
            this.linkClass = "fas fa-sign-in-alt";
            this.linkHref = "#login";
        } else {
            this.linkUrl = "/frontend/logout";
            this.linkClass = "fas fa-sign-out-alt";
            this.linkText = "Logout";
            this.linkHref = "#logout";
        }
    }

    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="logo">
                        <a id="homelink" href="/home" className="nav-link">
                            <span className="link-text logo-text">Kienast</span>
                            <i className="fas fa-home"></i>
                        </a>
                    </li>


                    {localStorage.getItem('mfa_done') ? this.apps[0]?.map((item) =>
                        <li className="nav-item" key={item.appname}>
                            <a id={item.url} href={item.url} className="nav-link">
                                <i className={item.cssClasses}></i>
                                <span className="link-text">{item.appname}</span>
                            </a>
                        </li>
                    ) : null}

                    {localStorage.getItem('mfa_done') ? (<li className="nav-item">
                        <a id="changePasswordlink" href={"/changePassword/" + localStorage.getItem("user")} className="nav-link">
                            <i className="fas fa-user"></i>
                            <span className="link-text">Change Password</span>
                        </a>
                    </li>) : null}

                    {localStorage.getItem('mfa_done') ? (<li className="nav-item">
                        <a id="refreshAppsLink" href={"/refreshapps/" + localStorage.getItem("user")} className="nav-link">
                            <i className="fas fa-sync"></i>
                            <span className="link-text">Refresh Apps</span>
                        </a>
                    </li>) : null}
                    <li className="nav-item">
                        <a id="userLink" href={this.linkUrl} className="nav-link">
                            <i className={this.linkClass}></i>
                            <span className="link-text">{this.linkText}</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}


export default Navigation;

import React from 'react';
import { CertificationApiService, AuthApiService, MfaApiService } from '../../api';
import './Zertifizierung.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { JWTToken } from '../../api/authentication/index';

class Zertifizierung extends React.Component {


    state = {
        shortname: '',
        description: '',
        dateTo: '',
        dateFrom: '',
        showAddComponent: false,
        table: []
    };
    

    table = [] as any;


    constructor(props) {

        super(props);
        // Don't call this.setState() here!

        


        this.handleShortNameChange = this.handleShortNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleAddHideClick = this.handleAddHideClick.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);



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

        CertificationApiService.getCertifications((localStorage.getItem('jwt') || ""), "1", "1").then((responseCertification) => {
            var data = responseCertification.data;

            this.table = data.map((item) =>
            <tr key={item.shortname}>
                <td>{item.shortname}</td>
                <td>{item.description}</td>
                <td>{item.dateFrom}</td>
                <td>{item.dateTo}</td>
            </tr>
                
            );
            this.setState({ table: data });
        });
    }

    handleSubmit(event) {
        window.location.href = "/frontend/ansparen";
    }

    validateForm() {
        return String(this.state.shortname).length > 0 &&
            String(this.state.description).length > 0 &&
            String(this.state.dateFrom).length > 0 &&
            String(this.state.dateTo).length > 0;
    }
    handleAddClick(event) {
        this.setState({ showAddComponent: true });
    }
    handleAddHideClick(event){
        this.setState({ showAddComponent: false });
    }

    handleShortNameChange(event) {
        this.setState({ shortname: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDateFromChange(event) {
        this.setState({ dateFrom: event.target.value });
    }

    handleDateToChange(event) {
        this.setState({ dateTo: event.target.value });
    }


    render() {
        return (
            <div className="cert">
                <div id="certnav" className="certnav">   
                    {this.state.showAddComponent ?
                    <Button block size="lg" id="hideAddData" className="button certificationaction" onClick={this.handleAddHideClick}>Hide add Action</Button>
                    : <Button block size="lg" id="addData" className="button certificationaction" onClick={this.handleAddClick}>Add new</Button>}
                </div>
                <div className="selection" >
                    {this.state.showAddComponent ?
                        <div className="addNew">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Group controlId="shortname">
                                    <Form.Label>Shortname</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={this.state.shortname}
                                        onChange={this.handleShortNameChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="dateFrom">
                                    <Form.Label>Date von</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={this.state.dateFrom}
                                        onChange={this.handleDateFromChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="dateTo">
                                    <Form.Label>Date Bis</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={this.state.dateTo}
                                        onChange={this.handleDateToChange}
                                    />
                                </Form.Group>
                                <Button id="addCertificationButton" block size="lg" type="submit" disabled={!this.validateForm()}>
                                    Add Certification
                        </Button>
                            </Form>
                        </div>
                        : null}
                </div>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Kürzel</th>
                            <th>Beschreibung</th>
                            <th>Date von</th>
                            <th>Date bis</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.table}
                    </tbody>
                </table>

            </div>

        );
    }
}


export default Zertifizierung;
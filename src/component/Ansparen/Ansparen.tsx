import React from 'react';
import { AppApiService, AnsparenApiService, AuthApiService, MfaApiService } from '../../api';
import { AnsparEntry } from '../../api/ansparen/index';
import './Ansparen.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Chart from "react-google-charts";
import { JWTToken } from '../../api/authentication/index';
import { getRequestID, getSourceIp } from "../Request_ID/Request_ID";
class Ansparen extends React.Component {


    state = {
        showComponent: false,
        showLoadComponent: false,
        showAddComponent: false,
        lukas: 0,
        kathi: 0,
        date: '',
        charts: []
    };

    charts = [] as any;


    constructor(props) {

        super(props);
        // Don't call this.setState() here!

        


        this.handleLukasChange = this.handleLukasChange.bind(this);
        this.handleKathiChange = this.handleKathiChange.bind(this)
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        AppApiService.getApp('Ansparen', (localStorage.getItem('jwt') || ""), "1", "1").then((response) => {
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
            //Redirect UseramountData
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

    handleSubmit(event) {
        event.preventDefault();

        var array = [] as any;

        let entryLukas: AnsparEntry = {
            date: this.state.date,
            description: "Lukas",
            value: this.state.lukas || 0
        }

        let entryKathi: AnsparEntry = {
            date: this.state.date,
            description: "Kathi",
            value: this.state.kathi || 0
        }

        array.push(entryLukas);
        array.push(entryKathi);


        array.forEach(element => {
            AnsparenApiService.addEntry((localStorage.getItem('jwt') || ""), "1", "1", element).then((response) =>  {
            }, (error) => {
                console.log(error);
            });
        });
        


        window.location.href = "/frontend/ansparen";


    }

    validateForm() {
        return String(this.state.lukas).length > 0 &&
            String(this.state.kathi).length > 0;
    }

    handleLukasChange(event) {
        this.setState({ lukas: event.target.value });
    }

    handleKathiChange(event) {
        this.setState({ kathi: event.target.value });
    }

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    handleLoadClick(event) {
        this.setState({ showComponent: true });
        this.setState({ showLoadComponent: true });
        this.setState({ showAddComponent: false });

        AnsparenApiService.getCategories((localStorage.getItem('jwt') || ""), "1", "1").then((response) => {
            var data = response.data
            var array = [] as any;

            
            var headerArray = [] as any;

            headerArray.push('Date');
            headerArray.push('Amount');



            //Parse response in a multi level array
            data.forEach((item) => {

                var itemArray = [] as any;
                itemArray.push(item.description);


                var entryArray = [] as any;
                entryArray.push(headerArray);
                
                item.entries.forEach((entry) => {
                    var amountArray = [] as any;
                    amountArray.push(entry.date);
                    amountArray.push(entry.amount);
                    entryArray.push(amountArray);
                });

                itemArray.push(entryArray);
                array.push(itemArray);
            });


            this.charts = array.map((item) =>
                <div className="chart" key={item[0]}>
                    <Chart
                        height="100%"
                        width="100%"
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={item[1]}
                        options={{
                            allowHtml: true,
                            cssClassNames: {
                              tableCell: 'amount-cell'
                            },
                            showRowNumber: false,
                            title: item[0],
                            hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                            vAxis: { title: 'Amount' },
                            // For the legend to fit, we make the chart area smaller
                            chartArea: { width: '50%', height: '70%' },
                            // lineWidth: 25
                        }}
                    />
                </div>

            );
            this.setState({ charts: data });
        }, (error) => {
            console.log(error);
        });

    }



    handleAddClick(event) {
        this.setState({ showComponent: true });
        this.setState({ showAddComponent: true });
        this.setState({ showLoadComponent: false });
    }


    render() {
        return (
            <div className="ansparen">
                <div id="ansparennav" className="ansparennav">
                    <Button block size="lg" id="loadData" className="button" onClick={this.handleLoadClick}>Load Data</Button>
                    <Button block size="lg" id="addData" className="button" onClick={this.handleAddClick}>Add new</Button>
                </div>
                {this.state.showComponent ?
                    <div className="selection" >
                        {this.state.showAddComponent ?
                            <div className="addNew">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Form.Group controlId="Lukas">
                                        <Form.Label>Lukas</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={this.state.lukas}
                                            onChange={this.handleLukasChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="kathi">
                                        <Form.Label>Kathi</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={this.state.kathi}
                                            onChange={this.handleKathiChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={this.state.date}
                                            onChange={this.handleDateChange}
                                        />
                                    </Form.Group>
                                    <Button id="addAnsparenButton" block size="lg" type="submit" disabled={!this.validateForm()}>
                                        Add Ansparen Data
                            </Button>
                                </Form>
                            </div>
                            : null}
                        {this.state.showLoadComponent ?
                            <div className="loadData">
                                {this.charts}
                            </div>
                            : null}
                    </div>
                    : null}

            </div>

        );
    }
}


export default Ansparen;
import React from 'react';
import { AppApiService, AnsparenApiService, AuthApiService, MfaApiService } from '../../api';
import { AnsparEntry } from '../../api/ansparen/index';
import './Ansparen.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Chart from "react-google-charts";
import { Token } from '../../api/authentication/index';

class Ansparen extends React.Component {


    state = {
        showComponent: false,
        showLoadComponent: false,
        showAddComponent: false,
        denizlang: 0,
        denizkurz: 0,
        bankaustria: 0,
        kathi: 0,
        date: '',
        charts: []
    };

    charts = [] as any;


    constructor(props) {

        super(props);
        // Don't call this.setState() here!

        


        this.handleDenizLangChange = this.handleDenizLangChange.bind(this);
        this.handleDenizKurzChange = this.handleDenizKurzChange.bind(this);
        this.handleBankAustriaChange = this.handleBankAustriaChange.bind(this);
        this.handleKathiChange = this.handleKathiChange.bind(this)
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        AppApiService.getApp('Ansparen').then((response) => {
            var data = response.data

            var allowedUsers = data.allowedUsers;

            //Redirect if User is not in allowedUsers
            if (!(allowedUsers?.includes(localStorage.getItem('user') || ''))) {
                AppApiService.getAppOfUser((localStorage.getItem('user') || '')).then((response) => {
                    var data = response.data;

                    localStorage.setItem('apps', JSON.stringify(data));

                    window.location.href = "/home";
                }, (error) => {
                    //Redirect User
                    console.log(error);
                    window.location.href = "/home";
                });
            }
        }, (error) => {
            //Redirect UseramountData
            console.log(error);
            window.location.href = "/home";
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



                        window.location.href = "/mfa/setup";

                    }, (error) => {

                        console.log(error);
                    });


                } else {
                    window.location.href = "/mfa/verify";
                }

            }

        }, (error) => {
            console.log(error);
        });


    }

    handleSubmit(event) {
        event.preventDefault();

        var array = [] as any;

        let entryBankAustria: AnsparEntry = {
            date: this.state.date,
            description: "Bank Austria",
            value: this.state.bankaustria || 0
        }

        let entryDenizKurz: AnsparEntry = {
            date: this.state.date,
            description: "Denizbank Kurz",
            value: this.state.denizkurz || 0
        }

        let entryDenizLang: AnsparEntry = {
            date: this.state.date,
            description: "Denizbank Lang",
            value: this.state.denizlang || 0
        }

        let entryKathi: AnsparEntry = {
            date: this.state.date,
            description: "Kathi",
            value: this.state.denizlang || 0
        }

        array.push(entryBankAustria);
        array.push(entryDenizKurz);
        array.push(entryDenizLang);
        array.push(entryKathi);


        array.forEach(element => {
            AnsparenApiService.addEntry(element).then((response) =>  {
            }, (error) => {
                console.log(error);
            });
        });
        


        window.location.href = "/ansparen";


    }

    validateForm() {
        return String(this.state.denizlang).length > 0 &&
            String(this.state.denizkurz).length > 0 &&
            String(this.state.bankaustria).length > 0;
    }

    handleDenizLangChange(event) {
        this.setState({ denizlang: event.target.value });
    }

    handleDenizKurzChange(event) {
        this.setState({ denizkurz: event.target.value });
    }

    handleBankAustriaChange(event) {
        this.setState({ bankaustria: event.target.value });
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

        AnsparenApiService.getCategories().then((response) => {
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
                                    <Form.Group controlId="denizlang">
                                        <Form.Label>Deniz Lang</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={this.state.denizlang}
                                            onChange={this.handleDenizLangChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="denizkurz">
                                        <Form.Label>Deniz Kurz</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={this.state.denizkurz}
                                            onChange={this.handleDenizKurzChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="bankaustria">
                                        <Form.Label>Bankaustria</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={this.state.bankaustria}
                                            onChange={this.handleBankAustriaChange}
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import MultiplexForm from './MultiplexForm'



class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('adminEmail') ? localStorage.getItem('adminEmail') : '',
            password: '',
            addMovie: false,
            addMultiplex: false,
            addMultiplexAdmin: false,
            addDashboard: true,
            addUserTracking: false,
        };
    }

    componentWillMount() {
        let url = 'http://localhost:3001/api/idLoggedIn';
        axios.get(url, { withCredentials: true })
            .then(res => {
                if (res.data.responseCode === 1) {
                    this.props.history.push('/dashboard')
                }
                else {
                    this.props.history.push('/')
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

    handleLinkClick = (e) => {
        e.preventDefault();
        this.setState({
            addDashboard: e.currentTarget.value == 1,
            addUserTracking: e.currentTarget.value == 2,
            addMovie: e.currentTarget.value == 3,
            addMultiplex: e.currentTarget.value == 4,
            addMultiplexAdmin: e.currentTarget.value == 5,
        })
        console.log(this.state);
    }

    handleSubmit(e) {
        e ? e.preventDefault() : ''
        if (this.refs.remember_me.checked) {
            localStorage.setItem();
        }
        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            alert('Invalid Email')
            return;
        }
        if (!(this.state.password.length >= 6)) {
            alert('Invalid Password')
            return;
        }
        alert('allow login')

    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }
    render() {
        let addUserTracking = 2;
        let addDashboard = 1;
        let addMovie = 3;
        let addMultiplex = 4;
        let addMultiplexAdmin = 5;
        var abc = require('../images/fandango_logo.png' + '')
        return (
            <body class="sticky-footer bg-dark fixed-nav" id="page-top">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                    <a class="navbar-brand" href="index.html">
                        {/* <img className='logo mb-5' src={abc} alt='IMG' width='auto' height='45px' /> */}
                        Fandango Admin
                    </a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
                            <li class="nav-item" value={addDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
                                <a class="nav-link" href="index.html">
                                    <i class="fa fa-fw fa-dashboard"></i>
                                    <span class="nav-link-text">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Charts">
                                <a class="nav-link" href="charts.html">
                                    <i class="fa fa-fw fa-area-chart"></i>
                                    <span class="nav-link-text">User Tracking</span>
                                </a>
                            </li>
                            <li class="nav-item" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#" >
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Add Multiplex Admin</span>
                                </a>
                            </li>
                            <li class="nav-item" value={addMultiplex} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#" >
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Add Multiplex</span>
                                </a>
                            </li>
                            <li class="nav-item" value={addMovie} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#">
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Add Movie</span>
                                </a>
                            </li>

                        </ul>
                        <ul class="navbar-nav sidenav-toggler">
                            <li class="nav-item">
                                <a class="nav-link text-center" id="sidenavToggler">
                                    <i class="fa fa-fw fa-angle-left"></i>
                                </a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item">
                                <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fa fa-fw fa-sign-out"></i>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.state.addMovie ? this.returnMovie() : ''}
                {this.state.addMultiplexAdmin ? this.returnMultiplexAdmin() : ''}
                {this.state.addMultiplex ? this.returnMultiplex() : ''}
                {this.state.addDashboard ? this.returnDashboard() : ''}
                {this.state.addUserTracking ? this.returnMultiplex() : ''}
            </body>)
    }

    returnDashboard() {
        return (<div class="content-wrapper">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Dashboard</a>
                    </li>
                </ol>
                <h1>Dashboard</h1>
                <hr />
                <div class="row">
                    <div class="col-6">.col-6</div>
                    <div class="col-6">.col-6</div>
                </div>
                <div class="row">
                    <div class="col-6">.col-6</div>
                    <div class="col-6">.col-6</div>
                </div>

                <div class="row">
                    <div class="col-6">.col-6</div>
                    <div class="col-6">.col-6</div>
                </div>
            </div></div>
        )
    }
    returnMovie() {
        return (
            <div class="content-wrapper">
                <div class="container-fluid">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Add Movie</li>
                    </ol>
                    <h1>Add Movie</h1>
                    <hr />
                    <p>The SB Admin navbar can be either fixed or static, and it supports the navbar-light and navbar-dark Bootstrap 4 classes.</p>
                    <a class="btn btn-primary" href="#" id="toggleNavPosition">Toggle Fixed/Static Navbar</a>
                    <a class="btn btn-primary" href="#" id="toggleNavColor">Toggle Navbar Color</a>
                    {/* <div style="height: 1000px;"></div> */}
                </div>
            </div>
        )
    }

    returnMultiplexAdmin() {
        return (
            <div class="content-wrapper">
                <div class="container-fluid">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Add Multiplex Admin</li>
                    </ol>
                    <h1>Add Multiplex Admin</h1>
                    <hr />
                    <p>The SB Admin navbar can be either fixed or static, and it supports the navbar-light and navbar-dark Bootstrap 4 classes.</p>
                    <a class="btn btn-primary" href="#" id="toggleNavPosition">Toggle Fixed/Static Navbar</a>
                    <a class="btn btn-primary" href="#" id="toggleNavColor">Toggle Navbar Color</a>
                    {/* <div style="height: 1000px;"></div> */}
                </div>
            </div>
        )
    }


    returnMultiplex() {
        return (
            <div class="content-wrapper">
                <div class="container-fluid">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Multiplex</li>
                    </ol>
                    <MultiplexForm />
                </div>

            </div>
        )
    }

}

export default withRouter(AdminDashboard);
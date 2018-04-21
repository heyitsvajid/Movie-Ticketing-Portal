import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import MultiplexForm from './MultiplexForm'
import MovieForm from './MovieForm'
import ShowTimingsForm from './ShowTimingsForm'
import MultiplexAdminForm from './MultiplexAdmin'
import { envURL } from "../config/environment";




class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            addMovie: false,
            addMultiplex: false,
            addMultiplexAdmin: false,
            addDashboard: true,
            addUserTracking: false,
            showTimings: false,
            isLoggedIn: false,
            adminEmail: '',
            adminId: '',
            roleId: ''
        };
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentWillMount() {
        axios.get(envURL + 'isLoggedIn', { withCredentials: true })
            .then((response) => {
                console.log("After checking the session", response.data);
                if (response.data.session === 'valid') {
                    this.setState({
                        isLoggedIn: true,
                        adminEmail: response.data.result.email,
                        adminId: response.data.result.id,
                        roleId: response.data.result.role_number
                    }, () => {
                        console.log("Admin Email:", this.state.adminEmail);
                        console.log("Admin ID:", this.state.adminId);
                        if(this.state.roleId==3){
                            localStorage.setItem('admin_name','Fandango Admin')
                        }
                        else{
                            localStorage.setItem('admin_name','Admin')     
                        }
                        //From Vajid : Never remove this setState from here 
                        this.setState({
                            admin_name:localStorage.getItem('admin_name')
                        })
                        localStorage.setItem('roleId',this.state.roleId)
                        localStorage.setItem('adminId',this.state.adminId)
                    })
                }
                else{
                    this.setState({
                        isLoggedIn: false
                    }, () => {
                        this.props.history.push('/');
                    })
                }
            })
    }

    handleLinkClick = (e) => {
        e.preventDefault();
        this.setState({
            addDashboard: e.currentTarget.value == 1,
            addUserTracking: e.currentTarget.value == 2,
            addMovie: e.currentTarget.value == 3,
            addMultiplex: e.currentTarget.value == 4,
            addMultiplexAdmin: e.currentTarget.value == 5,
            showTimings: e.currentTarget.value == 6,

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
        let showTimings = 6;
        return (
            <body class="sticky-footer bg-dark fixed-nav" id="page-top">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                    <a class="navbar-brand" href="index.html">
                        {/* <img className='logo mb-5' src={abc} alt='IMG' width='auto' height='45px' /> */}
                        {localStorage.getItem('admin_name')}
                    </a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
                        {localStorage.getItem('roleId')==3?
                            <li class="nav-item" value={addDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
                                <a class="nav-link" href="index.html">
                                    <i class="fa fa-fw fa-dashboard"></i>
                                    <span class="nav-link-text">Analytics Dashboard</span>
                                </a>
                            </li>:''}
                            {localStorage.getItem('roleId')==3?
                            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Charts">
                                <a class="nav-link" href="charts.html">
                                    <i class="fa fa-fw fa-area-chart"></i>
                                    <span class="nav-link-text">User Tracking Dashboard</span>
                                </a>
                            </li>:''}
                            {localStorage.getItem('roleId')==3?
                            <li class="nav-item" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#" >
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Multiplex Admin Dashboard</span>
                                </a>
                            </li>:''}                          
                            {localStorage.getItem('roleId')==3?
                            <li class="nav-item" value={addMultiplex} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#" >
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Multiplex Dashboard</span>
                                </a>
                            </li>:''}
                            <li class="nav-item" value={addMovie} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="nav-link" href="#">
                                    <i class="fa fa-fw fa-link"></i>
                                    <span class="nav-link-text">Movie Dashboard</span>
                                </a>
                            </li>

                            {localStorage.getItem('roleId') == '2' ?
                                <li class="nav-item" value={showTimings} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                    <a class="nav-link" href="#">
                                        <i class="fa fa-fw fa-link"></i>
                                        <span class="nav-link-text">Show Timing Dashboard</span>
                                    </a>
                                </li>
                                : ''}

                        </ul>

                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item">
                                <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.state.addMovie ? this.returnMovie() : ''}
                {this.state.addMultiplexAdmin ? this.returnMultiplexAdmin() : ''}
                {this.state.addMultiplex ? this.returnMultiplex() : ''}
                {this.state.addDashboard ? this.returnDashboard() : ''}
                {this.state.addUserTracking ? this.returnMultiplex() : ''}
                {this.state.showTimings ? this.returnShowTimings() : ''}
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
                        <li >
                            <a href="#">Movie Dashboard</a>
                        </li>
                    </ol>
                    <MovieForm />
                </div>

            </div>
        )
    }
    returnShowTimings() {
        return (
            <div class="content-wrapper">
                <div class="container-fluid">
                    <ol class="breadcrumb">
                        <li >
                            <a href="#">Show Timings Dashboard</a>
                        </li>
                    </ol>
                    <ShowTimingsForm />
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
                            <a href="#">Multiplex Admin Dashboard</a>
                        </li>
                    </ol>
                    <MultiplexAdminForm />
                </div>

            </div>)
    }


    returnMultiplex() {
        return (
            <div class="content-wrapper">
                <div class="container-fluid">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Multiplex Dashboard</a>
                        </li>
                    </ol>
                    <MultiplexForm />
                </div>

            </div>
        )
    }

    handleLogout() {
        //alert("In handleLogout");
        axios.post(envURL + 'logout', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                if(response.data.session === 'logged out') {
                    this.setState({
                        isLoggedIn: false
                    }, () => {
                        localStorage.clear();
                        this.props.history.push('/');
                    })
                }
            })
    }
  

}

export default withRouter(AdminDashboard);
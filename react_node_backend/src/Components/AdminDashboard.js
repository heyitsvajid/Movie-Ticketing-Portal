import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import MultiplexForm from './MultiplexForm'
import MovieForm from './MovieForm'
import ShowTimingsForm from './ShowTimingsForm'
import MultiplexAdminForm from './MultiplexAdmin'
import { envURL, reactURL } from "../config/environment";
import AllBillingDetails from './AllBillingDetails';
import ListAllUsers from './ListAllUsers'

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            addMovie: false,
            addMultiplex: false,
            addMultiplexAdmin: false,
            addDashboard: false,
            addUserTracking: false,
            showTimings: false,
            showBillingDetails: false,
            listUsers: true,
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
                    if(response.data.result.role_number === 1)
                        this.props.history.push('/');
                    else {
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
            showBillingDetails: e.currentTarget.value == 7,
            listUsers: e.currentTarget.value == 8

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
        let showBillingDetails = 7
        let listUsers = 8
        return (
            // <body class="sticky-footer bg-dark fixed-nav" id="page-top">
            //     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            //         <a class="navbar-brand" href="index.html">
                        
            //             {localStorage.getItem('admin_name')}
            //         </a>
            //         <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            //             <span class="navbar-toggler-icon"></span>
            //         </button>
            //         <div class="collapse navbar-collapse" id="navbarResponsive">
            //             <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            //                 <li class="nav-item" value={addDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
            //                     <a class="nav-link" href="index.html">
            //                         <i class="fa fa-fw fa-dashboard"></i>
            //                         <span class="nav-link-text">Analytics Dashboard</span>
            //                     </a>
            //                 </li>
            //                 {localStorage.getItem('roleId')==3?
            //                 <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Charts">
            //                     <a class="nav-link" href="charts.html">
            //                         <i class="fa fa-fw fa-area-chart"></i>
            //                         <span class="nav-link-text">User Tracking Dashboard</span>
            //                     </a>
            //                 </li>:''}
            //                 {localStorage.getItem('roleId')==3?
            //                 <li class="nav-item" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
            //                     <a class="nav-link" href="#" >
            //                         <i class="fa fa-fw fa-link"></i>
            //                         <span class="nav-link-text">Multiplex Admin Dashboard</span>
            //                     </a>
            //                 </li>:''}                          
            //                 {localStorage.getItem('roleId')==3?
            //                 <li class="nav-item" value={addMultiplex} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
            //                     <a class="nav-link" href="#" >
            //                         <i class="fa fa-fw fa-link"></i>
            //                         <span class="nav-link-text">Multiplex Dashboard</span>
            //                     </a>
            //                 </li>:''}
            //                 <li class="nav-item" value={addMovie} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
            //                     <a class="nav-link" href="#">
            //                         <i class="fa fa-fw fa-link"></i>
            //                         <span class="nav-link-text">Movie Dashboard</span>
            //                     </a>
            //                 </li>

            //                 {localStorage.getItem('roleId') == '2' ?
            //                     <li class="nav-item" value={showTimings} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
            //                         <a class="nav-link" href="#">
            //                             <i class="fa fa-fw fa-link"></i>
            //                             <span class="nav-link-text">Show Timing Dashboard</span>
            //                         </a>
            //                     </li>
            //                     : ''}

            //             </ul>

            //             <ul class="navbar-nav ml-auto">

            //                 <li class="nav-item">
            //                     <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
            //                 </li>
            //             </ul>
            //         </div>
            //     </nav>
            //     {this.state.addMovie ? this.returnMovie() : ''}
            //     {this.state.addMultiplexAdmin ? this.returnMultiplexAdmin() : ''}
            //     {this.state.addMultiplex ? this.returnMultiplex() : ''}
            //     {this.state.addDashboard ? this.returnDashboard() : ''}
            //     {this.state.addUserTracking ? this.returnMultiplex() : ''}
            //     {this.state.showTimings ? this.returnShowTimings() : ''}
            // </body>
            <body class="app" id="admin-pages">
                <div id="loader" class="fadeOut">
                    <div class="spinner"></div>
                </div>
                
                <div>
                    <div class="sidebar">
                        <div class="sidebar-inner">
                            <div class="sidebar-logo">
                                <div class="peers ai-c fxw-nw">
                                    <div class="peer peer-greed">
                                        <a class="sidebar-link td-n" href="https://colorlib.com/polygon/adminator/index.html">
                                            <div class="peers ai-c fxw-nw">
                                            <div class="peer">
                                                <div class="logo"><img src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png" alt="" /></div>
                                            </div>
                                            <div class="peer peer-greed">
                                                <h5 class="admin-head lh-1 mB-0 logo-text">Adminator</h5>
                                            </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="peer">
                                        <div class="mobile-toggle sidebar-toggle"><a href="" class="td-n"><i class="ti-arrow-circle-left"></i></a></div>
                                    </div>
                                </div>
                            </div>
                            
                            <ul class="sidebar-menu scrollable pos-r ps">
                            <li class="nav-item mT-30 active"><a class="sidebar-link" href="https://colorlib.com/polygon/adminator/index.html" default=""><span class="icon-holder"><i class="c-blue-500 ti-home"></i> </span><span class="title">Dashboard</span></a></li>
                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-pink-500 ti-palette"></i> 
                                        </span><span class="title">Multiplex Admin Dashboard
                                    </span>
                                </a>
                            </li> : ''}
                            
                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addMovie} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMovie} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-blue-500 ti-share"></i> 
                                        </span><span class="title">Movie Dashboard</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addMultiplex} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMultiplex} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-red-500 ti-files"></i> 
                                        </span><span class="title">Multiplex Dashboard</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==2 ?
                            <li class="nav-item" value={showTimings} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={showTimings} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-teal-500 ti-view-list-alt"></i> 
                                        </span><span class="title">Show Timing Dashboard</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={showBillingDetails} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={showBillingDetails} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-orange-500 ti-layout-list-thumb"></i> 
                                        </span><span class="title">Show Billing Details</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={listUsers} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={listUsers} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-teal-500 ti-view-list-alt"></i> 
                                        </span><span class="title">Show List Users</span>
                                </a>
                            </li> : ''}

                            <li class="nav-item"><a class="sidebar-link" href="calendar.html"><span class="icon-holder"><i class="c-deep-orange-500 ti-calendar"></i> </span><span class="title">Calendar</span></a></li>
                            <li class="nav-item"><a class="sidebar-link" href="chat.html"><span class="icon-holder"><i class="c-deep-purple-500 ti-comment-alt"></i> </span><span class="title">Chat</span></a></li>
                            <li class="nav-item"><a class="sidebar-link" href="charts.html"><span class="icon-holder"><i class="c-indigo-500 ti-bar-chart"></i> </span><span class="title">Charts</span></a></li>
                            <li class="nav-item"><a class="sidebar-link" href="forms.html"><span class="icon-holder"><i class="c-light-blue-500 ti-pencil"></i> </span><span class="title">Forms</span></a></li>
                            <li class="nav-item dropdown"><a class="sidebar-link" href="ui.html"><span class="icon-holder"><i class="c-pink-500 ti-palette"></i> </span><span class="title">UI Elements</span></a></li>
                            <li class="nav-item dropdown">
                                <a class="dropdown-toggle" href="javascript:void(0);"><span class="icon-holder"><i class="c-orange-500 ti-layout-list-thumb"></i> </span><span class="title">Tables</span> <span class="arrow"><i class="ti-angle-right"></i></span></a>
                                <ul class="dropdown-menu">
                                    <li><a class="sidebar-link" href="basic-table.html">Basic Table</a></li>
                                    <li><a class="sidebar-link" href="datatable.html">Data Table</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="dropdown-toggle" href="javascript:void(0);"><span class="icon-holder"><i class="c-purple-500 ti-map"></i> </span><span class="title">Maps</span> <span class="arrow"><i class="ti-angle-right"></i></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="google-maps.html">Google Map</a></li>
                                    <li><a href="vector-maps.html">Vector Map</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="dropdown-toggle" href="javascript:void(0);"><span class="icon-holder"><i class="c-red-500 ti-files"></i> </span><span class="title">Pages</span> <span class="arrow"><i class="ti-angle-right"></i></span></a>
                                <ul class="dropdown-menu">
                                    <li><a class="sidebar-link" href="404.html">404</a></li>
                                    <li><a class="sidebar-link" href="500.html">500</a></li>
                                    <li><a class="sidebar-link" href="signin.html">Sign In</a></li>
                                    <li><a class="sidebar-link" href="signup.html">Sign Up</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="dropdown-toggle" href="javascript:void(0);"><span class="icon-holder"><i class="c-teal-500 ti-view-list-alt"></i> </span><span class="title">Multiple Levels</span> <span class="arrow"><i class="ti-angle-right"></i></span></a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item dropdown"><a href="javascript:void(0);"><span>Menu Item</span></a></li>
                                    <li class="nav-item dropdown">
                                        <a href="javascript:void(0);"><span>Menu Item</span> <span class="arrow"><i class="ti-angle-right"></i></span></a>
                                        <ul class="dropdown-menu">
                                        <li><a href="javascript:void(0);">Menu Item</a></li>
                                        <li><a href="javascript:void(0);">Menu Item</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div class="page-container">
                        <div id = "admin-header" class="header navbar">
                            <div class="header-container">
                            <ul class="nav-left">
                                {/* <li><a id="sidebar-toggle" class="sidebar-toggle" href="javascript:void(0);"><i class="ti-menu"></i></a></li>
                                <li class="search-box"><a class="search-toggle no-pdd-right" href="javascript:void(0);"><i class="search-icon ti-search pdd-right-10"></i> <i class="search-icon-close ti-close pdd-right-10"></i></a></li>
                                <li class="search-input"><input class="form-control" type="text" placeholder="Search..." /></li> */}
                            </ul>
                            <ul class="nav-right">
                                {/* <li class="notifications dropdown">
                                    <span class="counter bgc-red">3</span> <a href="" class="dropdown-toggle no-after" data-toggle="dropdown"><i class="ti-bell"></i></a>
                                    <ul class="dropdown-menu">
                                        <li class="pX-20 pY-15 bdB"><i class="ti-bell pR-10"></i> <span class="fsz-sm fw-600 c-grey-900">Notifications</span></li>
                                        <li>
                                        <ul class="ovY-a pos-r scrollable lis-n p-0 m-0 fsz-sm ps">
                                            <li>
                                                <a href="" class="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100">
                                                    <div class="peer mR-15"><img class="w-3r bdrs-50p" src="https://randomuser.me/api/portraits/men/1.jpg" alt=""/></div>
                                                    <div class="peer peer-greed">
                                                    <span><span class="fw-500">John Doe</span> <span class="c-grey-600">liked your <span class="text-dark">post</span></span></span>
                                                    <p class="m-0"><small class="fsz-xs">5 mins ago</small></p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" class="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100">
                                                    <div class="peer mR-15"><img class="w-3r bdrs-50p" src="https://randomuser.me/api/portraits/men/2.jpg" alt=""/></div>
                                                    <div class="peer peer-greed">
                                                    <span><span class="fw-500">Moo Doe</span> <span class="c-grey-600">liked your <span class="text-dark">cover image</span></span></span>
                                                    <p class="m-0"><small class="fsz-xs">7 mins ago</small></p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" class="peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100">
                                                    <div class="peer mR-15"><img class="w-3r bdrs-50p" src="https://randomuser.me/api/portraits/men/3.jpg" alt=""/></div>
                                                    <div class="peer peer-greed">
                                                    <span><span class="fw-500">Lee Doe</span> <span class="c-grey-600">commented on your <span class="text-dark">video</span></span></span>
                                                    <p class="m-0"><small class="fsz-xs">10 mins ago</small></p>
                                                    </div>
                                                </a>
                                            </li>
                                            <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                                                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                            </div>
                                            <div class="ps__rail-y" style="top: 0px; right: 0px;">
                                                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                            </div>
                                        </ul>
                                        </li>
                                        <li class="pX-20 pY-15 ta-c bdT"><span><a href="" class="c-grey-600 cH-blue fsz-sm td-n">View All Notifications <i class="ti-angle-right fsz-xs mL-10"></i></a></span></li>
                                    </ul>
                                </li>
                                <li class="notifications dropdown">
                                    <span class="counter bgc-blue">3</span> <a href="" class="dropdown-toggle no-after" data-toggle="dropdown"><i class="ti-email"></i></a>
                                    
                                </li> */}
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
                                        <div class="peer mR-10"><img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt=""/></div>
                                        <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
                                    </a>
                                    <ul class="dropdown-menu fsz-sm">
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-settings mR-10"></i> <span>Setting</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-user mR-10"></i> <span>Profile</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-email mR-10"></i> <span>Messages</span></a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-power-off mR-10"></i> <span>Logout</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <main class="main-content bgc-grey-100">
                            <div id="mainContent">
                            {this.state.addMovie ? this.returnMovie() : ''}
                            {this.state.addMultiplexAdmin ? this.returnMultiplexAdmin() : ''}
                            {this.state.addMultiplex ? this.returnMultiplex() : ''}
                            {this.state.addDashboard ? this.returnDashboard() : ''}
                            {this.state.addUserTracking ? this.returnMultiplex() : ''}
                            {this.state.showTimings ? this.returnShowTimings() : ''}
                            {this.state.showBillingDetails ? this.returnBillingDetails() : ''}
                            {this.state.listUsers ? this.returnUserList() : ''}
                            </div>
                        </main>
                        <footer class="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
                            <span>Copyright © 2018 Designed by <a href="https://fandango.com" target="_blank" title="FandangoAdmin">FandangoAdmin</a>. All rights reserved.</span>

                        </footer>
                    </div>
                </div>
                <script type="text/javascript" src="./vendor.js"></script><script type="text/javascript" src="./bundle.js"></script>
                </body>
            )
    }

    returnDashboard() {
        return (<div class="content-wrapper">
            <div class="container-fluid">
                {/* <ol class="breadcrumb">
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
                </div> */}
            </div></div>
        )
    }
    returnMovie() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Movie Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <MovieForm />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnUserList() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">User Details Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <ListAllUsers />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnBillingDetails() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Movie Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <AllBillingDetails />
                    </div>
                </div>
            </div>            
        </div>
        )
    }


    returnShowTimings() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Show Timings Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                        <ShowTimingsForm />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnMultiplexAdmin() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Multiplex Admin Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                        <MultiplexAdminForm />
                    </div>
                </div>
            </div>            
        </div>
            )
    }


    returnMultiplex() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Multiplex Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                        <MultiplexForm />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    handleLogout() {
        //alert("In handleLogout");
        localStorage.clear();
        axios.post(envURL + 'logout', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                // if(response.data.session === 'logged out') {
                    this.setState({
                        isLoggedIn: false
                    }, () => {
                        this.props.history.push('/');
                    })
                // }
            })
    }
}

export default withRouter(AdminDashboard);
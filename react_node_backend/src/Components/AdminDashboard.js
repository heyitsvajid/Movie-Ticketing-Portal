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
import AdminGraphs from './AdminGraphs';
import MultiplexAdminGraph from './MultiplexAdminGraph'
import ShowMultiplexBillings from './ShowMultiplexBillings'

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
            showMultiplexGraphDashboard: false,
            showMultiplexBillings: false,
            listUsers: false,
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
                                this.setState({addDashboard: true})
                            }
                            else{
                                if(this.state.roleId == 2){
                                    this.setState({showMultiplexGraphDashboard: true})
                                }
                                localStorage.setItem('admin_name','Admin')
                            }
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
            listUsers: e.currentTarget.value == 8,
            showMultiplexGraphDashboard: e.currentTarget.value == 9,
            showMultiplexBillings: e.currentTarget.value == 0
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
        let showBillingDetails = 7;
        let listUsers = 8;
        let showMultiplexGraphDashboard = 9;
        let showMultiplexBillings = 0;
        return (
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
                                                <h5 class="admin-head lh-1 mB-0 logo-text">Administrator</h5>
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

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-indigo-500 ti-bar-chart"></i> 
                                        </span><span class="title">Dashboard
                                    </span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==2 ?
                            <li class="nav-item" value={showMultiplexGraphDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={showMultiplexGraphDashboard} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-indigo-500 ti-bar-chart"></i> 
                                        </span><span class="title">Dashboard
                                    </span>
                                </a>
                            </li> : ''}

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

                            {localStorage.getItem('roleId')==2 ?
                            <li class="nav-item" value={showMultiplexBillings} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={showMultiplexBillings} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-orange-500 ti-layout-list-thumb"></i> 
                                        </span><span class="title">Show Multiplex Billing Details</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={listUsers} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={listUsers} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-teal-500 ti-view-list-alt"></i> 
                                        </span><span class="title">Show Users List</span>
                                </a>
                            </li> : ''}

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
                                        <div class="peer mR-10"><img class="w-2r bdrs-50p" src="https://lh3.googleusercontent.com/D5AU3S7KdruENbWx12-s9mJZFloRHJO1RRUzogcVS0n0S8GHXdYrtCmbGLav0EI4t5AH-EJ_itF0ZA=w511-h512-rw-no" alt=""/></div>
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
                            {this.state.showMultiplexGraphDashboard ? this.returnMultiplexGraph() : ''}
                            {this.state.showMultiplexBillings ? this.returnMultiplexBillings(): ''}
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
        return (
            <div class="container-fluid">
            <h3 class="data-header">Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <AdminGraphs />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnMultiplexGraph() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <MultiplexAdminGraph />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnMultiplexBillings() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">All Multiplex Billings</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <ShowMultiplexBillings />
                    </div>
                </div>
            </div>            
        </div>
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
            <h3 class="data-header">All Billing Details</h3>
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
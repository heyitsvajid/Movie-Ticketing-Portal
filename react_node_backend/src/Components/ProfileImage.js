import React, { Component } from 'react';
import axios, { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import '../assets/css/admin.css'

class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requireImagePath: '',
            file: '',
            imagePreviewUrl: '',
            successMessage: '',
            errorMessage: '',
            name: '',
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillMount() {
        let url = envURL + 'getprofiledetails';
        let userid = localStorage.getItem('userid');
        if (userid !== null) {

            axios.post(url, { userid }, { withCredentials: true })
                .then((response) => {
                    debugger
                    console.log("Response from DB in get profiledetails", response.data);
                    if(response.data.data.image_path){
                        this.setState({
                            requireImagePath: response.data.data.image_path,
                        })    
                    }
                })
        }
        else {
            swal("Please login first to view your profile", "", "warning");
            this.props.history.push('/');
        }



        // let getprofileImageAPI = envURL + 'getProfileImage';
        // let id = localStorage.getItem('id');
        // if (id) {
        //   var apiPayload = {
        //     id: id
        //   }
        //   axios.post(getprofileImageAPI, apiPayload)
        //     .then(res => {
        //       console.log(res.data);
        //       if (res.data.errorMsg != '') {
        //         console.log('No Image Found');
        //       } else {
        //         this.setState({
        //           requireImagePath: res.data.data.src
        //         });
        //       }
        //     })
        //     .catch(err => {
        //       console.error(err);
        //     });
        //}
    }
    renderRows() {
        if (this.state.errorMessage != '') {
            return (
                <p class="text-danger" >{this.state.errorMessage}</p>
            );
        } else if (this.state.successMessage != '') {
            return (
                <p class="alert alert-success" >{this.state.errorMessage}</p>
            );
        }
    }

    _handleSubmit(e) {
        debugger
        e.preventDefault();
        let uploadAPI = envURL + 'updateUserImage';
        const formData = new FormData();
        let user_id = localStorage.getItem('userid')
        if (user_id && this.state.file) {
            formData.append('file', this.state.file);
            formData.append('user_id', user_id);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            var that = this;
            post(uploadAPI, formData, config).then(function (res) {
                if (res.data.errorMsg != '') {
                    swal({
                        type: 'error',
                        text: res.data.errorMsg,
                    })
                } else if (res.data.successMsg != '') {
                    swal({
                        type: 'success',
                        text: res.data.successMsg,
                    })
                    that.setState({
                        file: '',
                        imagePreviewUrl: '',
                        name: '',
                    });

                }
            });
        }
        else {
            swal({
                type: 'error',
                text: 'Please provide Name and Image',
            })

        }
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)


    }

    renderImage() {
        let requireImagePath = this.state.requireImagePath;
        let imagePreviewUrl = this.state.imagePreviewUrl;
        if (imagePreviewUrl) {
            return <img alt="" class="avatar img-circle" src={this.state.imagePreviewUrl} width='200px' height='200px' />;
        } else if (requireImagePath != '') {
            var abc = require('../images/' + requireImagePath);
            return <img alt="" class="avatar img-circle" src={abc} width='200px' height='200px' />;
        }
        else {
            return <img alt="" src="http://www.investeqcapital.com/images/tlpteam/no-image.png" class="avatar img-circle" width='200px' height='200px' />
        }

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }


    render() {


        return (
                    <form id="dashboard-form" onSubmit={this._handleSubmit}>
                        {this.renderImage()}
                        <br/><hr/><br/>
                            <input id="file-upload" type="file" onChange={this._handleImageChange} />
                            <div class="large-6 columns right-25">
                        <a id="save-email" class="btn save-button" onClick={this._handleSubmit}>Save</a>
                        </div>
                    </form>

        )
    }

}

export default withRouter(ProfileImage);
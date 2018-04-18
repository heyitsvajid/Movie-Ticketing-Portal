import React, { Component } from 'react';
import axios, { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import '../assets/css/admin.css'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let getprofileImageAPI = envURL + 'getProfileImage';
    let id = localStorage.getItem('id');
    if (id) {
      var apiPayload = {
        id: id
      }
      axios.post(getprofileImageAPI, apiPayload)
        .then(res => {
          console.log(res.data);
          if (res.data.errorMsg != '') {
            console.log('No Image Found');
          } else {
            this.setState({
              requireImagePath: res.data.data.src
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
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
    e.preventDefault();
    // TODO: do something with -> this.state.file
    let uploadAPI = envURL + 'addMovieCharacter';
    const formData = new FormData();
    let movie_id = localStorage.getItem('addCharacterMovieId')
    let name = this.state.name;
    if (movie_id && name && this.state.file) {
      formData.append('name', name)
      formData.append('file', this.state.file);
      formData.append('_id', movie_id);
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

    if (file.type == 'image/png') {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)

    } else {
      swal({
        type: 'error',
        title: 'File Type',
        text: 'Only PNG image types allowed',
      })
    }
  }

  renderImage() {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    if (imagePreviewUrl) {
      return <img alt="" class="avatar img-circle" src={this.state.imagePreviewUrl} width='200px' height='200px' />;
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
      <div>
        <h3>Add Movie Character</h3>
        <hr />
        <form class='form-horizontal' onSubmit={this._handleSubmit}>
          <div class="form-group">
            <label class="col-lg-3 control-label"><strong>Character Name</strong></label>
            <div class="col-lg-5">
            <input class="form-control" type="text" name="name"
                placeholder="Name" required="" value={this.state.name} onChange={this.handleUserInput.bind(this)} />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label"><strong>Character Image</strong></label>
            <div class="col-lg-5">
            <br />
              {this.renderImage()}
              <input class='form-control mt-3' type="file" onChange={this._handleImageChange} required='' /><br />
              <button type="submit" class="btn btn-primary mt-2" value="Add Character" onClick={this._handleSubmit}>Add Character</button>

            </div>
          </div>

        </form>
      </div>
    )
  }

}

export default withRouter(ImageUpload);
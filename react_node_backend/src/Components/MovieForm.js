import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import Creatable from './CreatableDemo'
import ImageUpload from './Image'
import { envURL, reactURL } from '../config/environment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

var moment = require('moment');

class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadMovieCharacters:false,
            update: false,
            file: '',
            title: '',
            trailer_link: '',
            release_date: moment(),
            mpaa_ratings: '',
            movie_length: '',
            movie_definition: '',
            movie_characters: [],
            movieList: [],
            update_id: 0
        }
    }
    _handleChangeFile(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        // eslint-disable-next-line
        if (!file) {
            return;
        }
        if (file.type == 'image/png') {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                });
            }
            reader.readAsDataURL(file)
        }
        else {
            swal({
                type: 'error',
                title: 'File Upload',
                text: 'Only PNG images allowed',
            })
        }
    }

    componentWillMount() {
        this.loadMovies()
    }

    handleSubmit(e) {
e.preventDefault();
        if(localStorage.getItem('roleId')!='3'){
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Access Denied.',
            })
        }
        else{

        e ? e.preventDefault() : ''
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!(this.state.trailer_link.match(regex))) {
            swal({
                type: 'error',
                title: 'Add Movie',
                text: 'Invalid Url',
            })
            return;
        }

        if (!this.state.title || !this.state.trailer_link || !this.state.release_date || !this.state.mpaa_ratings || !this.state.movie_keywords
            || !this.state.file || !this.state.movie_length || !this.state.movie_definition) {
            swal({
                type: 'error',
                title: 'Add Movie',
                text: 'Provide all fields.',
            })
            return;
        }
        let createNewMovieAPI = envURL + 'createNewMovie';
        var movie = {
            title: this.state.title,
            trailer_link: this.state.trailer_link,
            release_date: this.state.release_date.format('L'),
            mpaa_ratings: this.state.mpaa_ratings,
            movie_keywords: this.state.movie_keywords,
            movie_length: this.state.movie_length,
            movie_definition: this.state.movie_definition,
        }

        const formData = new FormData();
        formData.append('file', this.state.file);
        for (var key in movie) {
            formData.append(key, movie[key]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        post(createNewMovieAPI, formData, config).then(function (res) {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Add Movie',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'Add Movie',
                    text: res.data.successMsg,
                })
            }
        });
        this.setState({
            update: false,
            file: '',
            title: '',
            trailer_link: '',
            release_date: '',
            mpaa_ratings: '',
            movie_keywords: '',
            movie_length: '',
            movie_definition: '',
            update_id: 0
        });
        var that = this;
        setTimeout(function () {
            that.loadMovies()
        }, 2000);}
    }

    loadMovies() {
        let findAllMovieAPI = envURL + 'findAllMovie';
        axios.get(findAllMovieAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all movies');
                    console.log(res.data.data);
                    this.setState({
                        movieList: res.data.data ? res.data.data : []
                    })
                } else {
                    console.error('Error Fetching all movie');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    multiValueChange(val) {
        var multiValues = []
        val.forEach(element => {
            multiValues.push(element.value)
        });
        this.setState({
            movie_keywords: multiValues.join(',')
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }
    returnMovieList() {
        let rowNodes = this.state.movieList.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{(new Date(item.release_date)).toDateString()}</td>
                    <td>{item.movie_length}</td>
                    <td>{item.movie_definition}</td>
                    <td>{item.movie_characters.length}</td>
                    <td>
                    {/* <a href = "#" data-id = {this.props.id} className="link-style nav-link btn-info action-link" onClick={this.handleProjectView}>Bid on Project</a> */}
                        <div class = "row">
                            <input type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                            value="Update" required="" id={item._id} onClick={this.handleMovieUpdate.bind(this)} />
                            <input type="button" class="add-character-btn dashboard-form-btn link-style nav-link btn-info action-link"
                            value="Add Characters" required="" id={item._id} onClick={this.handleAddCharacters.bind(this)} />
                        </div>
                        
                        
                    </td>
                </tr>
            )
        });
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Length</th>
                        <th scope="col">Definition</th>
                        <th scope="col">Characters</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowNodes}
                </tbody>
            </table>
        );

    }

    updateMovie(e) {
        e ? e.preventDefault() : ''
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!(this.state.trailer_link.match(regex))) {
            swal({
                type: 'error',
                title: 'Add Movie',
                text: 'Invalid Url',
            })
            return;
        }
        if (!this.state.title || !this.state.trailer_link || !this.state.release_date || !this.state.mpaa_ratings || !this.state.movie_keywords
            || !this.state.file || !this.state.movie_length || !this.state.movie_definition) {
            swal({
                type: 'error',
                title: 'Add Movie',
                text: 'Provide all fields.',
            })
            return;
        }
        let updateMovieAPI = envURL + 'updateMovie';
        var movie = {
            _id: this.state.update_id,
            title: this.state.title,
            trailer_link: this.state.trailer_link,
            release_date: this.state.release_date.format('L'),
            mpaa_ratings: this.state.mpaa_ratings,
            movie_keywords: this.state.movie_keywords,
            movie_length: this.state.movie_length,
            movie_definition: this.state.movie_definition,
        }

        const formData = new FormData();
        formData.append('file', this.state.file);
        for (var key in movie) {
            formData.append(key, movie[key]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        post(updateMovieAPI, formData, config).then(function (res) {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Update Movie',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'update Movie',
                    text: res.data.successMsg,
                })
            }
        });
        this.setState({
            update: false,
            file: '',
            title: '',
            trailer_link: '',
            release_date: '',
            mpaa_ratings: '',
            movie_keywords: '',
            movie_length: '',
            movie_definition: '',
            update_id: 0
        });
        var that = this;
        setTimeout(function () {
            that.loadMovies()
        }, 2000);
    }
    handleMovieUpdate(e) {
        e ? e.preventDefault() : ''
        this.state.movieList.forEach(element => {
            if (element._id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: !this.state.update,
                    title: element.title,
                    trailer_link: element.trailer_link,
                    release_date: moment(element.release_date),
                    mpaa_ratings: element.mpaa_ratings,
                    movie_keywords: element.movie_keywords,
                    movie_length: element.movie_length,
                    movie_definition: element.movie_definition,
                })
                return;
            }
        });

    }
    render() {
        return (
            <div>
                <h4 class="c-grey-900 mB-20">All Movies</h4>
                <hr />

                {this.returnMovieList()}
                <br/>
                <hr />
                {this.state.uploadMovieCharacters?<ImageUpload/>:''}
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Movie</h3>
                <hr />
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '1086px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>        

                                    <div className="form-group">
                                        <label class="dashboard-label">Title</label>
                                        <input class="form-control" type="text" name="title" placeholder="Enter Movie Name" required="" value={this.state.title} onChange={this.handleUserInput} />
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Trailer Link</label>
                                        <input class="form-control" type="text" name="trailer_link" placeholder="Address Line" 
                                        required="" value={this.state.trailer_link} onChange={this.handleUserInput} />
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Movie Length</label>
                                            <input class="form-control" type="number" name="movie_length"
                                            placeholder="Length in Minutes" required="" value={this.state.movie_length} onChange={this.handleUserInput} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Release Date</label>
                                            <DatePicker
                                                selected={(this.state.release_date)}
                                                onChange={this.handleChange.bind(this)}
                                                minDate={moment()}
                                                placeholderText="Select a release date"
                                            />
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">MPAA Ratings</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.mpaa_ratings}
                                                onChange={this.handleUserInput} name="mpaa_ratings" id="mpaa_ratings">
                                                <option value="G">General Audience</option>
                                                <option value="PG">PG – Parental Guidance Suggested</option>
                                                <option value="PG-13">PG-13 – Parents Strongly Cautioned</option>
                                                <option value="R">R – Restricted</option>
                                                <option value="NC-17">NC-17 – Adults Only</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Definition</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.movie_definition}
                                                onChange={this.handleUserInput} name="movie_definition" id="movie_definition">
                                                <option value="HD">HD</option>
                                                <option value="HHD">HHD</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie Keywords</label>
                                        <Creatable amenities={this.state.movie_keywords} multiValueChange={this.multiValueChange.bind(this)} />
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie Logo</label>
                                        <input id="file-upload" type="file" onChange={ this._handleChangeFile.bind(this) } />
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-3">
                                        {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                value="Update Movie" required="" onClick={this.updateMovie.bind(this)} /> : <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                    value="Add Movie" required="" onClick={this.handleSubmit.bind(this)} />}
                                        </div>

                                        <div className="form-group col-md-3">
                                            <input type="reset" class="dashboard-form-btn btn btn-default" value="Cancel" />
                                            
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    handleChange(date) {
        this.setState({
            release_date: date
        });
    }

    handleAddCharacters(e){
        this.setState({
            uploadMovieCharacters:!this.state.uploadMovieCharacters
        })
        localStorage.setItem('addCharacterMovieId',e.target.id);
    }

}

export default withRouter(MovieForm);

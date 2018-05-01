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
import Pagination from './Pagination';

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
            mpaa_ratings: 'G',
            movie_length: '',
            synopsis: '',
            movie_definition: 'HD',
            movie_characters: [],
            movieList: [],
            searchedMovieList: [],
            movie_keywords: [],
            update_id: 0,
            currentPage: 1, 
            perPageRows: 10,
            movie_logo:''
        }
    }
    _handleChangeFile(e) {
        e.preventDefault();
        document.getElementById("file_error").innerHTML = "";
        let reader = new FileReader();
        let file = e.target.files[0];
        // eslint-disable-next-line
        if (!file) {
            return;
        }
        // debugger;
        if ( file.type === 'image/png' ||  file.type === 'image/jpg' || file.type === "image/jpeg" ) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                });
            };
            reader.readAsDataURL(file)
        }
        else {
            swal({
                type: 'error',
                title: 'File Upload',
                text: 'Only PNG/JPG/JPEG images allowed',
            });
            document.getElementById("file-upload").value = "";
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
                title: 'Add Movie',
                text: 'Access Denied.',
            })
        }
        else{
            let titleErrorPresent = !this.validateTitleFormat(this.state.title) ? true : false; 
            let trailerLinkErrorPresent = !this.validateTrailerLinkFormat(this.state.trailer_link) ? true : false;
            let movieTimeErrorPresent = !this.validateMovieTimeFormat(this.state.movie_length) ? true : false;
            let keywordsErrorPresent = !this.validateKeywordsFormat(this.state.movie_keywords) ? true : false;
            let checkFilePresent = !this.validateFile(this.state.file) ? true : false;
            let synopsisErrorPresent = !this.validateSynopsisFormat(this.state.synopsis) ? true : false;
            let timeErrorPresent = !this.validateTimeFormat(this.state.release_date) ? true : false;

            if (timeErrorPresent || titleErrorPresent || trailerLinkErrorPresent || movieTimeErrorPresent || keywordsErrorPresent
                || synopsisErrorPresent) {
                // swal({
                //     type: 'error',
                //     title: 'Add Movie',
                //     text: 'Provide all fields.',
                // })
                return;
            }
            let createNewMovieAPI = envURL + 'createNewMovie';
            var movie = {
                title: this.state.title,
                trailer_link: this.state.trailer_link,
                synopsis: this.state.synopsis,
                release_date: this.state.release_date.format('L'),
                mpaa_ratings: this.state.mpaa_ratings,
                movie_keywords: this.state.movie_keywords,
                movie_length: this.state.movie_length,
                movie_definition: this.state.movie_definition,
            };

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
                synopsis: '',
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
    }

    validateTitleFormat(title){
        if(title.trim() == ""){
          document.getElementById("title_error").innerHTML = "Please enter movie name";
          return false;
        }
        return true;
    }

    validateMovieTimeFormat(movie_length){
        if(movie_length.toString().trim() == ""){
          document.getElementById("movie_length_error").innerHTML = "Please enter movie length";
          return false;
        }
        return true;
    }

    validateTimeFormat(date){
        if(this.state.release_date == null){
            document.getElementById("time_error").innerHTML = "Please enter a release date"
            return false;
        }
        return true;
    }

    validateFile(file){
        if(file == ""){
          document.getElementById("file_error").innerHTML = "Please enter File";
          return false;
        }
        return true;
    }
    
    validateKeywordsFormat(keywords){
        if(keywords.length == 0){
          document.getElementById("keywords_error").innerHTML = "Please enter keywords";
          return false;
        }
        return true;
    }

    validateSynopsisFormat(synopsis){
        if(synopsis == ""){
          document.getElementById("synopsis_error").innerHTML = "Please enter synopsis";
          return false;
        }
        return true;
    }

    validateTrailerLinkFormat(trailer_link){
        const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        if(trailer_link == ""){
          document.getElementById("trailer_link_error").innerHTML = "Please enter trailer link";
          return false;
        }
        else if(!regex.test(String(trailer_link).toLowerCase())){
          document.getElementById("trailer_link_error").innerHTML = "Please enter valid trailer link";
          return false;
        }
        return true;
    }

    loadMovies() {
        let findAllMovieAPI = envURL + 'findAllMovie';
        axios.get(findAllMovieAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all movies');
                    console.log(res.data.data);
                    this.setState({
                        movieList: res.data.data ? res.data.data : [],
                        searchedMovieList: res.data.data ? res.data.data : [],
                        currentPage: 1
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
        document.getElementById("keywords_error").innerHTML = "";
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
        document.getElementById(e.target.name + "_error").innerHTML = "";
        this.setState({ [name]: value })
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
        if(this.state.searchedMovieList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedMovieList != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }

    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    returnMovieList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedMovieList != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedMovieList.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedMovieList.length / this.state.perPageRows); i++) {
                page_numbers.push(i);
            }  
            pagination_list = page_numbers.map(number => {
                return (
                <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange.bind(this)}  ><a data-id={number} class="page-link" href="#">{number}</a></li>
                );
            });
            for(let i = 0; i< currentTodos.length; i++){
                currentTodos[i].current_index = indexOfFirstTodo + i + 1;
            }
        }
        
        let rowNodes = currentTodos.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{item.current_index}</th>
                    <td>{item.title}</td>
                    <td>{(new Date(item.release_date)).toDateString()}</td>
                    <td>{item.movie_length}</td>
                    <td>{item.movie_definition}</td>
                    <td>{item.movie_characters.length}</td>
                    <td>
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
            <div>
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
                <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
                        handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
            </div>
            
        );

    }

    updateMovie(e) {
        e ? e.preventDefault() : ''

        let titleErrorPresent = !this.validateTitleFormat(this.state.title) ? true : false; 
        let trailerLinkErrorPresent = !this.validateTrailerLinkFormat(this.state.trailer_link) ? true : false;
        let movieTimeErrorPresent = !this.validateMovieTimeFormat(this.state.movie_length) ? true : false;
        let keywordsErrorPresent = !this.validateKeywordsFormat(this.state.movie_keywords) ? true : false;
        let synopsisErrorPresent = !this.validateSynopsisFormat(this.state.synopsis) ? true : false;
        let timeErrorPresent = !this.validateTimeFormat(this.state.release_date) ? true : false;

        if (timeErrorPresent || titleErrorPresent || trailerLinkErrorPresent || movieTimeErrorPresent
            || synopsisErrorPresent) {
            // swal({
            //     type: 'error',
            //     title: 'Add Movie',
            //     text: 'Provide all fields.',
            // })
            return;
        }

        let updateMovieAPI = envURL + 'updateMovie';
        var movie = {
            _id: this.state.update_id,
            movie_logo:this.state.movie_logo,
            title: this.state.title,
            trailer_link: this.state.trailer_link,
            release_date: this.state.release_date.format('L'),
            mpaa_ratings: this.state.mpaa_ratings,
            movie_keywords: this.state.movie_keywords,
            movie_length: this.state.movie_length,
            movie_definition: this.state.movie_definition,
            synopsis:this.state.synopsis
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
                    title: 'Update Movie',
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
            update_id: 0,
            synopsis: ''
        });
        var that = this;
        setTimeout(function () {
            that.loadMovies()
        }, 2000);
    }

    handleMovieUpdate(e) {
        e ? e.preventDefault() : ''

        document.getElementById("title_error").innerHTML = "";
        document.getElementById("trailer_link_error").innerHTML = "";
        document.getElementById("time_error").innerHTML = "";
        document.getElementById("movie_length_error").innerHTML = "";
        document.getElementById("synopsis_error").innerHTML = "";
        document.getElementById("keywords_error").innerHTML = "";
        document.getElementById("file_error").innerHTML = "";

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
                    synopsis : element.synopsis,
                    movie_logo:element.movie_logo
                })
                return;
            }
        });

    }

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.movieList.length > 0){
              for(let i = 0; i < this.state.movieList.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.movieList[i]
                if(list_element.title.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedMovieList: searched_array, currentPage: 1})
          }
        }
        else{
          this.loadMovies();
        }
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-lg-2">
                    <h4 class="c-grey-900 mB-20">All Movies</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Movie By Name" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>

                {this.returnMovieList()}
                <br/>
                <hr />
                {this.state.uploadMovieCharacters?<ImageUpload/>:''}
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Movie</h3>
                <hr />
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '800px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>        

                                    <div className="form-group">
                                        <label class="dashboard-label">Title</label>
                                        <input class="form-control" type="text" name="title" placeholder="Enter Movie Name" required="" value={this.state.title} onChange={this.handleUserInput} />
                                        <div id = "title_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Trailer Link</label>
                                        <input class="form-control" type="text" name="trailer_link" placeholder="Address Line" 
                                        required="" value={this.state.trailer_link} onChange={this.handleUserInput} />
                                        <div id = "trailer_link_error" class= "error"></div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Movie Length</label>
                                            <input class="form-control" type="number" name="movie_length"
                                            placeholder="Length in Minutes" required="" value={this.state.movie_length} onChange={this.handleUserInput} />
                                            <div id = "movie_length_error" class= "error"></div>                                            
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Release Date</label>
                                            <DatePicker
                                                selected={(this.state.release_date)}
                                                onChange={this.handleChange.bind(this)}
                                                minDate={moment()}
                                                placeholderText="Select a release date"
                                            />
                                             <div id = "time_error" class= "error"></div>
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
                                            <div id = "mpaa_ratings_error" class= "error"></div>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Definition</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.movie_definition}
                                                onChange={this.handleUserInput} name="movie_definition" id="movie_definition">
                                                <option value="HD">HD</option>
                                                <option value="HHD">HHD</option>
                                            </select>
                                            <div id = "movie_definition_error" class= "error"></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie Keywords</label>
                                        <Creatable amenities={this.state.movie_keywords} multiValueChange={this.multiValueChange.bind(this)} />
                                        <div id = "keywords_error" class= "error"></div>  
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Synopsis</label>
                                        <input class="form-control" type="text" name="synopsis" placeholder="Short Movie Description" 
                                        required="" value={this.state.synopsis} onChange={this.handleUserInput} />
                                        <div id = "synopsis_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie Logo</label>
                                        <input id="file-upload" type="file" onChange={ this._handleChangeFile.bind(this) } />
                                        <div id = "file_error" class= "error"></div>
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
        document.getElementById("time_error").innerHTML = "";
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

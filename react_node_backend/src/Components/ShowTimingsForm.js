import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import { envURL, reactURL } from '../config/environment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Pagination from './Pagination';

var moment = require('moment');

class ShowTimingsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiplex: { screens: [] },
            movieList: [],
            showTimingList: [],
            searchedShowTimingList: [],
            screenOptions: [],
            movieOptions: [],
            update: false,
            screen_number: '',
            screen_id:'',
            date_time: '',
            movie_id: '',
            adult: 0,
            child: 0,
            disabled: 0,
            student:0,
            update_id: 0,
            currentPage: 1, 
            perPageRows: 5
            
        }
    }

    componentWillMount() {

        this.loadShowTimings();

        let findAllMovieAPI = envURL + 'findAllMovie';
        axios.get(findAllMovieAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all movies');
                    console.log(res.data.data);
                    this.setState({
                        movieList: res.data.data ? res.data.data : [],
                    })

                } else {
                    console.error('Error Fetching all movie');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleSubmit(e) {
        e ? e.preventDefault() : ''
        debugger
        if (!this.state.movie_id || !this.state.screen_number || !this.state.date_time || !this.state.adult) {
            swal({
                type: 'error',
                title: 'Add Show',
                text: 'Please provide all fields.',
            })
            return;
        }
        let addShowTimingsAPI = envURL + 'addShowTimings';
        let show_timings =
            {
                screen_number: "2",
                screen_id:this.state.screen_number,
                date_time: this.state.date_time.format('LLLL'),
                sort_field: (new Date(this.state.date_time._d)).getTime(),
                seats_left: { type: Number },
                movie: { type: Object },//(for now, if we get data from cache/ add   whole movie obj), 
                price: { adult: this.state.adult, child: this.state.child, disabled: this.state.disabled, student:this.state.student }
            }
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                show_timings.movie = element;
            }
        });
        this.state.multiplex.screens.forEach(element => {
            if (element._id == this.state.screen_number) {
                show_timings.seats_left = parseInt(element.seat_count),
                show_timings.screen_number= element.screen_number
            }
        });
        debugger
        var apiPayload = { show: show_timings, _id: this.state.multiplex._id };
        axios.post(addShowTimingsAPI, apiPayload)
            .then(res => {
                if (res.data.errorMsg != '') {
                    swal({
                        type: 'error',
                        title: 'Add Show Time',
                        text: res.data.errorMsg,
                    })
                } else if (res.data.successMsg != '') {
                    swal({
                        type: 'success',
                        title: 'Add Show',
                        text: res.data.successMsg,
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
        this.setState({
            update: false,
            screen_number: '',
            date_time: '',
            movie_id: '',
            update_id: 0,
            adult: 0,
            child: 0,
            disabled: 0,
            student:0,            
        });
        var that = this;
        setTimeout(function () {
            that.loadShowTimings()
        }, 2000);
    }

    loadShowTimings() {
        let findAllMultiplexAPI = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplexAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all multiplex show timings');
                    console.log(res.data.data);
                    var adminId = localStorage.getItem('adminId');
                    res.data.data.forEach(element => {
                        if (adminId == element.multiplex_owner_id) {
                            this.setState({
                                multiplex: element,
                                showTimingList: element.show_timings,
                                searchedShowTimingList: element.show_timings,
                                currentPage: 1
                            })
                            return;
                        }
                    });
                } else {
                    console.error('Error Fetching all show timings');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedShowTimingList.length > 0 ? this.state.searchedShowTimingList.length/this.state.perPageRows : 0;
        if(this.state.searchedShowTimingList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
      handlePrevPaginationButton(e) {
        if(this.state.searchedShowTimingList != [] && this.state.currentPage != 1){
          this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
      }

      handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
      }

    returnShowTimingsList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedShowTimingList != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedShowTimingList.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedShowTimingList.length > 0 ? this.state.searchedShowTimingList.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedShowTimingList.length / this.state.perPageRows); i++) {
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
                    <td>{item.movie.title}</td>
                    <td>{item.date_time}</td>
                    <td>{item.screen_number}</td>   
                    <td>{item.seats_left}</td>
                    <td><input type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                        value="Update" required="" id={item._id} onClick={this.handleShowTimingsUpdate.bind(this)} />

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
                            <th scope="col">Movie</th>
                            <th scope="col">Show Time</th>
                            <th scope="col">Auditorium</th>
                            <th scope="col">Total Seats</th>
                            <th scope="col">Actions</th>
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

    updateShowTiming(e) {
        e ? e.preventDefault() : ''
        if (!this.state.movie_id || !this.state.screen_number || !this.state.date_time || !this.state.adult) {
            swal({
                type: 'error',
                title: 'Add Show',
                text: 'Please provide all fields.',
            })
            return;
        }
        let updateShowTimingsAPI = envURL + 'updateShowTimings';

        let show_timings =
            {
                _id: this.state.update_id,
                screen_number: "2",
                screen_id: this.state.screen_number,
                date_time: this.state.date_time.format('LLLL'),
                sort_field: (new Date(this.state.date_time._d)).getTime(),
                seats_left: { type: Number },
                movie: { type: Object },//(for now, if we get data from cache/ add   whole movie obj), 
                price: { adult: this.state.adult, child: this.state.child, disabled: this.state.disabled,student:this.state.student }
            }
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                show_timings.movie = element;
                return;
            }
        });
        debugger;
        this.state.multiplex.screens.forEach(element => {
            if (element._id == this.state.screen_number) {
                show_timings.seats_left = element.seat_count;
                show_timings.screen_number= element.screen_number
            }
        });
        debugger;
        var apiPayload = { show: show_timings, _id: this.state.multiplex._id };
        axios.post(updateShowTimingsAPI, apiPayload)
            .then(res => {
                if (res.data.errorMsg != '') {
                    swal({
                        type: 'error',
                        title: 'Update Show Time',
                        text: res.data.errorMsg,
                    })
                } else if (res.data.successMsg != '') {
                    swal({
                        type: 'success',
                        title: 'Update Show Time',
                        text: res.data.successMsg,
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
        // this.setState({
        //     update: false,
        //     screen_number: '',
        //     date_time: '',
        //     movie_id: '',
        //     update_id: 0,
        //     adult: 0,
        //     child: 0,
        //     disabled: 0,
        //     student:0,
        // });
        // var that = this;
        // setTimeout(function () {
        //     that.loadShowTimings()
        // }, 2000);

    }
    handleShowTimingsUpdate(e) {
        e ? e.preventDefault() : ''
        this.state.showTimingList.forEach(element => {
            if (element._id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: true,
                    screen_number: element.screen_id,
                    date_time: moment(element.date_time),
                    movie_id: element.movie._id,
                    adult: element.price.adult,
                    child: element.price.child,
                    disabled: element.price.disabled,
                    student:element.price.student                    
                })
                return;
            }
        });

    }

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.showTimingList.length > 0){
              for(let i = 0; i < this.state.showTimingList.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.showTimingList[i]
                if(list_element.movie.title.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedShowTimingList: searched_array, currentPage: 1})
          }
        }
        else{
          this.loadShowTimings();
        }
    }
    
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-lg-4">
                    <h4 class="c-grey-900 mB-20">{this.state.multiplex.name} All Show Timings</h4>
                    </div>
                    <div class="col-lg-8">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search ShowTimings By Movie Name" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>
                {this.returnShowTimingsList()}
                <br />
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Show </h3>
                <hr />
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '750px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>        

                                    <div className="form-group">
                                        <label class="dashboard-label">Multiplex</label>
                                        <input class="form-control" type="text" name="title" required="" value={this.state.multiplex.name} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie</label>
                                        <br/>
                                        <select class="form-control" value={this.state.movie_id}
                                            onChange={this.handleUserInput} name="movie_id" id="movie_id" options={this.state.movieOptions}>
                                            <option value="" disabled>Movie</option>
                                            {
                                                this.state.movieList.map(function (movie) {
                                                    if(new Date(movie.release_date)<new Date()){
                                                        debugger
                                                        return <option key={movie._id}
                                                        value={movie._id}>{movie.title}</option>;
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-4">
                                            <label class="dashboard-label">Screen Number</label>
                                            <select class="form-control" value={this.state.screen_number}
                                                onChange={this.handleUserInput} name="screen_number" id="screen_number">
                                                <option value="" disabled>Screen Number</option>
                                                {
                                                    this.state.multiplex.screens.map(function (screen) {
                                                        return <option key={screen.screen_number}
                                                            value={screen._id}>{'Screen :' + screen.screen_number + ' Seats : '
                                                                + screen.seat_count}</option>;
                                                    })
                                                }

                                            </select>
                                        </div>

                                        <div className="form-group col-md-8">
                                            <label class="dashboard-label">Show Time</label>
                                            <DatePicker
                                                style={{width: '170%'}}
                                                selected={(this.state.date_time)}
                                                onChange={this.handleChange.bind(this)}
                                                minDate={moment()}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                // excludeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30)]}
                                                dateFormat="LLL"
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                placeholder="Select Show Date"
                                            />
                                        </div>
                                    </div>

                                    <label class="dashboard-label">Price</label>
                                    <br/>
                                    <br/>
                                    <br/>
                                    
                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Adult</label>
                                            <input class="form-control" type="number" name="adult"
                                            placeholder="Adult Price" required="" value={this.state.adult} onChange={this.handleUserInput} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Child</label>
                                            <input class="form-control" type="number" name="child"
                                            placeholder="Child Price" required="" value={this.state.child} onChange={this.handleUserInput} />
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Disabled</label>
                                            <input class="form-control" type="number" name="disabled"
                                            placeholder="Disabled Price" required="" value={this.state.disabled} onChange={this.handleUserInput} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Student</label>
                                            <input class="form-control" type="number" name="student"
                                            placeholder="Student Price" required="" value={this.state.student} onChange={this.handleUserInput} />
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-4">
                                            {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                            value="Update Show Timing" required="" onClick={this.updateShowTiming.bind(this)} /> : 
                                            <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                value="Add Show Timing" required="" onClick={this.handleSubmit.bind(this)} />}
                                        </div>
                                        <div className="form-group col-md-8">
                                            <input type="reset" class="dashboard-form-btn btn btn-default" value="Cancel" />
                                        </div>
                                    </div>                                  
                                </form>      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleChange(date) {
        var date1 = new Date(date._d);
        console.log(date1.getTime())
        console.log(date)

        this.setState({
            date_time: date
        });
    }

    addReview() {
        var review = {
            rating: 4,
            review: "sdjbsdljvbsjkdvb",
            user_id: 12,
            user_name: "Vajid"
        }

        var apiPayload = { review: review, movie_id: 2 };
        let addShowTimingsAPI = envURL + 'addMovieReview';

        axios.post(addShowTimingsAPI, apiPayload)
            .then(res => {
                if (res.data.errorMsg != '') {
                    swal({
                        type: 'error',
                        title: 'Add Show Time',
                        text: res.data.errorMsg,
                    })
                } else if (res.data.successMsg != '') {
                    swal({
                        type: 'success',
                        title: 'Add Show',
                        text: res.data.successMsg,
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

}

export default withRouter(ShowTimingsForm);
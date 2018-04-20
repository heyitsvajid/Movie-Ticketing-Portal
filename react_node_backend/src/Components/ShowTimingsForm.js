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

var moment = require('moment');

class ShowTimingsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiplex: { screens: [] },
            movieList: [],
            showTimingList: [],
            screenOptions: [],
            movieOptions: [],
            update: false,
            screen_number: '',
            date_time: '',
            movie_id: '',
            adult: 0,
            child: 0,
            disabled: 0,
            update_id: 0,
        }
    }

    componentWillMount() {
        let findAllMultiplexAPI = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplexAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all multiplex');
                    console.log(res.data.data);

                    //To Do
                    //Get user id from local storage and get that user ids corresponding multiplex
                    //also change in loadSHowTimings
                    this.setState({
                        multiplex: res.data.data[0],
                        showTimingList: res.data.data[0].show_timings
                    })
                } else {
                    console.error('Error Fetching all multiplex');
                }
            })
            .catch(err => {
                console.error(err);
            });


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
                screen_number: this.state.screen_number,
                date_time: this.state.date_time.format('LLLL'),
                sort_field: (new Date(this.state.date_time._d)).getTime(),
                seats_left: { type: Number },
                movie: { type: Object },//(for now, if we get data from cache/ add   whole movie obj), 
                price: { adult: this.state.adult, child: this.state.child, disabled: this.state.disabled }
            }
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                show_timings.movie = element;
            }
        });
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                var movie = {
                    title: element.title,
                    _id: element._id,
                    release_date: element.release_date,
                    movie_logo: element.movie_logo
                }
                show_timings.movie = movie;
            }
        });
        this.state.multiplex.screens.forEach(element => {
            if (element._id == this.state.screen_number) {
                show_timings.seats_left = element.seat_count;
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
            price: { adult: 0, child: 0, disabled: 0 },
            update_id: 0,
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
                    this.setState({
                        multiplex: res.data.data[0],
                        showTimingList: res.data.data[0].show_timings
                    })
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

    returnShowTimingsList() {
        let rowNodes = this.state.showTimingList.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.movie.title}</td>
                    <td>{item.date_time}</td>
                    <td>{item.seats_left}</td>
                    <td><input type="button" class="btn-link"
                        value="Update" required="" id={item._id} onClick={this.handleShowTimingsUpdate.bind(this)} />
                        <input type="button" class="btn-link"
                            value="add review" required="" onClick={this.addReview.bind(this)} />

                    </td>
                </tr>
            )
        });
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Show Time</th>
                        <th scope="col">Seats Left</th>
                    </tr>
                </thead>
                <tbody>
                    {rowNodes}
                </tbody>
            </table>
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
                screen_number: this.state.screen_number,
                date_time: this.state.date_time.format('LLLL'),
                sort_field: (new Date(this.state.date_time._d)).getTime(),
                seats_left: { type: Number },
                movie: { type: Object },//(for now, if we get data from cache/ add   whole movie obj), 
                price: { adult: this.state.adult, child: this.state.child, disabled: this.state.disabled }
            }
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                show_timings.movie = element;
            }
        });
        this.state.movieList.forEach(element => {
            if (element._id == this.state.movie_id) {
                var movie = {
                    title: element.title,
                    _id: element._id,
                    release_date: element.release_date,
                    movie_logo: element.movie_logo
                }
                show_timings.movie = movie;
            }
        });
        this.state.multiplex.screens.forEach(element => {
            if (element._id == this.state.screen_number) {
                show_timings.seats_left = element.seat_count;
            }
        });
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
        this.setState({
            update: false,
            screen_number: '',
            date_time: '',
            movie_id: '',
            price: { adult: 0, child: 0, disabled: 0 },
            update_id: 0,
        });
        var that = this;
        setTimeout(function () {
            that.loadShowTimings()
        }, 2000);

    }
    handleShowTimingsUpdate(e) {
        e ? e.preventDefault() : ''
        this.state.showTimingList.forEach(element => {
            if (element._id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: !this.state.update,
                    screen_number: element.screen_number,
                    date_time: moment(element.date_time),
                    movie_id: element.movie._id,
                    adult: element.price.adult,
                    child: element.price.child,
                    disabled: element.price.disabled,
                })
                return;
            }
        });

    }
    render() {
        return (
            <div>
                <h3>{this.state.multiplex.name} Show Timings</h3>
                <hr />

                {this.returnShowTimingsList()}
                <br />
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Show </h3>
                <hr />
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><h5>Multiplex : </h5></label>
                        <div class="col-lg-5">
                            {this.state.multiplex.name}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><h5>Movie :</h5></label>
                        <div class="col-md-5">
                            <select class="form-control col-sm-5" value={this.state.movie_id}
                                onChange={this.handleUserInput} name="movie_id" id="movie_id" options={this.state.movieOptions}>
                                <option value="" disabled>Movie</option>
                                {
                                    this.state.movieList.map(function (movie) {
                                        return <option key={movie._id}
                                            value={movie._id}>{movie.title}</option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-md-3 control-label"><h5>Screen Number :</h5></label>
                        <div class="col-md-5">
                            <select class="form-control col-sm-5" value={this.state.screen_number}
                                onChange={this.handleUserInput} name="screen_number" id="screen_number">
                                <option value="" disabled>Screen Number</option>
                                {
                                    this.state.multiplex.screens.map(function (screen) {
                                        return <option key={screen.screen_number}
                                            value={screen._id}>{'Screen :' + screen.screen_number + ' Seats: '
                                                + screen.seat_count}</option>;
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><h5>Show Time :</h5></label>
                        <div class="col-md-5">
                            <DatePicker
                                selected={(this.state.date_time)}
                                onChange={this.handleChange.bind(this)}
                                minDate={moment()}
                                showTimeSelect
                                timeFormat="HH:mm"
                                excludeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30)]}
                                dateFormat="LLL"
                                timeIntervals={15}
                                timeCaption="Time"
                                placeholder="Select Show Date"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><h5>Price :</h5></label>
                        <div class="col-lg-5">
                            <input class="form-control" type="number" name="adult"
                                placeholder="Adult Price" required="" value={this.state.adult} onChange={this.handleUserInput} />
                            <input class="form-control" type="text" name="child"
                                placeholder="Child Price" required="" value={this.state.child} onChange={this.handleUserInput} />
                            <input class="form-control" type="number" name="disabled"
                                placeholder="Disabled Price" required="" value={this.state.disabled} onChange={this.handleUserInput} />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div class="col-md-8">
                            {this.state.update ? <input type="submit" class="btn btn-primary"
                                value="Update Show Timing" required="" onClick={this.updateShowTiming.bind(this)} /> : <input type="submit" class="btn btn-primary"
                                    value="Add Show Timing" required="" onClick={this.handleSubmit.bind(this)} />}

                            <span></span>
                            <input type="reset" class="btn btn-default" value="Cancel" />
                        </div>
                    </div>
                </form>
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
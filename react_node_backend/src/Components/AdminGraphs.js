import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';
import '../assets/css/admingraphs.css';


class AdminGraphs extends Component {

    constructor() {
        super();
        this.state = {
            movieRevenue: [],
            movieRevenuePerSelectedYear: [],
            cityRevenue: [],
            cityRevenuePerSelectedYear: [],
            monthRevenue: [],
            lastMonthMultiplexRevenue: [],
            userClickAnalytics: [],
            movieList: [],
            movieReviewGraph: []
        }
        this.getMovieRevenuePerYear = this.getMovieRevenuePerYear.bind(this);
        this.populateSelectBoxForMovieRevenueYears = this.populateSelectBoxForMovieRevenueYears.bind(this);
        this.handleYearChangeForMovie = this.handleYearChangeForMovie.bind(this);
        this.handleYearChangeForCity = this.handleYearChangeForCity.bind(this);
        this.getMultiplexSoldTicketsPerMonth = this.getMultiplexSoldTicketsPerMonth.bind(this);
        this.filterCurrentMonth = this.filterCurrentMonth.bind(this);
        this.getUserClickDetails = this.getUserClickDetails.bind(this);
        this.loadMoviesRatings = this.loadMoviesRatings.bind(this)
    }

    componentWillMount() {

        this.getMovieRevenuePerYear();
        this.getCityRevenuePerYear();
        this.getMultiplexSoldTicketsPerMonth();
        this.getUserClickDetails();
        this.loadMoviesRatings();
    }

    loadMoviesRatings() {
        var finalArrayToShowInGraph = [];
        let findAllMovieAPI = envURL + 'findAllMovie';
        axios.get(findAllMovieAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all movies');
                    console.log(res.data.data);
                    var resultArray = res.data.data;
                    for(var i = 0; i < resultArray.length; i++) {
                        if( resultArray[i].review_ratings.length > 0 ) {
                            var ratingsArray = resultArray[i].review_ratings;
                            var tempRating = 0;
                            for( var k = 0; k < ratingsArray.length; k++ ) {
                                tempRating += ratingsArray[k].rating;
                            }
                            var averageRating = tempRating/ratingsArray.length;
                            var finalObject = {
                                averageRating: Number(averageRating.toFixed(2)),
                                movie_name: resultArray[i].title
                            }
                            finalArrayToShowInGraph.push(finalObject);
                        }
                    }

                    console.log("FinalArray in movie ratings", finalArrayToShowInGraph);

                    this.setState({
                        movieList: res.data.data ? res.data.data : [],
                        movieReviewGraph: finalArrayToShowInGraph
                    })
                } else {
                    console.error('Error Fetching all movie');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }


    handleYearChangeForMovie(e) {
        console.log("Hello", e.target.value);
        var selectedYear = e.target.value;
        var allMoviesRevenueArray = this.state.movieRevenue;
        var graphToShow = [];
        for(var i = 0; i < allMoviesRevenueArray.length; i++) {
            console.log("allMoviesRevenueArray[i].year", allMoviesRevenueArray[i].year, selectedYear);
            if(allMoviesRevenueArray[i].year == selectedYear) {
                //console.log("in");
                graphToShow.push(allMoviesRevenueArray[i]);
            }
        }
        console.log("movie graphToShow", graphToShow);
        this.setState({
            movieRevenuePerSelectedYear: graphToShow
        })
    }

    handleYearChangeForCity(e) {
        console.log("Hello", e.target.value);
        var selectedYear = e.target.value;
        var allCitiesRevenueArray = this.state.cityRevenue;
        var graphToShow = [];
        for(var i = 0; i < allCitiesRevenueArray.length; i++) {
            console.log("allCitiesRevenueArray[i].year", allCitiesRevenueArray[i].year, selectedYear);
            if(allCitiesRevenueArray[i].year == selectedYear) {
                //console.log("in");
                graphToShow.push(allCitiesRevenueArray[i]);
            }
        }
        console.log("city graphToShow", graphToShow);
        this.setState({
            cityRevenuePerSelectedYear: graphToShow
        })
    }

    filterCurrentMonth(data) {
        var d = new Date();
        var n = d.getMonth();
        console.log("Current Month:", n + 1);
        var finalArray = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].month == (n+1)) {
                finalArray.push(data[i]);
            }
        }
        this.setState({
            lastMonthMultiplexRevenue: finalArray
        })

    }

    populateSelectBoxForMovieRevenueYears(selectBoxId, stateData) {

        var yeararray = [];

        var tempArray = stateData;
        console.log("Temp Array", tempArray)
        for(var k = 0; k < tempArray.length; k++) {
            var index = yeararray.indexOf(tempArray[k].year);
            if(index === -1) {
                yeararray.push(tempArray[k].year);
            }
        }

        for (var i = 0; i < yeararray.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", yeararray[i]);
            option.text = yeararray[i];
            document.getElementById(selectBoxId).appendChild(option);
        }

    }


    getMovieRevenuePerYear() {
        axios.post(envURL + 'getMovieRevenuePerYear', null, { withCredentials: true })
            .then((response) => {
                console.log("getMovieRevenuePerYear", response.data);
                var resultArray = response.data.results.billing_information;
                console.log("final result array in getMovieRevenuePerYear:", resultArray);
                this.setState({
                    movieRevenue: resultArray
                }, () => {
                    this.populateSelectBoxForMovieRevenueYears("mySelectMovie", resultArray);
                })
                //this.calculateMovieRevenuePerYear(resultArray);
            })
    }

    getCityRevenuePerYear() {
        axios.post(envURL + 'getCityRevenuePerYear', null, { withCredentials: true })
            .then((response) => {
                //console.log("getCityRevenuePerYear", response.data);
                var resultArray = response.data.results.billing_information;
                console.log("final result array: getCityRevenuePerYear", resultArray);
                this.setState({
                    cityRevenue: resultArray
                }, () => {
                    this.populateSelectBoxForMovieRevenueYears("mySelectCity", resultArray);
                })
            })
    }

    getMultiplexSoldTicketsPerMonth() {
        axios.post(envURL + 'getMultiplexSoldTicketsPerMonth', null, { withCredentials: true })
            .then((response) => {
                console.log("getMultiplexSoldTicketsPerMonth", response.data);
                 var resultArray = response.data.results.billing_information;
                 console.log("final result array: getMultiplexSoldTicketsPerMonth", resultArray);
                this.setState({
                    monthRevenue: resultArray
                }, () => {
                    this.filterCurrentMonth(resultArray);
                })
            })
    }

    getUserClickDetails() {
        axios.get(envURL + 'getClicksPerPage', null, { withCredentials: true })
            .then((response) => {
                console.log("User logging data", response.data);
                this.setState({
                    userClickAnalytics: response.data
                })

            })
    }



    render() {
        return (
            <div className="AdminGraphs">
                <h1>Hello On AdminGraphs</h1>

                <h1>Movie Wise</h1>

                <div id="movieSelectBoxDiv">Append here
                    <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }>

                    </select>
                </div>



                {/*Bar Chart for movie revenue per year*/}
                <BarChart width={700} height={300} data={this.state.movieRevenuePerSelectedYear}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="movie_name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="total_revenue" fill="#ffcc00" />
                </BarChart>


                <h1>CityWise</h1>

                <div id="citySelectBoxDiv">Append here
                    <select id="mySelectCity" onChange={ this.handleYearChangeForCity }>

                    </select>
                </div>

                {/*Bar Chart for city revenue per year*/}
                <BarChart width={700} height={300} data={this.state.cityRevenuePerSelectedYear}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="multiplex_city"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="total_revenue" fill="#ffcc00" />
                </BarChart>

                <h1>Last Month</h1>
                {/*Bar Chart for last month top 10 multiplex revenue per year*/}
                <BarChart width={700} height={300} data={this.state.lastMonthMultiplexRevenue}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="multiplex_name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="total_revenue" fill="#ffcc00" />
                </BarChart>


                <h1>UserClicks</h1>
                <ComposedChart width={730} height={250} data={this.state.userClickAnalytics}>
                    <XAxis dataKey="pageName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
                    {/*<Bar dataKey="coun" barSize={20} fill="#413ea0" />*/}
                </ComposedChart>


                <h1>Top Movie Rating's</h1>

                <AreaChart width={730} height={250} data={ this.state.movieReviewGraph }
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>

                    </defs>
                    <XAxis dataKey="movie_name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="averageRating" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                </AreaChart>



            </div>
        );
    }
}

export default AdminGraphs;
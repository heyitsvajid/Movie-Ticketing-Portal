import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
            lastMonthMultiplexRevenue: []
        }
        this.getMovieRevenuePerYear = this.getMovieRevenuePerYear.bind(this);
        this.populateSelectBoxForMovieRevenueYears = this.populateSelectBoxForMovieRevenueYears.bind(this);
        this.handleYearChangeForMovie = this.handleYearChangeForMovie.bind(this);
        this.handleYearChangeForCity = this.handleYearChangeForCity.bind(this);
        this.getMultiplexSoldTicketsPerMonth = this.getMultiplexSoldTicketsPerMonth.bind(this);
        this.filterCurrentMonth = this.filterCurrentMonth.bind(this);

    }

    componentWillMount() {

        this.getMovieRevenuePerYear();
        this.getCityRevenuePerYear();
        this.getMultiplexSoldTicketsPerMonth();
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







            </div>
        );
    }
}

export default AdminGraphs;
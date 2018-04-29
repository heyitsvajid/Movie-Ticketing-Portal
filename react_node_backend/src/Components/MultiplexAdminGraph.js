import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import {BarChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';
import '../assets/css/admingraphs.css';


class AdminGraphs extends Component {

    constructor() {
        super();
        this.state = {
            multiplexAdminGraphData:[]

        }
        
        this.loadMultiplexAdminGraphData=this.loadMultiplexAdminGraphData.bind(this);
    }

    componentWillMount() {
      this.loadMultiplexAdminGraphData()
    }

    loadMultiplexAdminGraphData(){
      let url = envURL + 'getMultiplexAdminGraph';
      var payload  = {
          multiplex_id:5
      }
      axios.post( url, payload, { withCredentials : true } )
      .then( (res) => {
          console.log("multiplexAdminGraphData", res.data );
          var result = res.data.data?res.data.data:[]
          let graphData = []
          result.forEach(element => {
              graphData.push({
                  name:element.movie_name,
                  amount:element.total_revenue
              })
              this.setState({
                  multiplexAdminGraphData:graphData
              })
          });
      })

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


    render() {
        return (
            <div>
                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Top 10 Movie Revenues</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Year</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }></select>
                            </div>
                        </div>
                        
                        <div id="citySelectBoxDiv">
                            
                        </div>
                        <br/>                            
                        <BarChart width={1300} height={300} data={this.state.multiplexAdminGraphData}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="amount" fill="#ffcc00" />
                        </BarChart>
                    </div>
                </div>
                <hr/>    
            </div>
        );
    }
}

export default AdminGraphs;
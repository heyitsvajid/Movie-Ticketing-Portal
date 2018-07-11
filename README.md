# Movie Ticket Reservation

> Team project for CMPE 273 Enterprise Distributed Systems.

## Goal

* The goal is to build a distributed enterprise web application which enables the user  login/register and also book/cancel movie tickets. Also provide Admin side which can be used to add/edit/delete Movie Halls, Movie and show timings and also show dashboard for analytics/statistics.

## System Design

## Built with the MERN stack 

|MongoDB|Express|React|NodeJS|
|--|--|--|--|
|[![mdb](https://github.com/mongodb-js/leaf/blob/master/dist/mongodb-leaf_256x256.png?raw=true)](https://www.mongodb.com/)|[![mdb](https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67)](http://expressjs.com/de/)|[![mdb](https://cdn.auth0.com/blog/react-js/react.png)](https://facebook.github.io/react/)|[![mdb](https://camo.githubusercontent.com/9c24355bb3afbff914503b663ade7beb341079fa/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f2d6c696768742e737667)](https://nodejs.org/en/)|
|a free and open-source cross-platform document-oriented database program|Fast, unopinionated, minimalist web framework for node.|a JavaScript library for building user interfaces|a JavaScript runtime built on Chrome's V8 JavaScript engine|


## System Architecture
![Architecture](/Architecture.png)

### Technology stack

![](readme-src/2.png)

<br/>
<table>
<thead>
<tr>
<th>Area</th>
<th>Technology</th>
</tr>
</thead>
<tbody>
	<tr>
		<td>Front-End</td>
		<td>React, Redux, React Router, Bootstrap, HTML5, ( ES6 )</td>
	</tr>
	<tr>
		<td>Message-oriented middleware</td>
		<td>Apache Kafka</td>
	</tr>
	<tr>
		<td>Authentication Middleware</td>
		<td>Passport.js</td>
	</tr>
	<tr>
		<td>Back-End</td>
		<td>Express, Node.js</td>
	</tr>
	<tr>
		<td>In-Memory Caching / Datastore</td>
		<td>Redis</td>
	</tr>
	<tr>
		<td>Search and Analytics Engine</td>
		<td>Developed on our own</td>
	</tr>
	<tr>
		<td>API Unit Testing</td>
		<td>Mocha, Postman</td>
	</tr>
	<tr>
		<td>Performance Testing</td>
		<td>JMeter</td>
	</tr>
	<tr>
		<td>Database</td>
		<td>MySQL (Google Cloud Platform), MongoDB (MLab)</td>
	</tr>
    <tr>
		<td>Deployment</td>
		<td>Amazon AWS</td>
	</tr>
</tbody>
</table>

### Steps to run application:

*	Create MySQL schema and provide credentials in SQL Properties.
*	Download the kafka latest release and un-zip it.
*	Go to kafka directory: cd kafka_2.11-1.1.0
*	Start Zookeeper: bin/zookeeper-server-start.sh config/ zookeeper.properties
*	Start Kafka :  bin/kafka-server-start.sh config/server.properties
*	Create Topics : /kafka_topics
* Go to Path : \react_node_backend
* npm install
* npm run start-dev

> This will start ReactJS server on 3000 port and NodeJS server will start at 3001 port.

* Go to Path : \ kafka_backend
* npm install
*	node server.js

> This will start kafka_backend server.

## 📝 Author
[<img src="https://github.com/heyitsvajid/heyitsvajid.github.io/blob/master/img/profile.jpg" align="right" height="100">](https://github.com/heyitsvajid)

##### Vajid Kagdi <kbd> [Github](https://github.com/heyitsvajid) / [LinkedIn](https://www.linkedin.com/in/heyitsvajid) / [E-Mail](mailto:vajid9@gmail.com)</kbd>
##### Jay Patel <kbd> [Github](https://github.com/pateljay134) / [LinkedIn](https://www.linkedin.com/in/pateljay134) / [E-Mail](mailto:pateljay134@gmail.com) </kbd>
##### Murtaza Manasawala <kbd> </kbd>
##### Venkatesh Devale <kbd> </kbd>
##### Pradnyesh Patil <kbd> </kbd>

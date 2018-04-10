# Movie Ticket Reservation

> Team project for CMPE 273 Enterprise Distributed Systems.

## Goal

* The goal is to build a distributed enterprise web application which enables the user  login/register and also book/cancel movie tickets. Also provide Admin side which can be used to add/edit/delete Movie Halls, Movie and show timings and also show dashboard for analytics/statistics.

## System Design

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

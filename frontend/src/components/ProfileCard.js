import React from "react";

import { Jumbotron, Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

import url from "url.js";

export default function ProfileCard(props) {
	if (props.info === undefined) return <div></div>;
	console.log(props);
	let availability = props.info.available ? (
		<p style={{ color: "#00cc00" }}>✔</p>
	) : (
		<p style={{ color: "#cc0000" }}>✘</p>
	);

	return (
		<>
			<Link to={`/user/${props.info.id}`}>
				<Jumbotron fluid className="p-3 bg-secondary my-2 rounded">
					<Row>
						<Col xs="2">
							<Container className="themed-container" fluid>
								<img
									src={url + props.info.image[0]}
									style={{
										height: "80px",
										width: "80px"
									}}
									/**host.imgurl */

									alt="Profile"
								/>
							</Container>
						</Col>
						<Col className="text-white">
							<p>{props.info.name}</p>
							<p>{props.info.description}</p>
							<p>{props.info.email} </p>
							<p>{props.info.phone}</p>
							{availability}
							<Badge pill color="info">
								4.7 ⚝
							</Badge>
							<br />
							<br />
						</Col>
					</Row>
				</Jumbotron>
			</Link>
		</>
	);
}

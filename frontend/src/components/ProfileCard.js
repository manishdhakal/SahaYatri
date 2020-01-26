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
			<Link to={`/${props.info.type}/${props.info.id}`}>
				<Container>
					<Jumbotron
						fluid
						className="p-3 my-2 rounded border border-primary"
						style={{
							height: "260px",
							stroke: "blue"
						}}
					>
						<Row>
							<Col xs="auto">
								<Container className="themed-container">
									<img
										src={url + props.info.image[0]}
										style={{
											height: "80px",
											width: "80px",
											borderRadius: "50%"
										}}
										/**host.imgurl */

										alt="Profile"
									/>
								</Container>
							</Col>
							<Col
								style={{
									color: "#333333",
									fontWeight: "bold"
								}}
							>
								<Container>
									<strong>{props.info.name}</strong>
									<br />
									<strong>{props.info.description}</strong>
									<br />
									<strong>{props.info.email} </strong>
									<br />
									<strong>{props.info.phone}</strong>
									<br />
									Available? : {availability}
									<Badge pill color="info">
										4.7 ⚝
									</Badge>
								</Container>
								<br />
								<br />
							</Col>
						</Row>
					</Jumbotron>
				</Container>
			</Link>
		</>
	);
}

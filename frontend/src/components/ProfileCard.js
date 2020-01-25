import React from "react";

import { Jumbotron, Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
	if (props == null) return;

	return (
		<>
			<Link to="/profile">
				<Jumbotron fluid className="p-3 bg-secondary my-2 rounded">
					<Row>
						<Col xs="2">
							<Container className="themed-container" fluid>
								<img src="" /**host.imgurl */ alt="Profile" />
							</Container>
						</Col>
						<Col className="text-white">
							<p>Arman Deshmukh</p>
							<p>Undergrad in CE. Ghumante kto moh!!!</p>
							<p>Companion</p>
							<p>Pokhara</p>
							<p style={{ color: "#00cc00" }}>✔</p>
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

import React from "react";

import { Jumbotron, Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
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
						<Col className='text-white'>
							<p>Name of the host</p>
							<p>The category of the hosting</p>
							<p>Pricing</p>
							<p>Aviability</p>
							<Badge pill color="info">
								4.9 ⚝
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

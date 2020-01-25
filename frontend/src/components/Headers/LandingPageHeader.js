import React from "react";

// reactstrap components
import {
	Button,
	Container,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText
} from "reactstrap";
import { Link } from "react-router-dom";

// core components

function LandingPageHeader() {
	let pageHeader = React.createRef();

	React.useEffect(() => {
		if (window.innerWidth < 991) {
			const updateScroll = () => {
				let windowScrollTop = window.pageYOffset / 3;
				pageHeader.current.style.transform =
					"translate3d(0," + windowScrollTop + "px,0)";
			};
			window.addEventListener("scroll", updateScroll);
			return function cleanup() {
				window.removeEventListener("scroll", updateScroll);
			};
		}
	});

	return (
		<>
			<div
				style={{
					backgroundImage:
						"url(" + require("assets/img/village.jpg") + ")"
				}}
				className="page-header"
				data-parallax={true}
				ref={pageHeader}
			>
				<div className="filter" />
				<Container>
					<div className="motto text-center">
						<h1>SAHAYATRI</h1>
						<h3>Creating Interface Between Locals and Tourists</h3>
						<br />
						<Link to="/filter">
							<InputGroup className="w-75 mx-auto">
								<Input
									placeholder="Search"
									type="search"
									className="bg-transparent  text-white"
								/>
								<InputGroupAddon addonType="apppend">
									<InputGroupText className="bg-transparent">
										<i className="fa fa-search text-white view overlay zoom" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Link>
						{/* <Button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
            >
              <i className="fa fa-play" />
              Watch video
            </Button>
            <Button className="btn-round" color="neutral" type="button" outline>
              Download
            </Button> */}
					</div>
				</Container>
			</div>
		</>
	);
}

export default LandingPageHeader;

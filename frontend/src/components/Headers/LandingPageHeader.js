import React from "react";

// reactstrap components
import {
	Button,
	Container,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	
} from "reactstrap";
import { Link } from "react-router-dom";

// core components

function LandingPageHeader() {
	let pageHeader = React.createRef();

	// React.useEffect(() => {
	// 	if (window.innerWidth < 991) {
	// 		const updateScroll = () => {
	// 			let windowScrollTop = window.pageYOffset / 3;
	// 			pageHeader.current.style.transform =
	// 				"translate3d(0," + windowScrollTop + "px,0)";
	// 		};
	// 		window.addEventListener("scroll", updateScroll);
	// 		return function cleanup() {
	// 			window.removeEventListener("scroll", updateScroll);
	// 		};
	// 	}
	// });
  return (
    <>
      <div
        style={{
		  backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(" + require("assets/img/village.jpg") + ")",
		  backgroundSize:'cover',
		}}
        
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className=" text-center text-white" style={{paddingTop:100}} >
            <h1>SAHAYATRI</h1>
            <h3>Creating Interface Between Locals and Tourists</h3>
            <br />
			<InputGroup className='w-100 mx-auto' style={{height:200}}>
				<InputGroupAddon addonType="prepend">
					<InputGroupText  style={{height:40}}>
					<i className="nc-icon nc-zoom-split"/>
					</InputGroupText>
				</InputGroupAddon>
				<Input placeholder="Locals" type="text" />
				<InputGroupAddon addonType="append" >
					<Button color="primary" style={{height:40,}}>Browse</Button>
				</InputGroupAddon>
			</InputGroup>
            {/* <InputGroup className='w-75 mx-auto'>
			<InputGroupAddon addonType="apppend">
				<InputGroupText className=''>
					<i className="nc-icon nc-zoom-split"/>
				</InputGroupText>
			</InputGroupAddon>
                <Input placeholder="Search Locals" type="text" className='' />
            </InputGroup> */}
            {/* <Button
	return (
		<>
			<div
				style={{
					backgroundImage:
						"url(" + require("assets/img/village.jpg") + ")"
				}}
				className="page-header"
				data-parallax={
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

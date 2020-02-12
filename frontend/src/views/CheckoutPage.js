import React, { useState, useContext } from "react";

import {
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Button,
	Container,
	Row,
	InputGroup,
	InputGroupAddon,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "reactstrap";

import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import DemoFooter from "components/Footers/DemoFooter";

import url from "url";
import Calendar from "react-calendar";
import Context from "context/context";
import { Redirect } from "react-router";
import { book } from "api";

export default function CheckoutPage(props) {
    const {user, setUser} = useContext(Context)
    const [formData, setFormData] = useState({date: new Date()})
    const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
    console.log(formData)
	return (
		<div>
			<ExamplesNavbar {...props} />
			<br />
			<Modal isOpen={modal} toggle={toggle} className='text-dark'>
				<ModalHeader>
					<div className="icon-box">
						<i className="material-icons">&#xE876;</i>
					</div>
					<p className="modal-title">Awesome!</p>
				</ModalHeader>
				<ModalBody>
					<p style={{ textAlign: "center" }}>
						Your offer has been confirmed. Check your email for
						detials.
					</p>
				</ModalBody>
				<ModalFooter>
					<Container fluid>
						<Button
							color="primary"
							onClick={() => {
								props.history.push("/");
							}}
						>
							<p style={{ textAlign: "center", textTransform:'uppercase', fontWeight:'bold' }}>Goto homepage</p>
						</Button>
					</Container>
				</ModalFooter>
			</Modal>
			<Container style={{marginTop:100}}>
				<Form >
					<FormGroup onChange={e => setFormData({...formData ,payType: e.target.value})} tag="fieldset">
						<Label className='font-weight-bold h5 text-dark'>Payment Method</Label>
						<FormGroup check >
							<Label check>
								<Input
									type="radio"
									name="docType"
									value="eSewa"
									
								/>{" "}
								<span className='font-weight-bold' >eSewa </span>
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="radio"
									name="docType"
									value="PayPal"
								/>{" "}
								<span className='font-weight-bold' >PayPal </span>
							</Label>
						</FormGroup>
					</FormGroup>
					<Button color='success' onClick={() => {
						book(user.category,user.categoryId, user.timeId)
						setModal(true)
					}}
					>
						Submit
					</Button>
				</Form>
			</Container>
			<DemoFooter />
		</div>
	);
}

// import React, { useState } from "react";

// import {
// 	Form,
// 	FormGroup,
// 	Label,
// 	Input,
// 	FormText,
// 	Button,
// 	Container,
// 	Row,
// 	InputGroup,
// 	InputGroupAddon,
// 	Modal,
// 	ModalHeader,
// 	ModalBody,
// 	ModalFooter
// } from "reactstrap";

// import ProfilePageHeader from "components/Headers/ProfilePageHeader";
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
// import DemoFooter from "components/Footers/DemoFooter";

// import url from "url";

// export default function CheckoutPage(props) {
// 	console.log(props.location.hash)
// 	let str = props.location.hash.slice(1,props.location.hash.length)
// 	let [type, id] = str.split('?')
// 	console.log(type,id)
// 	const [modal, setModal] = useState(false);
// 	const toggle = () => {
// 		setModal(!modal);
// 	};
// 	const onFormSubmit = e => {
// 		e.preventDefault();
// 		let form = e.target;
// 		let res = {
// 			catId:id,
// 			bookType: type,
// 			fname: form.querySelector("#fname").value,
// 			lname: form.querySelector("#lname").value,
// 			docType: "passport",
// 			docID: form.querySelector("#docID").value,
// 			phone: form.querySelector("#phone").value
// 		};
// 		fetch(url + "/api/bdata/", {
// 			method: "post",
// 			body: JSON.stringify(res),
// 			headers: {
// 				Accept: "application/json"
// 			}
// 		}).then(() => {
// 			toggle();
// 		});
// 	};

// 	return (
// 		<div>
// 			<ExamplesNavbar {...props} />
// 			<ProfilePageHeader />
// 			<br />
// 			<Modal isOpen={modal} toggle={toggle} className='text-dark'>
// 				<ModalHeader>
// 					<div className="icon-box">
// 						<i className="material-icons">&#xE876;</i>
// 					</div>
// 					<p className="modal-title">Awesome!</p>
// 				</ModalHeader>
// 				<ModalBody>
// 					<p style={{ textAlign: "center" }}>
// 						Your booking has been confirmed. Check your email for
// 						detials.
// 					</p>
// 				</ModalBody>
// 				<ModalFooter>
// 					<Container fluid>
// 						<Button
// 							color="primary"
// 							onClick={() => {
// 								props.history.push("/");
// 							}}
// 						>
// 							<p style={{ textAlign: "center" }}>Goto homepage</p>
// 						</Button>
// 					</Container>
// 				</ModalFooter>
// 			</Modal>
// 			<Container>
// 				<h1>Booking Form</h1>
// 				<Form
// 					onSubmit={e => {
// 						e.preventDefault();
// 						onFormSubmit(e);
// 					}}
// 				>
// 					<FormGroup>
// 						<Label for="fname" className='text-dark'>Firstname</Label>
// 						<Input
// 							type="text"
// 							name="fname"
// 							id="fname"
// 							placeholder="Firstname"
// 						/>
// 					</FormGroup>
// 					<FormGroup>
// 						<Label for="lname">Lastname</Label>
// 						<Input
// 							type="text"
// 							name="lname"
// 							id="lname"
// 							placeholder="Lastname"
// 						/>
// 					</FormGroup>
// 					<FormGroup tag="fieldset">
// 						<legend className='text'>Document Type</legend>
// 						<FormGroup check>
// 							<Label check>
// 								<Input
// 									type="radio"
// 									name="docType"
// 									value="passport"
									
// 								/>{" "}
// 								Passport
// 							</Label>
// 						</FormGroup>
// 						<FormGroup check>
// 							<Label check>
// 								<Input
// 									type="radio"
// 									name="docType"
// 									value="license"
// 								/>{" "}
// 								License
// 							</Label>
// 						</FormGroup>
// 						<FormGroup check>
// 							<Label check>
// 								<Input
// 									type="radio"
// 									name="docType"
// 									value="citizen"
// 								/>{" "}
// 								Citizenship
// 							</Label>
// 						</FormGroup>
// 					</FormGroup>
// 					<FormGroup>
// 						<Label for="docID">Document ID</Label>
// 						<Input
// 							type="text"
// 							name="docID"
// 							id="docID"
// 							placeholder="Document ID"
// 						/>
// 					</FormGroup>
// 					<FormGroup>
// 						<Label for="Document">Document</Label>
// 						<Input type="file" name="document" id="document" />
// 						<FormText color="muted">
// 							Please upload a clear picture of the selected
// 							document.
// 						</FormText>
// 					</FormGroup>
// 					<FormGroup>
// 						<Label for="phone">Phone number</Label>
// 						<Input
// 							type="number"
// 							name="phone"
// 							id="phone"
// 							placeholder="Phone Number"
// 						/>
// 					</FormGroup>
// 					<FormGroup>
// 						<Container>
// 							<Row>
// 								<div className="col-xs-12 col-md-4 col-md-offset-4">
// 									<div className="panel panel-default">
// 										<div className="panel-heading">
// 											<Row>
// 												<h3 className="text-center">
// 													Payment Details
// 												</h3>
// 											</Row>
// 										</div>
// 										<div className="panel-body">
// 											<Row>
// 												<div className="col-xs-12">
// 													<FormGroup>
// 														<Label>
// 															CARD NUMBER
// 														</Label>
// 														<InputGroup>
// 															<Input
// 																type="tel"
// 																placeholder="Valid Card Number"
// 															></Input>
// 															<InputGroupAddon>
// 																<span className="fa fa-credit-card"></span>
// 															</InputGroupAddon>
// 														</InputGroup>
// 													</FormGroup>
// 												</div>
// 											</Row>
// 											<Row>
// 												<div className="col-xs-7 col-md-7">
// 													<FormGroup>
// 														<Label>
// 															<span className="hidden-xs">
// 																EXPIRATION
// 															</span>
// 															<span className="visible-xs-inline">
// 																EXP
// 															</span>
// 															DATE
// 														</Label>
// 														<Input
// 															type="tel"
// 															placeholder="MM / YY"
// 														></Input>
// 													</FormGroup>
// 												</div>
// 												<div className="col-xs-5 col-md-5 pull-right">
// 													<FormGroup>
// 														<Label>CV CODE</Label>
// 														<Input
// 															type="tel"
// 															placeholder="CVC"
// 														></Input>
// 													</FormGroup>
// 												</div>
// 											</Row>
// 											<Row>
// 												<div className="col-xs-12">
// 													<FormGroup>
// 														<Label>
// 															CARD OWNER
// 														</Label>
// 														<Input
// 															type="text"
// 															placeholder="Card Owner Names"
// 														></Input>
// 													</FormGroup>
// 												</div>
// 											</Row>
// 										</div>
// 									</div>
// 								</div>
// 							</Row>
// 						</Container>
// 					</FormGroup>
// 					<Button>Submit</Button>
// 				</Form>
// 				<DemoFooter />
// 			</Container>
// 		</div>
// 	);
// }

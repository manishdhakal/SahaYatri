import React, { useState } from "react";

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

export default function CheckoutPage(props) {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const onFormSubmit = e => {
		e.preventDefault();
		let form = e.target;
		let res = {
			fname: form.querySelector("#fname").value,
			lname: form.querySelector("#lname").value,
			docType: "passport",
			docID: form.querySelector("#docID").value,
			phone: form.querySelector("#phone").value
		};
		fetch(url + "/api/bdata/", {
			method: "post",
			body: JSON.stringify(res),
			headers: {
				Accept: "application/json"
			}
		}).then(() => {
			toggle();
		});
	};

	return (
		<div>
			<ExamplesNavbar />
			<ProfilePageHeader />
			<br />
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader>
					<div className="icon-box">
						<i className="material-icons">&#xE876;</i>
					</div>
					<p className="modal-title">Awesome!</p>
				</ModalHeader>
				<ModalBody>
					<p style={{ textAlign: "center" }}>
						Your booking has been confirmed. Check your email for
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
							<p style={{ textAlign: "center" }}>Goto homepage</p>
						</Button>
					</Container>
				</ModalFooter>
			</Modal>
			<Container>
				<h1>Booking Form</h1>
				<Form
					onSubmit={e => {
						e.preventDefault();
						onFormSubmit(e);
					}}
				>
					<FormGroup>
						<Label for="fname">Firstname</Label>
						<Input
							type="text"
							name="fname"
							id="fname"
							placeholder="Firstname"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="lname">Lastname</Label>
						<Input
							type="text"
							name="lname"
							id="lname"
							placeholder="Lastname"
						/>
					</FormGroup>
					<FormGroup tag="fieldset">
						<legend>Document Type</legend>
						<FormGroup check>
							<Label check>
								<Input
									type="radio"
									name="docType"
									value="passport"
								/>{" "}
								Passport
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="radio"
									name="docType"
									value="license"
								/>{" "}
								License
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="radio"
									name="docType"
									value="citizen"
								/>{" "}
								Citizenship
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup>
						<Label for="docID">Document ID</Label>
						<Input
							type="text"
							name="docID"
							id="docID"
							placeholder="Document ID"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Document">Document</Label>
						<Input type="file" name="document" id="document" />
						<FormText color="muted">
							Please upload a clear picture of the selected
							document.
						</FormText>
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone number</Label>
						<Input
							type="number"
							name="phone"
							id="phone"
							placeholder="Phone Number"
						/>
					</FormGroup>
					<FormGroup>
						<Container>
							<Row>
								<div className="col-xs-12 col-md-4 col-md-offset-4">
									<div className="panel panel-default">
										<div className="panel-heading">
											<Row>
												<h3 className="text-center">
													Payment Details
												</h3>
											</Row>
										</div>
										<div className="panel-body">
											<Row>
												<div className="col-xs-12">
													<FormGroup>
														<Label>
															CARD NUMBER
														</Label>
														<InputGroup>
															<Input
																type="tel"
																placeholder="Valid Card Number"
															></Input>
															<InputGroupAddon>
																<span className="fa fa-credit-card"></span>
															</InputGroupAddon>
														</InputGroup>
													</FormGroup>
												</div>
											</Row>
											<Row>
												<div className="col-xs-7 col-md-7">
													<FormGroup>
														<Label>
															<span className="hidden-xs">
																EXPIRATION
															</span>
															<span className="visible-xs-inline">
																EXP
															</span>
															DATE
														</Label>
														<Input
															type="tel"
															placeholder="MM / YY"
														></Input>
													</FormGroup>
												</div>
												<div className="col-xs-5 col-md-5 pull-right">
													<FormGroup>
														<Label>CV CODE</Label>
														<Input
															type="tel"
															placeholder="CVC"
														></Input>
													</FormGroup>
												</div>
											</Row>
											<Row>
												<div className="col-xs-12">
													<FormGroup>
														<Label>
															CARD OWNER
														</Label>
														<Input
															type="text"
															placeholder="Card Owner Names"
														></Input>
													</FormGroup>
												</div>
											</Row>
										</div>
									</div>
								</div>
							</Row>
						</Container>
					</FormGroup>
					<Button>Submit</Button>
				</Form>
				<DemoFooter />
			</Container>
		</div>
	);
}

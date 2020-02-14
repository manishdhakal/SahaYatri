import React, { useState, useContext } from "react";

import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Container,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import DemoFooter from "components/Footers/DemoFooter";

import Context from "context/context";
import { book } from "api";
import { Redirect } from "react-router";

export default function CheckoutPage(props) {
    const {user, setUser} = useContext(Context)
    const [formData, setFormData] = useState({date: new Date()})
    const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
    if (!user.isLoggedIn){
		setUser({...user,afterLogin:'/checkout'})
		return <Redirect to='/register' />
	}
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


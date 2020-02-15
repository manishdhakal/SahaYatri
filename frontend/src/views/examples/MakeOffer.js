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

import Calendar from "react-calendar";
import Context from "context/context";
import { Redirect } from "react-router";

export default function MakeOffer(props) {
    const {user, setUser} = useContext(Context)
    const [formData, setFormData] = useState({date: new Date()})
    const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
    console.log(formData)
    if (!user.isLoggedIn) {
        setUser({...user, afterLogin: '/make-offer',me:'nth'})
        return <Redirect to='/register' />
    }
    else
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
			<Container style={{marginTop:50,width:400}}>
				<h4 className='text-center font-weight-bold'>Make an Offer to Local</h4>
				<Form >
					<FormGroup>
						<Label for="docID" className='text-dark font-weight-bold h5'> Date</Label>
                        <Calendar className='shadow my-calendar' minDate={new Date()} onChange={(e) => setFormData({date: e, ...formData})}/>
					</FormGroup>
					<FormGroup>
						<Label for="Document" className=' font-weight-bold h5 text-dark'>Duration (in hrs.)</Label>
                        <Input type="number" name="document" id="document" 
                            onChange={(e) => setFormData({...formData, duration:e.target.value})}
                         />
					</FormGroup>
                    <FormGroup>
						<Label for="Document" className=' font-weight-bold h5 text-dark'>Payment Amount (in NRs.)</Label>
                        <Input type="number" name="document" id="document" 
                            onChange={(e) => setFormData({...formData, amount:e.target.value})}
                         />
					</FormGroup>
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
					<Button color='success' onClick={() => setModal(true)}>Submit</Button>
				</Form>
			</Container>
			<DemoFooter />
		</div>
	);
}

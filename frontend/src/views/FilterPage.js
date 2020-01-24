import React, { useState, useEffect } from "react";
import url from 'url.js'
import {
	Button,
	CustomInput,
	Form,
	FormGroup,
	Label,
	ListGroup,
	ListGroupItem,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import ProfileCard from "../components/ProfileCard";
import axios from "axios";

function FilterPage(props) {
	const [searchType, setSearchType] = useState(props.history.location.type)
	let [searchKey, setSearchKey] = useState("");
	let [searchItems, setSearchItems] = useState([])
	let [minPrice, setMinPrice] = useState(0);
	let [maxPrice, setMaxPrice] = useState(0);

	let [hosts, setHosts] = useState([1, 6, 4]);

	let handleSearchKeyChange = e => {
		setSearchKey(e.target.value);
	};

	let handleMinPriceChange = e => {
		setMinPrice(e.target.value);
	};

	let handleMaxPriceChange = e => {
		setMaxPrice(e.target.value);
	};

	let handleMinSliderChange = e => {
		setMinPrice(e.target.value * 100);
	};

	let handleMaxSliderChange = e => {
		setMaxPrice(e.target.value * 100);
	};

	let search = e => {
		e.preventDefault();
		setHosts(
			hosts.sort((a, b) => {
				return a - b;
			})
		);
	};
	useEffect(() =>{
		axios.get(url+'/api/'+props.history.location.type).then(resp => setSearchItems(resp.data))
	},[])
	console.log(searchItems)
	return (
		<div>
			<div
				className="page-header section-dark"
				style={{
					backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(" + require("assets/img/village.jpg") + ") ",
					height: "100px",
					width: "100%"
				}}
			>
				<ExamplesNavbar />
				<Container>
					<Form>
						<FormGroup>
							<Label for="Search" tag="h4" className="text-white font-weight-bold">Search</Label>
							<Input
								bsSize="lg"
								type="text"
								name="searchKey"
								id="Search"
								placeholder="Keywords"
								value={searchKey}
								onChange={handleSearchKeyChange}
							/>
						</FormGroup>
						<Container>
							<FormGroup>
								<Label for="minPrice" tag="h4" className="text-white font-weight-bold">Location</Label>
								<InputGroup> 
									<Input
										placeholder="places"
										type="select"
										onChange={e => console.log(e.target.value)}
									>
										<option value=''>--Select--</option>
										{searchItems.map(item=> <option value={item.location}>{item.location}</option>)										}
									</Input>
								</InputGroup>
							</FormGroup>
							{/* <FormGroup>
								<Label for="minPrice" tag="h4" className="text-white font-weight-bold">Minimum Price (Rs.)</Label>
								<CustomInput
									type="range"
									id="minPrice"
									name="minPrice"
									onChange={handleMinSliderChange}
									defaultValue="0"
								/>
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										Rs
									</InputGroupAddon> 
									<Input
										placeholder="Minimum"
										min={0}
										type="number"
										step="100"
										value={minPrice}
										onChange={handleMinPriceChange}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<Label for="maxPrice" tag="h4" className="text-white font-weight-bold">Maximum Price (Rs.)</Label>
								<CustomInput
									type="range"
									id="maxPrice"
									name="maxPrice"
									onChange={handleMaxSliderChange}
									defaultValue="0"
								/>
								<InputGroup>
									<InputGroupAddon addonType="prepend" >
										<InputGroupText style={{paddingBottom:-10}} >rs</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Maximum"
										min={0}
										type="number"
										step="100"
										onChange={handleMaxPriceChange}
										value={maxPrice}
									/>
								</InputGroup>
							</FormGroup> */}
						</Container>
						<Button className="btn-round" color="neutral" type="button" outline>
							<i className="fa fa-search" />
							Search
						</Button>
					</Form>
				</Container>
			</div>
			<br />
			<Container>
				<ListGroup>
					{hosts.map(host => {
						return (
							<ListGroupItem className="justify-content-between">
								<ProfileCard
									key={host} /**key={hostid}  info=host*/
								/>
							</ListGroupItem>
						);
					})}
				</ListGroup>
			</Container>

			<DemoFooter />
		</div>
	);
}
export default FilterPage;

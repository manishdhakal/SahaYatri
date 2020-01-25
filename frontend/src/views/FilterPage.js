import React, { useState, useEffect } from "react";
import url from "url.js";
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
	InputGroupText
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import ProfileCard from "../components/ProfileCard";
import axios from "axios";

function FilterPage(props) {
	const [searchType, setSearchType] = useState(props.history.location.type);
	let [searchKey, setSearchKey] = useState("");
	let [searchLocation, setSearchLocation] = useState("");
	let [searchItems, setSearchItems] = useState([
		{
			name: "Arman Chettri",
			description: "hero kto moh arman",
			location: "Hetauda"
		},
		{
			name: "Manish Dhakal",
			description:
				" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ratione!",
			location: "Syangja"
		}
	]);
	let [minPrice, setMinPrice] = useState(0);
	let [maxPrice, setMaxPrice] = useState(0);

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
		let keywords = searchKey.split(" ");
		// priority points
		// 10 points for name match
		// 2 points for each description match
		let priorityHash = {};
		searchItems.forEach((item, index) => {
			priorityHash[index.toString()] = 0;
			console.log(priorityHash);
			keywords.forEach(word => {
				let re = new RegExp(word, "ig");
				let matches = item.name.match(re);
				if (matches != null)
					matches.forEach(() => {
						priorityHash[index.toString()] += 10;
					});
				console.log(matches);
				matches = item.description.match(re);
				if (matches != null)
					matches.forEach(() => {
						priorityHash[index.toString()] += 2;
					});
				console.log(matches);
			});
			console.log(priorityHash);
		});
		let newSearchItems = searchItems.filter(
			(item, index) => !(priorityHash[index.toString()] === 0)
		);
		newSearchItems.sort((a, b) => {
			return (
				priorityHash[newSearchItems.indexOf(b)] -
				priorityHash[newSearchItems.indexOf(a)]
			);
		});
		if (searchLocation !== "") {
			newSearchItems = newSearchItems.filter(item => {
				return item.location === searchLocation;
			});
		}
		setSearchItems(newSearchItems);
	};

	useEffect(() => {
		axios
			.get(url + "/api/" + props.history.location.type)
			.then(resp => setSearchItems(resp.data));
	}, []);
	console.log(searchItems);
	return (
		<div>
			<div
				className="page-header section-dark"
				style={{
					backgroundImage:
						"linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(" +
						require("assets/img/village.jpg") +
						") ",
					height: "100px",
					width: "100%"
				}}
			>
				<ExamplesNavbar />
				<Container>
					<Form>
						<FormGroup>
							<Label
								for="Search"
								tag="h4"
								className="text-white font-weight-bold"
							>
								Search
							</Label>
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
								<Label
									for="minPrice"
									tag="h4"
									className="text-white font-weight-bold"
								>
									Location
								</Label>
								<InputGroup>
									<Input
										placeholder="places"
										type="select"
										onChange={e => {
											setSearchLocation(e.target.value);
										}}
									>
										<option value="">--Select--</option>
										{searchItems.map(item => (
											<option value={item.location}>
												{item.location}
											</option>
										))}
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
						<Button
							className="btn-round"
							color="neutral"
							type="button"
							onClick={search}
							outline
						>
							<i className="fa fa-search" />
							Search
						</Button>
					</Form>
				</Container>
			</div>
			<br />
			<Container>
				<ListGroup>
					{searchItems.map(item => {
						return (
							<ListGroupItem className="justify-content-between">
								<ProfileCard
									name={
										item.name
									} /**key={hostid}  info=host*/
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

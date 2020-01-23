import React, { useState } from "react";

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
	InputGroupAddon
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import ProfileCard from "../components/ProfileCard";

function FilterPage() {
	let [searchKey, setSearchKey] = useState("");
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

	return (
		<div>
			<div
				className="page-header section-dark"
				style={{
					background: "#42b3f5",
					height: "100px",
					width: "100%"
				}}
			>
				<ExamplesNavbar />
				<Container>
					<Form>
						<FormGroup>
							<Label for="Search">Search</Label>
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
								<Label for="minPrice">Minimum Price</Label>
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
								<Label for="maxPrice">Maximum Price</Label>
								<CustomInput
									type="range"
									id="maxPrice"
									name="maxPrice"
									onChange={handleMaxSliderChange}
									defaultValue="0"
								/>
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										Rs
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
							</FormGroup>
						</Container>
						<Button className="info" size="lg" onClick={search}>
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

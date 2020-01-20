import React, {useState} from 'react'
import {Form,Label, Input,FormGroup} from 'reactstrap'

const LogIn = (props)=>{
    const [user,setUser] = useState({name})

    return(
        <div>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>
            </Form>
        </div>
    )
}

export default LogIn
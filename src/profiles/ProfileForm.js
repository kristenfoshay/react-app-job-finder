import React, {useState, useContext} from "react";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router";


function ProfileForm({updateUser}) {
  const userContext = React.createContext()
  const user = useContext(userContext);
 
  const INITIAL_STATE = {
    
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email}
const [formData, setFormData] = useState(INITIAL_STATE);
 if(!user.username) {
    return <Redirect to="/login" />;
  }


const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))};
 async function handleSubmit(event){
     
    event.preventDefault();
    updateUser(user.username, formData);  
    setFormData(INITIAL_STATE )
    return <Redirect to="/" push />     
    
  
}








  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
        <Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label>Username: </Label>
        {/* <Input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} value={user.username}/> */}
        <p class="form-control-plaintext">{user.username}</p>
      </FormGroup>
        <FormGroup>
        <Label for="firstName">First Name: </Label>
        <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName}/>
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name: </Label>
        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
      </FormGroup>     
      <FormGroup>
        <Label for="email">Email: </Label>
        <Input type="email" name="email" id="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
      </FormGroup>
    
      
      <Button>Submit</Button>
    </Form>
        </CardBody>
      </Card>
    </section>
  );
}



export default ProfileForm;

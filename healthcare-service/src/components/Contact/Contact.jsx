// ContactForm.js

//import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import './contact.css' // Import the CSS file
import emailjs from '@emailjs/browser';
import React, { useRef,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFirebase from '../../Hooks/useFirebase';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Function definition
function handleContactForm() {
  // Function code here
  console.log("Handling contact form");
}

// Using the function
handleContactForm();

  
  //const {handleContactForm}=useFirebase()

  const handleSendMessage = () => {
    // Logic to send the message

    // Assuming the message is sent successfully
    handleContactForm(formData.name,formData.email,formData.message)

    
    // You can handle form submission logic here, like sending the data to a server or performing other actions
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_njthwfl', 'template_t3b6u6a', form.current, {
        publicKey: 'o0m8QOygQlfJ2gNKi',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Container className="form-container">
      <Typography variant="h4" gutterBottom>
        <center>Contact Us</center>
      </Typography>
      
      <form ref={form} onSubmit={sendEmail}>
        <TextField
          label="Name"
          variant="outlined"
          className="text-field"
          fullWidth
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          variant="outlined"
          className="text-field"
          fullWidth
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Message"
          variant="outlined"
          className="text-field"
          fullWidth
          multiline
          rows={4}
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" className="submit-button" onClick={handleSendMessage} >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Contact;

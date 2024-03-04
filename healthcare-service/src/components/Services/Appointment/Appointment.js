import { LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import swal from 'sweetalert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useAuth from '../../../Hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { user } = useAuth();
    const history = useHistory()

    // const [clearedDate, setClearedDate] = React.useState(null);
    const [value, setValue] = React.useState(new Date());

    // doctor name function
    const [docName, setDocName] = React.useState('');

    const handleChange = (event) => {
        setDocName(event.target.value);
    };

    const [diseaseName, setDiseaseName] = React.useState('');

    const handlerChange = (event) => {
        setDiseaseName(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/appointment/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({docname: docName, username: user.displayName, email: user.email, appointmentDate: value.toLocaleString(), problemtype: diseaseName})
            });

            const response = await res.json();

            if(response.status === 200) {
                // swalAlert()
                toast.success("Your Appointment is Done You will Receive a mail ASAP.", {position: 'top-center', autoClose: 500});
                setTimeout(() => {
                    history.push('/')
                }, 1000);
            }
        } catch (error) {
            alert(error.message)
        }
    }

    //swal alert
    const swalAlert = () => {
        return swal("Your Appointment is Done You will Receive a mail ASAP.", {
            button: true,
            icon: "success"
        });
    }
    return (
        <Box id='appointment'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
            <Container maxWidth="xl">
                <Typography variant='h6' sx={{
                    mt: 5, mb: 5
                }}>Select your time and data for Appointment</Typography>


                {/* set doctor name */}
                <FormControl sx={{ mb: 5, minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Select Doctor Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={docName}
                        onChange={handleChange}
                        autoWidth
                        label="Select Doctor Name"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Lee S. Williamson"}>Lee S. Williamson</MenuItem>
                        <MenuItem value={"Greg S. Grinstead"}>Greg S. Grinstead</MenuItem>
                        <MenuItem value={"Roger K. Jackson"}>Roger K. Jackson</MenuItem>
                        <MenuItem value={"Frank T. Grimsley"}>Frank T. Grimsley</MenuItem>
                        <MenuItem value={"Rudolph V. Spitler"}>Rudolph V. Spitler</MenuItem>
                        <MenuItem value={"Erik R. Faulkner"}>Erik R. Faulkner</MenuItem>
                        <MenuItem value={"Phillip L. Williams"}>Phillip L. Williams</MenuItem>
                        <MenuItem value={"Johnny R. Atterberry"}>Johnny R. Atterberry</MenuItem>
                        <MenuItem value={"Michael I. Johnson"}>Michael I. Johnson</MenuItem>
                    </Select>
                </FormControl>
                <TextField sx={{ mb: 2 }} value={user.displayName} fullWidth label="Your Name" id="fullWidth" />
                <TextField sx={{ mb: 2 }} value={user.email} fullWidth label="Your Mail" id="fullWidth" />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <MobileDateTimePicker
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            label="Appointment Date"
                            onError={console.log}
                            minDate={new Date('2018-01-01T00:00')}
                            inputFormat="yyyy/MM/dd hh:mm a"
                            mask="___/__/__ __:__ _M"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                
                <FormControl sx={{ mt: 5,mb: 5, minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Select Problem Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={diseaseName}
                        onChange={handlerChange}
                        autoWidth
                        label="Select Problem Type"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
                        <MenuItem value={"Neurology"}>Neurology</MenuItem>
                        <MenuItem value={"Stomach"}>Stomach</MenuItem>
                        <MenuItem value={"Covid 19"}>Covid 19</MenuItem>
                        <MenuItem value={"Bronchus"}>Bronchus</MenuItem>
                        <MenuItem value={"Covid vaccine"}>Covid vaccine</MenuItem>
                        <MenuItem value={"OPD"}>OPD</MenuItem>
                        <MenuItem value={"Infectious disease"}>Infectious disease</MenuItem>
                        <MenuItem value={"Cancer"}>Cancer</MenuItem>
                    </Select>
                    
                </FormControl>
               


                <Button sx={{ p: 1, mt: 2, mb: 5 }} onClick={handleSubmit} fullWidth
                    variant="contained"><AddCircleIcon /> Confirm</Button>
            </Container>
        </Box>
    );
};

export default Appointment;
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UserProfile = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const res = await fetch("http://localhost:5000/api/appointment/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });

    const response = await res.json();
    setAppointments(response);
  };

  useEffect(() => {
    (async () => {
      await getAppointments();
    })();
  }, []);
  console.log(appointments);

  return (
    <>
      <Card
        sx={{
          display: { xs: "flex-wrap", md: "flex" },
          maxWidth: "600px",
          my: 8,
          mx: "auto",
          p: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Welcome to our Hospital, {user.displayName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {user.email}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <Avatar
          sx={{
            mx: { xs: "auto", md: 1 },
            border: 1,
            borderColor: "#f48fb1",
            boxShadow: 1,
            bgcolor: pink[500],
            width: 150,
            height: 150,
          }}
          alt={user.displayName}
          src={user.photoURL}
        />
      </Card>

      <Container maxWidth={{ lg: "200px" }} style={{ padding: "20px" }}>
        <Typography
          component="div"
          variant="h4"
          style={{ padding: "20px 4px" }}
        >
          Appointments
        </Typography>
        {appointments.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Doctor Name</TableCell>
                  <TableCell align="right">Problem Type</TableCell>
                  <TableCell align="right">Appointment Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow
                    key={appt._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {appt.docname}
                    </TableCell>
                    <TableCell align="right">{appt.problemtype}</TableCell>
                    <TableCell align="right">{appt.appointmentDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            component="div"
            variant="h6"
            style={{ padding: "20px 4px" }}
          >
            No Appointments
          </Typography>
        )}
      </Container>
    </>
  );
};

export default UserProfile;

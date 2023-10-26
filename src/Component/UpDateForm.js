import React, { useState} from "react";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from "../UI/modal";

const theme = createTheme();

const UpDateDetails = (props) => {

    const fullName = props.data.fullName;
    const Age = props.data.age;
    const [name, setName] = useState(fullName);
    const [age, setAge] = useState(Age);

    const nameHandler = event => {
        setName(event.target.value);
    };
    const ageHandler = event => {
        setAge(event.target.value);
    };

    const handleSubmit =async (event) => {
        const formdata = new FormData();
            formdata.append("fullName", name);       
            formdata.append("age", age);
            formdata.append("userId",props.data._id)
            let result = await fetch("http://localhost:9000/updatedetails",{
                method:"PUT",
                body: formdata
            });
            result = result.json();
            console.log(result)       
    }

    return(
        <Modal>
        <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        component="form" onSubmit={handleSubmit} noValidate >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fName"
                            label="Full Name"
                            name="fName"
                            autoComplete="fName"
                            value={name}
                            autoFocus
                            onChange={nameHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                            autoComplete="age"
                            value={age}
                            onChange={ageHandler}
                        />
                        <label >Image</label>
                        <input type="file" accept='image/*' id='image' name='image' 
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Back
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
            </Modal>
    )
};


export default UpDateDetails;
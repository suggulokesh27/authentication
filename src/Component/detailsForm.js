import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UpDateDetails from './UpDateForm';
import "../App.css"

const theme = createTheme();

const DetailsForm = () => {

    const [image, setImage] = useState();
    const [show, setShow] = useState({ Show: false, Udata: null });
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const itemsPerPage = 2;
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [message, setMessage] = useState('')

    const nameHandler = event => {
        setName(event.target.value);
    };
    const imageHandler = event => {
        setImage(event.target.files[0]);
    };
    const ageHandler = event => {
        setAge(event.target.value);
    };

    const userID = localStorage.getItem("userId");
    const params = useParams();

    const handleSubmit = async (event) => {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("age", age);
        formData.append("fullName", name);
        formData.append("userID", userID)
        console.log(formData)

        let result = await fetch("http://localhost:9000/postuserdata", {
            method: "POST",
            body: formData,
        });
        result = result.json();
        console.log("result", result)
    };

    const paginationFetch = () => {
        fetch(`http://localhost:9000/getdata/${params.id}?page=${currentPage}&pageSize=${itemsPerPage}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message)
                setPageCount(data.pageCount)
                setItemsToDisplay(data.data);

            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        paginationFetch()
    }, [currentPage, params.id]);

    const pageHandler = (index) => {
        setCurrentPage(index);
    };

    const shownUpdateForm = (data) => {
        setShow({ Show: true, Udata: data })
        console.log(data)
    };

    const deleteForm = async data => {
        let result = await fetch(`http://localhost:9000/deletepost/${data._id}`, {
            method: "DELETE"
        })
        result = await result.json();
        console.log(result);
        return (
            paginationFetch()
        )
    }

    return (
        <center>
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
                            onChange={ageHandler}
                        />
                        <label >Image</label>
                        <input type="file" accept='image/*' id='image' name='image' onChange={imageHandler} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
            {!message ?
                <div>
                    <div style={{ "display": "inline", "padding": "1px" }} >
                        <Button onClick={() => { pageHandler(currentPage - 1) }}
                            disabled={currentPage === 0}>Prev</Button>

                        {Array(pageCount).fill(null).map((page, index) => (
                            <button key={index}
                                onClick={() => { pageHandler(index) }}
                                className={`${currentPage === index ? "btn_atv" : "btn"}`}>
                                {index + 1}
                            </button>
                        ))}

                        <Button onClick={() => { pageHandler(currentPage + 1) }}
                            disabled={currentPage === pageCount - 1}
                            className="btn">Next</Button>
                    </div>

                    <div>
                        {itemsToDisplay.map((data, index) => (
                            <div key={data._id} style={{ "margin": "30px", "border": "solid 1px black", "padding": "50px", }}>
                                <h2> Full Name: {data.fullName}</h2>
                                <h4> Age: {data.age}</h4>
                                <img src={`http://localhost:9000/${data.image}`}
                                    width="300px"
                                    height="400px"
                                    alt={data.fullName}
                                />
                                <button onClick={() => shownUpdateForm(data)}>
                                    UpDate
                                </button>
                                <button onClick={() => deleteForm(data)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div> : <h2>{message}</h2>}
            {show.Show ? <UpDateDetails data={show.Udata} /> : null}
        </center>
    )
};


export default DetailsForm;
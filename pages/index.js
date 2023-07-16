import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
// import Button from "@material-ui/core/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import { Button, FormLabel } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormSubmission from "./FormSubmission";
export default function Home() {
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  function handleSubmit() {
    return router.push("./form");
  }
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState([""]);
  // console.log(questions,"questions")
  // localStorage.setItem("questions",JSON.stringify(questions));
  const addQuestion = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([
        ...questions,
        { question: currentQuestion, options: [...currentOptions] }
      ]);
      setCurrentQuestion("");
      setCurrentOptions([""]);
    }
    localStorage.setItem("questions",JSON.stringify(questions));
    // router.push("./FormSubmission")
  };

  const addOption = () => {
    setCurrentOptions([...currentOptions, ""]);
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = e.target.value;
    setCurrentOptions(updatedOptions);
  };
  const removeOption = (index) => {
    const updatedOptions = [...currentOptions];
    updatedOptions.splice(index, 1);
    setCurrentOptions(updatedOptions);
  };
  return (
    <>
      <h1>Form builder Task</h1>
      <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
        Click to create the form{" "}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Form</DialogTitle>
        <DialogContent>
        <div>
        <label style={{fontSize:"20px"}}>Question:</label><br/>
        {/* <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        /> */}
         <TextField
          style={{ width: "500px", margin: "5px" }}
          label="Question"
          variant="outlined"
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
        {/* <button onClick={addQuestion}>Add Question</button> */}
      </div>
      <br/>
      <div style={{fontSize:"20px"}}>Option type:</div>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-helper-label">Option Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Option Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"checkbox"}>Checkbox</MenuItem>
          <MenuItem value={"paragraph"}>Paragraph</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      
      {age==="checkbox" && 
      <div>
      <br/>
        <label style={{fontSize:"20px"}}>Options:</label>
        {currentOptions.map((option, index) => (
          <div key={index}>
            {/* <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
            /> */}
           
            <TextField
              style={{ width: "400px" }}   
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e)}/>
               {index>0 && <Button onClick={removeOption}>Delete</Button>}
          </div>
        ))}
        <br/>
        <Button  variant="outlined" onClick={addOption}>Add Option</Button>
      </div>
      }
      <br/>

  <button  onClick={addQuestion}>Add Question</button>
  {/* <Button  onClick={addQuestion} Button variant="contained" color="primary" size="large">Add Question</Button> */}
      {/* <h3>Form Preview:</h3> */}
      {/* {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <ul>
            {q.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
        </div>
      ))} */}
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {questions[0] && 
  <FormSubmission questions={questions} para={age}/>}
    </>
  );
}

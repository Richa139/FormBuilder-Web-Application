import { TextField } from "@mui/material";
import React, { useState } from "react";

const FormSubmission = ({ questions, para }) => {
  const [answers, setAnswers] = useState([]);
  const [currentanswer, setCurrentanswer] = useState([]);
  const [currentQuestion, setCurrentquestion] = useState("");
  //    const questions=JSON.parse(localStorage.getItem("questions"))
  const [cv,setcv]=useState("");
  const [b,setb]=useState("");
  console.log(cv,"cccccc")
  console.log(answers, "=answers===========", currentanswer,"currentanswer");
//   const [formData, setFormData] = useState({
//     question1: '',
//     question2: '',
//     question3: ''
//   });
//   const handleChange=(event)=>{
//     const {name , value}=event.target;
//     setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value
//       }));
//   }

  const submitForm = () => {
   
    // setAnswers([
    //   ...answers,
    //   { answer: currentanswer, question: currentQuestion },
    // ]);
    // setAnswers([]);
    
    setAnswers([
        ...answers,
        {answer:currentanswer}
    ])
  };
  const handleChange=(e , q)=>{
    e.preventDefault();
    console.log(e.target.name , e.target,"e=====")
    const {name , value}=e.target;
    // setCurrentanswer(e.target.value),
    // setCurrentquestion(q.question)
    const an=e.target.value;
    const nm=e.target.name;
    setcv(e.target.value);
    setb(e.target.name);
    setCurrentanswer((prevans)=>([
        // ...prevans,
        // ...answers,
       { [nm]:cv}
    ]))
  }
  return (
    <div>
      <h2>Form Submission</h2>
      {questions.map((q, index) => (
        <div key={index}>
          <p>Questions:- {q.question}</p>
          <p>Answers:-</p>
          {q.options[0] == [] ? (
            <>
              {/* <p>Answers:- </p> */}
              <TextField
            //   defaultValue={""}
                name={q.question}
                // value={currentanswer}
                defaultValue={currentanswer}
                // onChange={
                //   ((e) => {setCurrentanswer(e.target.value),
                //   setCurrentquestion(q.question)})
                // }
                onChange={(e)=>handleChange(e,q.question)}
              ></TextField>
            </>
          ) : (
            <ul style={{ listStyleType: "none" }}>
              <>
                {/* <p>Answers:-</p> */}
                {q.options.map((option, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={
                  ((e) => {setCurrentanswer(e.target.value),
                  setCurrentquestion(q.question)})
                }
                    />
                    {option}
                  </li>
                ))}
              </>
            </ul>
          )}
        </div>
      ))}
      {/* {questions.map((q)=>{
        <>
        <p>{q.question}</p>
        <TextField>dfff</TextField>
        </>
      })} */}
      <button onClick={submitForm}>Submit Form</button>

      <h3>Review Answers:</h3>
      {currentanswer?.map((answer, index) => (
        <div key={index}>
          <p> Question:-  {answer.question}</p>
          <p>Answer:- {answer[index]}</p>
        </div>
      ))}
       
      
    </div>
  );
};

export default FormSubmission;

import React ,{useState} from 'react';
import Header from "../../../components/Header";
import {Button,makeStyles} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  
  button: {
    borderRadius: "25px",
    marginRight: "15px",
    fontSize: "12px",
    float:'right',
    padding:'6px 18px',
    backgroundColor:'grey',
    '&:hover':{
      backgroundColor:'lightgrey'
    }
  }
  
}));

const PreviewQuizScreen = ({data}) => {
  const classes = useStyles();
    const dummyData=[
        {id:0,question:'What is MIndfullness?',answers:['This is Option One','This is B Option','This is C option','This is D Option']},
        {id:1,question:'What is It?',answers:['This is Option One','This is B Option','This is C option','This is D Option']},
        {id:2,question:'What is ss?',answers:['This is Option One','This is B Option','This is C option','This is D Option']},
        {id:3,question:'What is REact?',answers:['This is Option One','This is B Option','This is C option','This is D Option']},
        {id:4,question:'What is MongoDb?',answers:['This is Option One','This is B Option','This is C option','This is D Option']}
    ]
    const [questions,setQuestions]=useState(data?data:dummyData);
    const [attempt,setAttempt]=useState({})
    const [currentQuestion,setCurrentQuestion]=useState(null)
    const handleChoose=(e)=>{
     
setAttempt({...attempt,[currentQuestion]:e.value})
    }
    const handleFinish=()=>{
console.log(attempt)
    }

    const handleCurrentQuestion=(e)=>{
      setCurrentQuestion(e)
    }
    return ( <>
      <Header />
      <main>
        <div className="dash-wrapper" style={{paddingTop: '0 !important'}}>
          <div className="row preview-questions-grid">
            <div className="view-questions-box">
              <div className="view-questions-box-title">CFG for secondary school</div>
              <div className="questions-list">
{questions.map((q,i)=>(
                <div className="view-question" onMouseEnter={()=>handleCurrentQuestion(q.id)}>
                  <div className="view-questions-title">{i+1}) {q.question}</div>
                  <div style={{display:'flex',flexDirection:'column'}}>
                  {q.answers.map((a)=>(
                      <button  className="view-questions-option" style={{textAlign:'left',backgroundColor:(attempt[q.id]==a)?'lightgrey':'transparent'}} name={q.question} value={a} onClick={(e)=>handleChoose(e.target)}>{a}</button>
                
                  ))}
                  </div>
                </div>
                ))}
              </div>
              
            </div>
            <div style={{margin:'20px 0'}}>
              <Button 
              onClick={handleFinish}
              variant="contained" color="secondary"
          className={classes.button}
          startIcon={<CheckCircleIcon />}>Finish</Button>
          </div>
          </div>
        </div>
      </main>  </> );
}
 
export default PreviewQuizScreen;
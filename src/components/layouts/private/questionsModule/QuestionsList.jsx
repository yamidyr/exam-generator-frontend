import Grid from '@mui/material/Grid2';
import QuestionItem from "./QuestionItem.jsx"

const questions = [
    {
    creation_date: "11/11/11",
    user: "Yamid Yela",
    description: "Esta es una pregunta para el primer parcial bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blav", 
    subject: "Álgebra Lineal",
    term: "11"
    },
    {
        creation_date: "10/10/10",
        user: "Yamid Yela",
        description: "Esta es otra pregunta para el primer parcial ",
        subject: "Álgebra Lineal",
        term: "11"
    },
    {
        creation_date: "12/12/12",
        user: "Yamid Yela",
        description: "Esta es una tercera bla bla bla bla bla bla bla bla bla bla bla bla blav",
        subject: "Álgebra Lineal",
        term: "11"
    }
]

export const QuestionsList = () => {
  return (
    <Grid container spacing={1} >
        {questions.map((question,key) => {
            return <QuestionItem key={key}
            creation_date={question.creation_date}
            user={question.user}
            description = {question.description}
            subject = {question.subject}
            term = {question.term}
            />
        })}
      </Grid>
  )
}

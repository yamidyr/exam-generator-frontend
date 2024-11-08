import Grid from '@mui/material/Grid2';
import QuestionItem from "./QuestionItem.jsx"
import PropTypes from 'prop-types';


export const QuestionsList = ({questions=[]}) => {
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

QuestionsList.propTypes = {
    questions: PropTypes.object
}

import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import ExamItem from './ExamItem.jsx';


export const ExamsList = ({exams=[]}) => {
  return (
    <Grid container spacing={1} >
        {exams.map((exam,key) => {
            return <ExamItem key={key}
            creation_date={exam.creation_date}
            user={exam.user}
            description = {exam.description}
            subject = {exam.subject}
            term = {exam.term}
            />
        })}
      </Grid>
  )
}

ExamsList.propTypes = {
    exams: PropTypes.array
}

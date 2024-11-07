import DashBoardPanel from "../../common-Layouts/DashBoardPanel.jsx"
import QuestionItem from "./QuestionItem.jsx"
const question = {
  creation_date: "11/11/11", 
  user: "Yamid Yela", 
  description: "Esta es una pregunta para el primer parcial bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blav", 
  subject: "Álgebra Lineal", 
  term: "11"
}


export const QuestionsModule = () => {
  return (
    <DashBoardPanel>
        <QuestionItem 
          creation_date={question.creation_date} 
          user={question.user}
          description = {question.description}
          subject = {question.subject}
          term = {question.term}
          />
        <QuestionItem 
          creation_date={question.creation_date} 
          user={question.user}
          description = {question.description}
          subject = {question.subject}
          term = {question.term}
          />
          <QuestionItem 
          creation_date={question.creation_date} 
          user={question.user}
          description = {question.description}
          subject = {question.subject}
          term = {question.term}
          />
    </DashBoardPanel>
  )
}

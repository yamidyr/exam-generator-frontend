import { QuestionsList } from "./QuestionsList"

const questions = [//TODO: Estas preguntas son traidas desde la base de datos
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

export const QuestionsFilter = () => {
  return (
    <QuestionsList questions = {questions}/>
  )
}

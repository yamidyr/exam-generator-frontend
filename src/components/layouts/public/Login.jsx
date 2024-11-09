import { Link } from "react-router-dom"


export const Login = () => {
  return (
    <>
    <div>
        <h1>Login here</h1>
    </div>
    <Link to = "http://localhost:5173/dashboard/preguntas">
      <button>Hola dashboard</button>
    </Link>
    </>
  )
}

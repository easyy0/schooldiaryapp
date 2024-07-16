import { Helmet } from "react-helmet-async"
import LoginForm from "../components/LoginForm"

function Login() {
  return (
    <>
      <Helmet>
        <title>School Diary App | Login</title>
      </Helmet>

      <LoginForm/>
    </>
  )
}

export default Login
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';


export const Login = () => {

const navigate = useNavigate();

// Estado para manejar mensajes de error:
const [errorMessage, setErrorMessage] = useState("");

// Estado para obtener los datos desde el formulario
const { form, changed, resetForm } = useForm({ id_number: "", password: "" });

// Estado para validar si el usuario se identificó correctamente
const [logged, setLogged] = useState("not logged");

// Estado para setear los valores del token y usuario en el contexto de la aplicación
const setAuth = useAuth();


const loginUser = async (e) => {
  // prevenir que se actualice el navegador
  e.preventDefault();

  // Obtener los datos del formulario
  let userToLogin = form;

  // Petición al backend
  const request = await fetch(Global.url + "user/login", {
    method: "POST",
    body: JSON.stringify(userToLogin),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Obtener la información retornada por la petición
  const data = await request.json();

  if (data.status == "success") {
    // Guardar los datos del token y usuario en el localstorage del navegador
    localStorage.setItem("token", data.token);
    // Asegurarse de almacenar el usuario en formato JSON
    localStorage.setItem("user", JSON.stringify(data.userBD)); 

    // Seteamos la variable de estado logged si se autenticó correctamente el usuario
    setLogged("logged");

    // Seteamos los datos del usuario en el Auth
    setAuth(data.userBD);

    // Limpiar el formulario
    resetForm();

    // Redirección
    navigate("/dashboard");

    // Forzar una recarga
    Window.location.reload();

  } else {
    // Seteamos la variable de estado logged si no se autenticó el usuario
    setLogged("error");

    // Seteamos la variable de mensaje de error con el error devuelto:
    setErrorMessage(data.message);
  }
};

  return (
    <main>
      {/* Mensajes para el usuario. TODO: Cambiar estilos*/}
      {logged == "logged" ? (
            <strong className="alert alert-success">
              ¡Usuario autenticado correctamente!
            </strong>
          ) : (
            ""
          )}
      {logged == "error" ? (
            <strong className="alert alert-danger">
              {errorMessage}
            </strong>
          ) : (
            ""
          )}
      <CssBaseline/>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>¡Bienvenido!</b>
          </Typography>
          <Typography level="body-sm">Acceda para continuar</Typography>
        </div>
        <FormControl>
          <FormLabel>Documento de identidad</FormLabel>
          <Input
            // html input attribute
            name="id_number"
            type="text"
            placeholder="Usuario"
            value = {form.id_number}
            onChange={changed}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            value = {form.password}
            onChange = {changed}
            required
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }} onClick={loginUser}>Continuar</Button>
        <Typography
          endDecorator={<Link href="/sign-up">Registrarse</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          ¿No tiene una cuenta?
        </Typography>
      </Sheet>
    </main>
  );
}

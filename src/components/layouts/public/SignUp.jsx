import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Global } from '../../../helpers/Global';
import { useForm } from '../../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

// Listas y variables de prueba: TODO: limpiar después
const subjects = [ // TODO: Esto hay que traerlo de la base de datos
  {
    name: "-MATERIAS-",
    displayed_name: "-Materia-"
  },
  {
    name: "MATEMATICAS",
    displayed_name: "Matemáticas"
  },
  {
    name: "INGLES",
    displayed_name: "Inglés"
  },
  {
    name: "ESPAÑOL",
    displayed_name: "Español"
  }
  ]

export default function SignUp() {

    // Desde aquí código de la profe

  // Usar el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({});

  // Estado para mostrar el resultado del registro del user en la BD
  const [ saved, setSaved ] = useState("not sended");

  // Hook para redirigir
  const navigate = useNavigate();

  // Método Guardar un usuario en la BD
  const saveUser= async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Obtener los datos del formulario
    let newUser = {
      name: `${form.name.trim()} ${form.first_lastname.trim()} ${form.second_lastname.trim()}`,
      id_number:form.id_number,
      subject_name: form.subject_name,
      password: form.password
    };

    // Petición a la API (Backend) para guardar el usuario en la BD
    const request = await fetch(Global.url + 'user/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Obtener la información retornada por el backend
    const data = await request.json();

    // Verificar si el estado de la respuesta es "created" seteamos la variable de estado saved con "saved"
    if(request.status === 201 && data.status === "created"){
      setSaved("saved");

    } else {
      setSaved("error");
    };
  };

  // Hasta aquí código de la profe



  return (
    <>
      {/** Formulario para llenar los datos del nuevo usuario */}
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "400px",
          mx: "auto",
        }}
      >
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Registro de nuevo usuario
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          {/** input para los nombres del usuario */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Nombres</FormLabel>
            <Input type="text" name="name" value={form.name} onChange={changed}/>
          </FormControl>
          {/** input para el primer apellido */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Primer apellido</FormLabel>
            <Input type="text" name="first_lastname" value={form.first_lastname} onChange={changed} />
          </FormControl>
          {/** input para el segundo apellido */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Segundo apellido</FormLabel>
            <Input type="text" name= "second_lastname" value = {form.second_lastname} onChange={changed}/>
          </FormControl>
          {/** input para el número del documento de identidad */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Documento de identidad</FormLabel>
            <Input type="text" name = "id_number" value={form.id_number} onChange={changed}/>
          </FormControl>
          {/** input para escoger la materia que dicta el profesor */}
          <FormControl>
            <InputLabel id="label-subjects">Materia</InputLabel>
            <Select
              labelId="label-subjects"
              id="label-subjects"
              name = "subject_name"
              value={form.subject_name || '-MATERIAS-'}
              label="subject"
              size='small'
              onChange={changed}
            >
              {/** Desplegamos las materias disponibles guardadas en la base de datos */}
              {subjects.map((subject) => {
                return (
                  <MenuItem value={subject.name} key={subject.name}>
                    {subject.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/** input para la contraseña del usuario */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" name = "password" value={form.password} onChange={changed}/>
          </FormControl>
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid" color="primary" onClick={saveUser}>
              Registrar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

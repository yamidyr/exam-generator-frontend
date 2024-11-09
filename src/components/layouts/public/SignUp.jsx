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

// Listas y variables de prueba: TODO: limpiar después
const subjects = [ // TODO: Esto hay que traerlo de la base de datos
  {
      nombre: "MATERIAS",
      displayed_name: "-Materia-"
  },
  {
      nombre: "MATEMATICAS",
      displayed_name: "Matemáticas"
  },
  {
      nombre: "INGLES",
      displayed_name: "Inglés"
  },
  {
      nombre: "ESPAÑOL",
      displayed_name: "Español"
  }
  ]

export default function SignUp() {

    // Se definen las variables de estado para los filtros:

    // variable de estado para las materias
    const [subject, setSubject] = useState('-Materia-');


    // Se setean las variables de estado de acuerdo a los inputs:
    // función para manejo del selector de materias
    const handleSubjectSelector = (event) => {
      setSubject(event.target.value);
    };

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
            <Input type="text" />
          </FormControl>
          {/** input para el primer apellido */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Primer apellido</FormLabel>
            <Input type="text" />
          </FormControl>
          {/** input para el segundo apellido */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Segundo apellido</FormLabel>
            <Input type="text" />
          </FormControl>
          {/** input para el nombre de usuario */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input type="text" />
          </FormControl>
          {/** input para el correo electrónico del usuario */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="text" />
          </FormControl>
          {/** input para escoger la materia que dicta el profesor */}
          <FormControl>
            <InputLabel id="label-subjects">Materia</InputLabel>
            <Select
              labelId="label-subjects"
              id="label-subjects"
              value={subject}
              label="subject"
              size='small'
              onChange={handleSubjectSelector}
            >
              {/** Desplegamos las materias disponibles guardadas en la base de datos */}
              {subjects.map((subject) => {
                return (
                  <MenuItem value={subject.displayed_name} key={subject.nombre}>
                    {subject.displayed_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/** input para la contraseña del usuario */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" />
          </FormControl>
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid" color="primary">
              Registrar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

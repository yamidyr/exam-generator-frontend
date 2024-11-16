import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import axios from "axios";
import { ClassSharp } from "@mui/icons-material";

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

const terms = [ // Esto posiblemente quede hardcodeado
  {
      value: "-Grado-"
  },
  {
      value: "6"
  },
  {
      value: "7"
  },
  {
      value: "8"
  }
  ]



export const GenerateExam = () => {

    // Se definen las variables de estado para obtener los datos del examen que será creado:
    // variable de estado para la materia
    const [subject, setSubject] = useState('-Materia-');

    // variable de estado para el grado
    const [term, setTerm] = useState('-Grado-');

  // Se setean los métodos para manejar los eventos de los inputs y setear las variables de estado respectivas:

    // Método para manejo del selector de materias
    const handleSubjectSelector = (event) => {
      setSubject(event.target.value);
    };

    // Método para el manejo del selector de grados:
    const handleTermSelector = (event) => {
        setTerm(event.target.value);
    }

    const generateExam = async () => {

      const faketoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NzMxN2U1NzU1NWU4MmMzNDgyNGZiNGIiLCJyb2xlIjoiZG9jZW50ZSIsImlhdCI6MTczMTM1NzQzMiwiZXhwIjoxNzMxOTYyMjMyfQ.Q5QP0F1JKFQDurQpcX2yu1ygaU450XgwpDouXipAf4o'

      // Traemos las preguntas desde la base de datos:
      const requestQuestions = await fetch(Global.url + "question/get-all-questions/1?&limit=100", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": faketoken
        },
      });
      // Obtener la información retornada por la petición
      const dataQuestions = await requestQuestions.json();
      const questionsList = dataQuestions.questions;

      let arrayQuestions = [];

      for(let i=0;i<questionsList.length;i++){
        arrayQuestions.push({
          content: questionsList[i].content
        })
      }

      // Hacemos la petición para crear el examen
      const downloadPDF = async () => {
        const axiosConfig = {
          responseType: 'arraybuffer',
          body: JSON.stringify(arrayQuestions),
          headers:{
            Accept: 'application/json'
          }
        }
        axios.post(Global.url + 'exam/generate-exam', axiosConfig).then((response) => {
          // esta respuesta contiene el archivo pdf
          // ahora se descarga
          const url =  window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'exam.pdf');
          document.body.appendChild(link);
          link.click();
        }).catch((error) => {
          console.log("error al descargar: ",error.message);
        })
      }

      await downloadPDF();

    }

  return (
    <>
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {/** Texto de la explicación */}
        <Grid size= {12}>
            Al hacer click en el botón Generar examen, se creará un examen con las opciones elegidas.
            El examen se creará con preguntas seleccionaddas de manera aleatoria desde el banco de preguntas
            de acuerdo a las opciones siguientes.
        </Grid>
        {/** los siguientes grid contienen los inputs para obtener las info del examen que será creado */}
        <Grid size={12}>
          Nivel de las preguntas:
        </Grid>
        {/** input para elegir el número de preguntas de bajo nivel */}
        <Grid size={2}>
          <FormGroup>
            <InputLabel>
              Bajo:
            </InputLabel>
          <TextField
            id = "basic-level-questions"
            variant = "outlined"
            type="number"
            defaultValue={1}
          />
          </FormGroup>
        </Grid>
        {/** input para elegir el número de preguntas de nivel medio */}
        <Grid size={2}>
          <FormGroup>
            <InputLabel>
              Medio:
            </InputLabel>
          <TextField
            id = "mid-level-questions"
            variant = "outlined"
            type="number"
            defaultValue={1}
          />
          </FormGroup>
        </Grid>
        {/** input para elegir el número de preguntas de nivel alto */}
        <Grid size={2}>
          <FormGroup>
            <InputLabel>
              Alto: 
            </InputLabel>
          <TextField
            id = "hard-level-questions"
            variant = "outlined"
            type="number"
            defaultValue={1}
          />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
    <br />
    <Box>
      <Grid container spacing={2}>
        {/**input para elegir materia */}
        <Grid size = {4}>
            <FormControl>
              <InputLabel id="label-subjects">Materia</InputLabel>
              <Select
                labelId="label-subjects"
                id="label-subjects"
                value={subject}
                label="subject"
                onChange={handleSubjectSelector}
              >
                {/** Desplegamos las materias disponibles guardadas en la base de datos */}
                {subjects.map((subject) => {
                  return (
                    <MenuItem
                      value={subject.displayed_name}
                      key={subject.nombre}
                    >
                      {subject.displayed_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
        </Grid>
        {/** input para  el grado */}
        <Grid size = {4}>
          <FormControl>
            <InputLabel id="label-terms">Grado</InputLabel>
            <Select
              labelId="label-term"
              id="label-term"
              value={term}
              label="term"
              onChange={handleTermSelector}
            >
              {/** Desplegamos los grados disponibles */}
              {terms.map((term) => {
                return (
                  <MenuItem value={term.value} key={term.value}>
                    {term.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        {/** Área de texto para añadir la descripción del examen */}
        <Grid size={12}>
                <TextField
                  fullWidth
                  id="exam-description"
                  label="Breve descripción"
                  multiline
                  rows={2}
                  defaultValue=""
                />
              </Grid>
      </Grid>
    </Box>
    <br />
    <Box>
      <Grid container>
        <Grid offset='auto'>
              <Button variant="contained" onClick={generateExam}>
                Generar examen
              </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

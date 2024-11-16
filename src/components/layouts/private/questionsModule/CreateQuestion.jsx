import { useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid2';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Stack from '@mui/material/Stack';
import { useForm } from "../../../../hooks/useForm";
import { Global } from "../../../../helpers/Global";
import Swal from "sweetalert2";


//Ejemplo de las frutas para ver si se usa para las posibles respuestas: se busca así: TODO: limpiar fruits
const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];

function renderItem({ item, handleRemoveFruit }) { //TODO: limpiar fruits
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveFruit(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}


// Listas y variables de prueba: TODO: limpiar después

const subjects = [ // TODO: Esto hay que traerlo de la base de datos
  {
      name: "-Materia-",
      displayed_name: "-Materia-"
  },
  {
      name: "MATEMATICAS",
      displayed_name: "MATEMATICAS",
      subject_id: '67321b1cf0a19973cf077cc0'
  },
  {
      name: "INGLES",
      displayed_name: "INGLES",
      subject_id: '67380746cb1d36b5d14e9767'
  },
  {
      name: "ESPAÑOL",
      displayed_name: "ESPAÑOL",
      subject_id: '67380755cb1d36b5d14e976a'
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

const levels = [
  {
    id : "1",
    displayedName: "Fácil"
  },
  {
    id : "2",
    displayedName: "Medio"
  },
  {
    id : "3",
    displayedName: "Dificil"
  }
]

const topics = [
  {
    name: "-Tópico-"
  },
  {
    name: "Sistemas de ecuaciones",
    id: "67382e9936834944e8b15a4f"
  },
  {
    name: "Casos de factorización",
    id: "67382ec036834944e8b15a53"
  },
  {
    name: "Identidades trigonométricas",
    id: "67321b1cf0a19973cf077cc0"
  }
]


export const CreateQuestion = () => {

  // Variable de estado para la viñeta de tipo Icfes o Abierta
  const [tab, setTab] = useState('1');

  // Método para setear la variable del cambio de viñeta
  const handleTab = (event, newTab) => {
    setTab(newTab);
  };



    // Lo siguiente es un ejemplo para poder hacer las posibles respuestas // TODO: limpiar fruits
    const [fruitsInBasket, setFruitsInBasket] = useState(
      FRUITS.slice(0, 3)
    );

    const handleAddFruit = () => { // TODO: limpiar fruits
      const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
      if (nextHiddenItem) {
        setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
      }
    };

    const handleRemoveFruit = (item) => { // TODO: limpiar fruits
      setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
    };

    const addFruitButton = ( //TODO: limpiar fruits
      <Button
        variant="contained"
        disabled={fruitsInBasket.length >= FRUITS.length}
        onClick={handleAddFruit}
      >
        Agregar posible respuesta
      </Button>
    );


  // Desde aquí código de la profe

  // Usar el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({});

  // Estado para mostrar el resultado del registro del user en la BD
  //const [ saved, setSaved ] = useState("not sended");


  // Método Guardar un usuario en la BD
  const saveQuestion= async (e) => {

    // Prevenir que se actualice la pantalla
    e.preventDefault();

    console.log("data form: " , form)

    // construimos la pregunta que será enviada en la petición
    let newQuestion = {
      type: "abierta",
      term: form.term,
      content: form.content,
      topic_id: topics.filter(t => t.name == form.topic_name)[0].id,
      subject_id: subjects.filter(s => s.name == form.subject_name)[0].subject_id,
      description: form.description
    };

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NzMxN2U1NzU1NWU4MmMzNDgyNGZiNGIiLCJyb2xlIjoiZG9jZW50ZSIsImlhdCI6MTczMTM1NzQzMiwiZXhwIjoxNzMxOTYyMjMyfQ.Q5QP0F1JKFQDurQpcX2yu1ygaU450XgwpDouXipAf4o'

    //Imprimimos el newQuestion para ver cómo va
    console.log("newQuestion: ", JSON.stringify(newQuestion));

    // Petición a la API (Backend) para guardar el usuario en la BD
    const request = await fetch(Global.url + 'question/create-question', {
      method: 'POST',
      body: JSON.stringify(newQuestion),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    // Obtener la información retornada por el backend
    const data = await request.json();

    // Verificar si el estado de la respuesta es "created" seteamos la variable de estado saved con "saved"
    if(request.status === 201 && data.status === "created"){
      //setSaved("saved");

      // Mostrar el modal de éxito
      Swal.fire({
        title: data.message,
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
      });

    } else {
      //setSaved("error");

      // Mostrar el modal de error
      Swal.fire({
        title: data.message || "¡Error en el registro!",
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
      });
    };
  };

  // Hasta aquí código de la profe

  return (
    <>
      {/** Ponemos los imputs para obtener los primeros datos con los que se creará la pregunta */}
      <Box>
        <Grid container spacing={1}>
          {/**input para elegir materia */}
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="label-subjects">Materia</InputLabel>
              <Select
                name = "subject_name"
                labelId="label-subjects"
                id="label-subjects"
                value={form.subject_name || '-Materia-'}
                label="subject_name"
                onChange={changed}
              >
                {/** Desplegamos las materias disponibles guardadas en la base de datos */}
                {subjects.map((subject) => {
                  return (
                    <MenuItem
                      value={subject.name}
                      key={subject.name}
                    >
                      {subject.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {/**input para elegir el tópico */}
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="label-topic">Tópico</InputLabel>
              <Select
                name= "topic_name"
                labelId="label-topico"
                id="topic_name"
                value={form.topic_name || '-Tópico-'}
                label="topic"
                onChange={changed}
              >
                {/** Desplegamos los tópicos disponibles en la base de datos */}
                {topics.map((topic, key) => {
                  return (
                    <MenuItem value={topic.name} key={key}>
                      {topic.name}
                    </MenuItem>
                  );
                })}
                <MenuItem>Crear nuevo tópico</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/** input para grado */}
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="label-terms">Grado</InputLabel>
              <Select
                name = "term"
                labelId="label-term"
                id="label-term"
                value={form.term || "6"}
                label="term"
                onChange={changed}
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
          {/** input para la dificultad */}
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="label-level">Dificultad</InputLabel>
              <Select
                name = "difficulty"
                labelId="label-level"
                id="label-level"
                value={form.difficulty || "Medio"}
                label="level"
                onChange={changed}
              >
                {/** Desplegamos los niveles disponibles */}
                {levels.map((level) => {
                  return (
                    <MenuItem value={level.displayedName} key={level.id}>
                      {level.displayedName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {/** Area de texto para la descripción de la pregunta */}
          <Grid size={12}>
            <TextField
              name="description"
              fullWidth
              id="question-description"
              label="Breve descripción"
              multiline
              rows={1}
              value = {form.description}
              defaultValue=""
              onChange={changed}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      {/** tabs para tipo icfes y tipo abierta para los inputs del contenido de la pregunta  */}
      <Box sx={{ width: "100%" }}>
        <TabContext value={tab}>
          {/** Etiquetas de las pestañas y botones de crear y eliminar preguntas */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTab} aria-label="Icfes-Abierta">
              <Tab label="Pregunta abierta" value="1" />
              <Tab label="Tipo ICFES" value="2" />
              {/** Botón para crear pregunta*/}
              <Box sx={{ width: "100%" }}>
                <Grid container>
                  <Grid offset="auto">
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" onClick={saveQuestion}>Crear pregunta</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </TabList>
          </Box>
          {/** Panel para ingresar el contenido de la pregunta abierta */}
          <TabPanel value="1">
            <Grid container spacing={2}>
              {/** Área de texto para el enunciado de la pregunta abierta */}
              <Grid size={12}>
                <TextField
                  name = "content"
                  fullWidth
                  id="question-content"
                  label="Contenido de la pregunta"
                  multiline
                  rows={5}
                  value = {form.content}
                  onChange={changed}
                />
              </Grid>
              {/** Área de texto para la respuesta a la pregunta */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  id="question-answer"
                  label="Respuesta"
                  multiline
                  rows={5}
                  onChange={changed}
                />
              </Grid>
            </Grid>
          </TabPanel>
          {/** Panel para ingresar el contenido de la pregunta tipo ICFES */}
          <TabPanel value="2">
            <Grid container spacing={2}>
              {/** Área de texto para el enunciado de la pregunta tipo icfes */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  id="question-content-icfes"
                  label="Enunciado de la pregunta"
                  multiline
                  rows={5}
                  onChange={changed}
                />
              </Grid>
              {/** Área de texto para las múltiples opciones a la pregunta de tipo ICFES */}
              <Grid size={12}>
                {/** Ejemplo para ver si se usa en las posibles respuestas TODO: limpiar fruits */}
                <div>
                  {addFruitButton}
                  <List sx={{ mt: 1 }}>
                    <TransitionGroup>
                      {fruitsInBasket.map((item) => (
                        <Collapse key={item}>
                          {renderItem({ item, handleRemoveFruit })}
                        </Collapse>
                      ))}
                    </TransitionGroup>
                  </List>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

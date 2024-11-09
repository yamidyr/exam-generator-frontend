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
    name: "Sistemas de ecuaciones"
  },
  {
    name: "Casos de factorización"
  },
  {
    name: "Identidades trigonométricas"
  }
]



export const CreateQuestion = () => {

  // Variable de estado para la viñeta de tipo Icfes o Abierta
  const [tab, setTab] = useState('1');

  // Método para setear la variable del cambio de viñeta
  const handleTab = (event, newTab) => {
    setTab(newTab);
  };

    // Se definen las variables de estado para obtener los datos de la pregunta que será creada:

    // Variable de estado para la dificultad
    const [level, setLevel] = useState("2")

    // variable de estado para la materia
    const [subject, setSubject] = useState('-Materia-');

    // variable de estado para el grado
    const [term, setTerm] = useState('-Grado-');

    // variable de estado para el tema o tópico
    const [topic, setTopic] = useState('-Tópico-');

    // variable de estado para el contenido de la pregunta ( abierta o cerrada )
    const [contentQuestion, setContentQuestion] = useState("");

    // variable de estado para la descripción de la pregunta
    const [description, setDescription] = useState("");

    // variable de estado para la respuesa a la pregunta abierta
    const [answerOpenQuestion, setAnswerOpenQuestion] = useState("");

    // variable de estado para la almacenar las posibles respuestas si es una pregunta tipo ICFES
    const [multOptions, setMultOptions] = useState([]);



  // Se setean las variables de estado de acuerdo a las entradas con los siguientes métodos:

    // Método para manejo del selector de dificultad
    const handleLevelSelector = (event) => {
      setLevel(event.target.value);
    }

    // función para manejo del selector de materias
    const handleSubjectSelector = (event) => {
      setSubject(event.target.value);
    };

    // Función para el manejo del selector de grados:
    const handleTermSelector = (event) => {
        setTerm(event.target.value);
    }

    // Método para el manejo del selector de tópico
    const handleTopicSelector = (event) => {
      setTopic(event.target.value);
    }

    // Método para el manejo del input en el que se escribe el contenido de la pregunta abierta
    const handleTextContentQuestion = (event) => { // TODO: hay que ver cómo se guardará el código latex
      setContentQuestion(event.target.value);
    }

    // // Método para el manejo del input en el que se escribe el contenido de la pregunta tipo ICFES
    // const handleTextIcfesQuestion = (event) => { // TODO: hay que ver cómo se guardará el código latex
    //   setContentQuestion(event.target.value);
    // }

    // Método para el manejo del input en el que se escribe la descripción de la pregunta
    const handleTextDescription = (event) => {
      setDescription(event.target.value);
    }

    // Método para el manejo del input para la respuesta a la pregunta abierta
    const handleAnswerOpenQuestion = (event) => {
      setAnswerOpenQuestion(event.target.value);
    }

    // Método para el manejo del ingreso de las posibles respuestas si es una pregunta tipo ICFES
    const handleMultOptions = (event) => {
      setMultOptions( event.target.value);
    }


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


  return (
    <>
      {/** Ponemos los imputs para obtener los primeros datos con los que se creará la pregunta */}
      <Box>
        <Grid container spacing={1}>
          {/**input para elegir materia */}
          <Grid size={3}>
            <FormControl fullWidth>
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
          {/**input para elegir el tópico */}
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel id="label-topic">Tópico</InputLabel>
              <Select
                labelId="label-topico"
                id="label-topico"
                value={topic}
                label="topic"
                onChange={handleTopicSelector}
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
          <Grid size={3}>
            <FormControl fullWidth>
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
          {/** input para la dificultad */}
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel id="label-level">Dificultad</InputLabel>
              <Select
                labelId="label-level"
                id="label-level"
                value={level}
                label="level"
                onChange={handleLevelSelector}
              >
                {/** Desplegamos los niveles disponibles */}
                {levels.map((level) => {
                  return (
                    <MenuItem value={level.id} key={level.id}>
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
              fullWidth
              id="question-description"
              label="Breve descripción"
              multiline
              rows={1}
              defaultValue=""
              onChange={handleTextDescription}
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
                      <Button variant="contained">Crear pregunta</Button>
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
                  fullWidth
                  id="question-content"
                  label="Contenido de la pregunta"
                  multiline
                  rows={5}
                  defaultValue=""
                  onChange={handleTextContentQuestion}
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
                  defaultValue=""
                  onChange={handleAnswerOpenQuestion}
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
                  defaultValue=""
                  onChange={handleTextContentQuestion}
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

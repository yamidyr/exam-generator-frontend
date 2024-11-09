import { ExamsList } from "./ExamsList"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';




// Listas y variables de prueba:
const exams = [//TODO: Estos exámenes son traidos  desde la base de datos
    {
    creation_date: "11/11/11",
    user: "Yamid Yela",
    description: "Este es un examen para el primer parcial bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blav", 
    subject: "Álgebra Lineal",
    term: "11"
    },
    {
        creation_date: "10/10/10",
        user: "Yamid Yela",
        description: "Este es otro examen para el primer parcial ",
        subject: "Álgebra Lineal",
        term: "11"
    },
    {
        creation_date: "12/12/12",
        user: "Yamid Yela",
        description: "Este es un tercer examen bla bla bla bla bla bla bla bla bla bla bla bla blav",
        subject: "Álgebra Lineal",
        term: "11"
    }
    ]

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



//Componete para ser desplegado:
export const ExamsFilter = () => {


    // Se definen las variables de estado para los filtros:
    // variable de estado para las materias
    const [subject, setSubject] = useState('-Materia-');

    // variable de estado para los grados
    const [term, setTerm] = useState('-Grado-');

    // variable de estado para las fechas. Las variables son de algún tipo extraño jeje
    const [sinceDate, setSinceDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // variable de estado para buscar palabra
    const [wordToSearch, setWordToSearch] = useState('');

    // variable de estado para casilla de solo mis preguntas
    const [areOnlyMyExams, setAreOnlyMyExams] = useState(true);


    // Se setean las variables de estado de acuerdo a los filtros:
    // función para manejo del selector de materias
    const handleSubjectSelector = (event) => {
      setSubject(event.target.value);
    };

    // Función para el manejo del selector de grados:
    const handleTermSelector = (event) => {
        setTerm(event.target.value)
    }

    // Función para el manejo de la variable de estado areOnlyMyQuestion
    const handleAreOnlyMyQuestions = () => {
        setAreOnlyMyExams(!areOnlyMyExams);
        console.log("areOnlyMyQuestions : ", areOnlyMyExams);
    }

    // Función para manejo del input de busqueda por palabra
    const handleSearchByWord = (event) => {
        setWordToSearch(event.target.value);
    }

  return (
    <>
    {/** Ponemos el Filtro en un acordeón */}
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="filter-questions"
        >
          Filtros
        </AccordionSummary>
        <AccordionDetails>
            {/** Ponemos los imputs para setear las variables de estado: */}
            <Box>
                <Grid container spacing={1}>
                    {/** input para fecha desde */}
                    <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value = {sinceDate} onChange = {(newDate => setSinceDate(newDate))} label="Desde" />
                        </LocalizationProvider>
                    </Grid>
                    {/** input para fecha hasta */}
                    <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value = {toDate} onChange = {(newDate => setToDate(newDate))} label="Hasta" />
                        </LocalizationProvider>
                    </Grid>
                    {/** input para grado */}
                    <Grid size={4}>
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
                                {
                                    terms.map((term) => {
                                        return  <MenuItem
                                                    value={term.value}
                                                    key={term.value}>
                                                    {term.value}
                                                </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {/**input para elegir materia */}
                    <Grid size={4}>
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
                                {
                                    subjects.map((subject) => {
                                        return  <MenuItem
                                                    value={subject.displayed_name}
                                                    key={subject.nombre}>
                                                    {subject.displayed_name}
                                                </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {/** checkbox para mis exámenes */}
                    <Grid>
                        <FormControl>
                            <div>
                                Solo mis exámenes: <Checkbox onChange={handleAreOnlyMyQuestions} size="large" />
                            </div>
                        </FormControl>
                    </Grid>
                    {/** input buscar por palabra contenida */}
                    <Grid>
                        <div>
                            <TextField id="serach-by-word-input" value= {wordToSearch} onChange={handleSearchByWord} label="Contiene: " variant="outlined" />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button>Buscar</Button>
        </AccordionActions>
      </Accordion>
    </div>
    {/** Listamos las preguntas del filtro. Por defecto aparecen todas las preguntas */}
    <ExamsList exams = {exams}/>
    </>
  )
}


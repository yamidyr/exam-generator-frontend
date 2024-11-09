import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import OptionsButton from '../../common-Layouts/optionsButton';
import PropTypes from 'prop-types';

const options = [
  'Ver',
  'Eliminar'
];




export default function ExamItem({creation_date, user, description, subject, term}) {

  return (
    <Card sx={{ display: 'flex', width:"100%" }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow:1}}> {/* TODO: '&:hover': { bgcolor: 'primary.dark',} to change color when hover */}
        <CardContent sx={{ display: 'flex', flexDirection:'column', flexGrow:1}}>
          <Grid container spacing={0}> {/* Header de la card que muestra la pregunta */}
            <Grid size={3}>
              Creada el: {creation_date}
            </Grid>
            <Grid size={6}>
              {subject}
            </Grid>
            <Grid size={2}>
              Grado: {term}
            </Grid>
            <Grid size={1}>
              <OptionsButton options = {options}/>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid size={10}>
                {user}
                <br />
                {description}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
}

ExamItem.propTypes = {
  creation_date:  PropTypes.string,
  user: PropTypes.string,
  description: PropTypes.string,
  subject: PropTypes.string,
  term: PropTypes.string
}

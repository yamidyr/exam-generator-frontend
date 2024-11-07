import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import OptionsButton from '../../common-Layouts/optionsButton';

const options = [
  'Ver',
  'Editar',
  'Eliminar'
];




export default function QuestionItem({creation_date, user, description, subject, term}) {

  return (
    <Card sx={{ display: 'flex', width:"100%" }}>
        <CardMedia
            component="img"
            sx={{ width: 150, height: 200}}
            image="https://res.cloudinary.com/deaubfnet/image/upload/v1729643153/avatars/avatar-1729643153468.jpg"
            alt="pequeña imagen de la pregunta"
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow:1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Grid container spacing={0}> {/* Header de la card que muestra la pregunta */}
          <Grid size={1.5}>
            Creada el: {creation_date}
          </Grid>
          <Grid size={3}>
            {subject}
          </Grid>
          <Grid size={1}>
            Grado: {term}
          </Grid>
          <Grid size={0.5}>
            <OptionsButton options = {options}/>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
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

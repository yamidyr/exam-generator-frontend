import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';


export const Login = () => {
  return (
    <main>
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
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            // html input attribute
            name="user"
            type="text"
            placeholder="Usuario"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }}>Continuar</Button>
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

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

export default function DashBoardPanel({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 500,
        },
      }}
    >
      <Paper elevation={2} >
        { children }
      </Paper>
    </Box>
  );
}

DashBoardPanel.propTypes = {
  children: PropTypes.element
}


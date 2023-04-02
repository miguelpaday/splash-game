import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: '#ccc', // set the rail color to gray,
        },
        thumb: {
          color: '#ec4762'
        },
        track: {
          color: "#f54174"
        },
        markLabel: {
          color: 'white',
        },
        markActive: {
          color: "green"
        },
        markLabelActive: {
          color: 'blue'
        }
      }
    },
  },
    ranking: {
      odd: '#212731',
      even: '#181e26',
      header: '#14181e'
    }
  },
  
  )

import './App.css'
import { theme } from './infrastructure/theme'
import { ThemeProvider } from '@mui/material'
import GameContainer from './components/GameContainer/GameContainer'
import GameInfoProvider, { GameInfoContext } from './context/GameInfo/GameInfo.context'

declare module '@mui/material/styles' {
  interface Theme {
    ranking: {
      odd: string;
      even: string;
      header: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    ranking?: {
      odd?: string;
      even?: string;
      header?: string;
    };
  }
}


function App() {

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
         <GameInfoProvider>
            <GameContainer/>
         </GameInfoProvider>
      </ThemeProvider>
    </div>
  )
}

export default App

import { ThemeProvider } from "./context/ThemeContext.tsx";
import TicTacToeGame from "./components/TicTacToeGame.tsx";

function App() {
  return (
    <ThemeProvider>
      <TicTacToeGame />
    </ThemeProvider>
  );
}

export default App;

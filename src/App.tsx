import { ThemeProvider } from "./context/ThemeContext";
import TicTacToeGame from "./components/TicTacToeGame";

function App() {
  return (
    <ThemeProvider>
      <TicTacToeGame />
    </ThemeProvider>
  );
}

export default App;


import { ThemeProvider } from "./context/ThemeProvider";
import TicTacToeGame from "./components/TicTacToeGame";

function App() {
  return (
    <ThemeProvider>
      <TicTacToeGame />
    </ThemeProvider>
  );
}

export default App;

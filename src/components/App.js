import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
      hello world
      </div>
      <Link to={`posts/${"123test"}`} className="test-classname">The Link</Link>
    </div>
  );
}

export default App;

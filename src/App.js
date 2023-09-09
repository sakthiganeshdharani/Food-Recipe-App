import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Add from './Add';
import Display from './Display';
import {ToastContainer} from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Display/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

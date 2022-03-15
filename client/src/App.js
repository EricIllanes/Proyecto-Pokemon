import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage/landingPage';
import HomePage from './components/homePage/homePage';
import CreatePage from './components/createPage/createPage';
import DetailPokemon from './components/detailsPokemon/detailsPokemon';
// const HomePage = lazy(() => import("./components/homePage/homePage"))
// const CreatePage = lazy(() => import("./components/createPage/createPage"))
// const DetailPokemon = lazy(() => import("./components/detailsPokemon/detailsPokemon"))

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/createpokemon" element={<CreatePage />} />
          <Route path="/pokemonsid/:id" element={<DetailPokemon />} />
        </Routes>


      </Router>
    </div>
  )
}

export default App;

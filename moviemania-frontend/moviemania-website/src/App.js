import './App.css';
import api from './api/axisConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() { //App Component
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try
    {

   const response = await api.get('/api/v1/movies',{
        headers: {"Access-Control-Allow-Origin": "*"}
      })
      console.log(response.data);
      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }


  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/id/${movieId}`,{
          headers: {"Access-Control-Allow-Origin": true}
        });

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }


  //implement useEffect hook so that getMovies called when the components first load.
  useEffect(()=>{
    getMovies();
  }, [])
 
  return (
    <div className="App">
     <Header/>
     <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home movies={movies} />} ></Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>

        </Route>

     </Routes>


    </div>
  );
}

export default App;

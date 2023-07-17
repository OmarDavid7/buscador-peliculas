import { useState } from "react"

export default function MovieSearch(){

    const [busqueda, setBusqueda] = useState('');
    const [pelicula, setPelicula] = useState([]);

    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const APIKEY = 'f18a7fc1bd256125ef75910fe416684b';

    const handleInputChange = (e)=>{
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        fecthPeliculas();
    }

    const fecthPeliculas = async()=>{
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${APIKEY}`);
            const data = await response.json();
            setPelicula(data.results);
            console.log(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <div className="container">
            <h1 className="title">Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={busqueda} onChange={handleInputChange} />
                <button type="submit">Buscar</button>
            </form>

            <div className="movie-list">
              {
                pelicula.map((peli)=>(
                    <div key={peli.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} alt={peli.title} />
                        <h2>{peli.title}</h2>
                        <p>{peli.overview}</p>
                    </div>
                ))
              }
            </div>
        </div>
        </>
    )
}
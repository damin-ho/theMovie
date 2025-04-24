import { useState } from "react";

export const Movie = () =>{

    const [ movieResult , SetMovieresult] = useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTZlNTEwNWU3YmFhNjhjMWM4NDkzNmE0ZDRlYmJhYiIsIm5iZiI6MTc0NTI2ODM3My4wMTgsInN1YiI6IjY4MDZhZTk1M2Y4ODg1NGM0OWVlODI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bjtJMADR2HMjQtbkLx4I8RYjLkmDxv2BPgrTJNzwffI'
        }
      };
      
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(res => SetMovieresult(res.results))
        .catch(err => console.error(err));

    const [shortened , setShortened] = useState(false)
    const [filterList , setFilterList] = useState([])
    const [expandedCards, setExpandedCards] = useState({});

        const [searchTerm, setSearchTerm] = useState('');
      
        const handleSearch = (e) => {
          e.preventDefault();
          console.log(searchTerm)
        }

        const searchBTN = async () =>{
            setShortened(!shortened);
            setFilterList(movieResult.filter((movie) => movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())))
            setSearchTerm("")
        }
    
    return <div>

    <div>
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">
        🎥 D . a . M . i
      </div>

      {/* Search Input */}
      <form 
        onSubmit={handleSearch} 
        className="flex items-center space-x-2 w-full max-w-md mx-4"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={searchBTN}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg py-2 px-4"
        >
            {shortened ? 'Close Search' : 'Search' }
        </button>
      </form>

      {/* Menu for smaller screens */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="hover:text-blue-400 transition">Home</a>
        <a href="#" className="hover:text-blue-400 transition">Trending</a>
        <a href="#" className="hover:text-blue-400 transition">Favorites</a>
      </div>
    </nav>
    </div>
    

    {
        shortened ?

    <div class="thebox">
     { filterList.map((movie) =>{

         const toggleCard = (id) =>{
             setExpandedCards((prev) =>({
                 ...prev,
                 [id] : !prev[id]
             }))
         }
        const thetext = movie.overview.split(' ').slice(0, 17).join(' ')

                   return <div key={movie.id} class=" items-center max-w-[275px] p-3 bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all cursor-pointer m-3">
                       <div className="">
                            <img class="size-60 shadow-xl rounded-md" alt="" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                       </div>
                       <div class="items-center md:items-start">
                            <h3 class="text-lg font-bold text-gray-800">{movie.original_title}</h3>
                            <span>
                                 <span class="text-sm text-gray-600 mt-2">{expandedCards[movie.id] ? movie.overview : thetext}</span>
                                 <span>
                                    <button onClick={() => toggleCard(movie.id)} class="btn">{expandedCards[movie.id] ? 'Read Less' : 'Read More'}</button>
                                 </span>
                            </span>
                            <h3 class="text-sm text-grey-600 mt-2 font-light">Released Date: {movie.release_date}</h3>
                            <h3 class="text-sm text-grey-600 mt-2 font-bold">Rating: {movie.vote_average}</h3>
                       </div>
                   </div>
        
     })
     }
     </div> :
    <div class="thebox">
     { movieResult.map((movie) =>{

         const toggleCard = (id) =>{
             setExpandedCards((prev) =>({
                 ...prev,
                 [id] : !prev[id]
             }))
         }
        const thetext = movie.overview.split(' ').slice(0, 17).join(' ')

                   return <div key={movie.id} class=" items-center max-w-[275px] p-3 bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all cursor-pointer m-3">
                       <div className="">
                            <img class="size-60 shadow-xl rounded-md" alt="" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                       </div>
                       <div class="items-center md:items-start">
                            <h3 class="text-lg font-bold text-gray-800">{movie.original_title}</h3>
                            <span>
                                 <span class="text-sm text-gray-600 mt-2">{expandedCards[movie.id] ? movie.overview : thetext}</span>
                                 <span>
                                    <button onClick={() => toggleCard(movie.id)} class="btn">{expandedCards[movie.id] ? 'Read Less' : 'Read More'}</button>
                                 </span>
                            </span>
                            <h3 class="text-sm text-grey-600 mt-2 font-light">Released Date: {movie.release_date}</h3>
                            <h3 class="text-sm text-grey-600 mt-2 font-bold">Rating: {movie.vote_average}</h3>
                       </div>
                   </div>
        
     })
     }
     </div>
    }


    </div>
    
}
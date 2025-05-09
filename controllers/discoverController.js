
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_KEY}` 
    }
};

const tmdbBASEURL= "https://api.themoviedb.org/3";
const imageBASEURL= "https://image.tmdb.org/t/p/original";
const nowPlaying = '/movie/now_playing?language=en-US&page=1';
const topRated= '/movie/top_rated?language=en-US&page=1';
const upcomingMovies= '/movie/upcoming?language=en-US&page=1';

async function getMediaList(endpoint) {
    //const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const url= tmdbBASEURL+endpoint;
    const response= await fetch(url, options);
    const data= response.json();
    return data;
}


async function getUpcomingMovies(req, res)  {
    const upcomingMovieList= await getMediaList(upcomingMovies);

    res.status(200).json({
        status: "success",
        message: upcomingMovieList
    })
}


async function getTopRatedMovies(req, res) {
    const topRatedMovieList= await getMediaList(topRated);
    res.status(200).json({
        status: "success",
        message: topRatedMovieList
    })
}


async function getCurrentMovies(req, res) {
    
    const currentMovieList= await getMediaList(nowPlaying);
    res.status(200).send({
        status: "success",
        message: currentMovieList
    })

}

module.exports= {getCurrentMovies, getTopRatedMovies, getUpcomingMovies};
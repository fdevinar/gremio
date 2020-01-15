var movies = {
    movieList: [
        {
            title: "Scarface",
            rating: 4.5,
            hasWatched: true
                },
        {
            title: "Godfather",
            rating: 5.0,
            hasWatched: true
        },
        {
            title: "Interstellar",
            rating: 4.0,
            hasWatched: false
        },
        {
            title: "Monty Python",
            rating: 4.2,
            hasWatched: true
        },
        {
            title: "City of God",
            rating: 5.0,
            hasWatched: true,
        }
            ],
        printList: function(){
            this.movieList.forEach(function(film){
                if (film.hasWatched){
                    console.log("You have watched \"" + film.title + '\" - ' + film.rating + ' stars');
                }
                else{
                    console.log("You have not seen \"" + film.title + '\" - ' + film.rating + ' stars');
                }
                                                });
                            }
            }





// for (i=0; i<movies.length; i++){
//     if (movies[i].hasWatched){
//         console.log("You have watched \"" + movies[i].title + '\" - ' + movies[i].rating + ' stars');
//     }
//     else {
//         console.log("You have not seen \"" + movies[i].title + '\" - ' + movies[i].rating + ' stars');
//     }
// }

        // ==========================================
        // TMDB API
        // ==========================================

        const apiKey =
            "8b92e6febee0cff8d155c1886ff8bfe3";


        // ==========================================
        // LOAD POPULAR MOVIES
        // ==========================================

        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        )

        .then(response => {

            return response.json();

        })

        .then(data => {

            let container =
                document.getElementById("hero-content");

            const movies =
                data.results;

            movies.forEach(mov => {

                createMovieCard(
                    mov,
                    container
                );

            });

        });



        // ==========================================
        // CREATE MOVIE CARD
        // ==========================================

        function createMovieCard(mov, container) {

            const id_movie = mov.id

            const card =
                document.createElement("div");


            card.className =
                "movie-card";


            card.innerHTML = `

                <img
                    src="https://image.tmdb.org/t/p/w500${mov.poster_path}"
                    alt="${mov.title}"
                >

                <div class="movie-info">

                    <h2>
                        ${mov.title}
                    </h2>

                    <p class="rating">
                        ⭐ ${mov.vote_average}
                    </p>

                    <p class="overview">
                        ${mov.overview}
                    </p>

                </div>

            `;


            // ==========================================
            // CLICK MOVIE → FIND TRAILER
            // ==========================================

            card.addEventListener(
                "click",
                function() {

                    const id =
                        mov.id;


                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
                    )

                    .then(response => {

                        return response.json();

                    })

                    .then(data => {

                        const videos =
                            data.results;


                        let trailer =
                            null;


                        // ==========================================
                        // FIND YOUTUBE TRAILER
                        // ==========================================

                        videos.forEach(element => {

                            if (
                                element.site === "YouTube" &&
                                element.type === "Trailer"
                            ) {

                                trailer =
                                    element;

                            }

                        });


                        const overlay =
                            document.getElementById(
                                "trailerOverlay"
                            );


                        const title =
                            document.getElementById(
                                "trailerTitle"
                            );


                        const video =
                            document.getElementById(
                                "trailerVideo"
                            );


                        const watchButton =
                            document.getElementById(
                                "watchTrailer"
                            );


                        // ==========================================
                        // TRAILER FOUND
                        // ==========================================

                        if (
                            trailer !== null
                        ) {

                            title.innerHTML =
                                `${mov.title} - Trailer`;


                            video.src =
                                `https://www.youtube.com/embed/${trailer.key}`;


                            watchButton.style.display =
                                "inline-flex";


                            overlay.classList.remove(
                                "hide"
                            );


                            document.body.style.overflow =
                                "hidden";


                            // ==========================================
                            // WATCH BUTTON
                            // ==========================================

                            watchButton.onclick =
                                function() {

                                    video.src =
                                        `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

                                };

                        }


                        // ==========================================
                        // NO TRAILER
                        // ==========================================

                        else {

                            title.innerHTML =
                                mov.title;


                            video.src =
                                "";


                            watchButton.style.display =
                                "none";


                            overlay.classList.remove(
                                "hide"
                            );


                            document.body.style.overflow =
                                "hidden";

                        }

                    });

                }
            );


            container.appendChild(card);

                        
                card.addEventListener("click", function () {

                localStorage.setItem("movieId", mov.id);
                localStorage.setItem("movieTitle", mov.title);

               

            });



        }



        // ==========================================
        // SEARCH MOVIES
        // ==========================================

        async function movie() {

            let search =
                document.getElementById(
                    "palabas"
                ).value;


            if (
                search.trim() === ""
            ) {

                return;

            }


            const response =
                await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}`
                );


            const data =
                await response.json();


            let container =
                document.getElementById(
                    "hero-content"
                );


            const movies =
                data.results;


            // Clear old movies

            container.innerHTML =
                "";


            // Change title

            document.querySelector(
                ".section-title"
            ).innerHTML =
                `Search results for "${search}"`;


            movies.forEach(mov => {

                createMovieCard(
                    mov,
                    container
                );

            });

        }



        // ==========================================
        // SEARCH BUTTON
        // ==========================================

        function enter() {

            movie();

        }



        // ==========================================
        // CLOSE TRAILER OVERLAY
        // ==========================================

        const trailerOverlay =
            document.getElementById(
                "trailerOverlay"
            );


        const trailerClose =
            document.getElementById(
                "trailerClose"
            );


        const trailerVideo =
            document.getElementById(
                "trailerVideo"
            );


        // ==========================================
        // X BUTTON
        // ==========================================

        trailerClose.addEventListener(
            "click",
            function() {

                trailerOverlay.classList.add(
                    "hide"
                );


                trailerVideo.src =
                    "";


                document.body.style.overflow =
                    "";

            }
        );



        // ==========================================
        // CLICK OUTSIDE MODAL
        // ==========================================

        trailerOverlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === trailerOverlay
                ) {

                    trailerOverlay.classList.add(
                        "hide"
                    );


                    trailerVideo.src =
                        "";


                    document.body.style.overflow =
                        "";

                }

            }
        );



        // ==========================================
        // ESC KEY TO CLOSE
        // ==========================================

        document.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Escape"
                ) {

                    trailerOverlay.classList.add(
                        "hide"
                    );


                    trailerVideo.src =
                        "";


                    document.body.style.overflow =
                        "";

                }

            }
        );



 document.getElementById("tite").addEventListener(
        "click",
        function() {

            window.location.href = "full_movie.html";

        })


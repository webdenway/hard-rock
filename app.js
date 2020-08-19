const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click', function() {
    const inputField = document.getElementById('input-lyrics');

    fetch(`${"https://api.lyrics.ovh/suggest/"}${inputField.value}`)
        .then(response => response.json())
        .then(json => albumDetails(json))

    function albumDetails(json) {
        console.log(json);

        for (let i = 0; i < json.data.length - 5; i++) {

            const albumTitle = json.data[i].album.title;
            const artistMan = json.data[i].artist.name;
            const songName = json.data[i].title;
            console.log(artistMan);
            detail = document.getElementById('output');

            const displayResult = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">Song :- ${songName} </h3>
                <h5>Artist :- ${artistMan}<h5/>
                <p class="author lead">Album by <span>${albumTitle}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`

            detail.innerHTML += displayResult;
        }

    }

})
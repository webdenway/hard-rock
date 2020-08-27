const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click', function() {
    let inputField = document.getElementById('input-lyrics');

    fetch(`${"https://api.lyrics.ovh/suggest/"}${inputField.value}`)
        .then(response => response.json())
        .then(json => albumDetails(json))

    function albumDetails(json) {
        // console.log(json);

        for (let i = 0; i < json.data.length - 5; i++) {

            const albumTitle = json.data[i].album.title;
            let artistMan = json.data[i].artist.name;
            let songName = json.data[i].title;
            detail = document.getElementById('output');

            const displayResult = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">Song :- ${songName} </h3>
                <h5>Artist :- ${artistMan}<h5/>
                <p class="author lead">Album by <span>${albumTitle}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onClick = 'myFunction("${artistMan}","${songName}")'>Get Lyrics</button>
            </div>
        </div>`

            detail.innerHTML += displayResult;

        }


    }


})



function myFunction(artistMan, songName) {


    fetch(`https://api.lyrics.ovh/v1/${artistMan}/${songName}`)
        .then(res => res.json())
        .then(data => findLyrics(data))

    function findLyrics(data) {
        if (data.lyrics == 'data.error' || data.lyrics == 'data.undefined') {
            document.getElementById('show-lyric').innerHTML = `<p> No Lyrics Found </p>`
        } else {
            document.getElementById('show-lyric').innerHTML = `${data.lyrics}`
        }
        console.log(data);
    }
}
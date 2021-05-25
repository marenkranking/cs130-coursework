const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const playTrack = (ev) => {
    const elem = ev.currentTarget;
    // preview url (the mp3) has been stashed in the "data-preview=track" attribute
    // we need to get it out
    const previewURL = elem.dataset.previewTrack;
    console.log(previewURL);
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else {
        console.log('There is no preview available for this track.')
    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
    
}

const getTracks = (term) => {
    document.querySelector('#tracks').innerHTML = ' ';
    const search = document.querySelector('#search').value;
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${search}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(tracks => {
            if (tracks.length === 0) {
                document.querySelector('#tracks').innerHTML = `<div>
                                                                    <p>No tracks found that match your search criteria.</p>
                                                                </div>`;
            } if (tracks.length > 5) {
                const fiveTracks = [tracks[0], tracks[1], tracks[2], tracks[3], tracks[4]];
                for (track of fiveTracks) {
                    document.querySelector('#tracks').innerHTML += `<section class="track-item preview" data-preview-track="${track.preview_url}" onclick="playTrack(event);">
                                                                        <img src="${track.album.image_url}">
                                                                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                                                                        <div class="label">
                                                                            <h3>${track.name}</h3>
                                                                            <p>
                                                                                ${track.artist.name}
                                                                            </p>
                                                                        </div>
                                                                    </section>`;
                }
            } else {
                for (track of tracks) {
                    document.querySelector('#tracks').innerHTML += `<section class="track-item preview" data-preview-track="${track.preview_url}" onclick="playTrack(event);">
                                                                        <img src="${track.album.image_url}">
                                                                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                                                                        <div class="label">
                                                                            <h3>${track.name}</h3>
                                                                            <p>
                                                                                ${track.artist.name}
                                                                            </p>
                                                                        </div>
                                                                    </section>`;
            }
        }
        })
};

const getAlbums = (term) => {
        document.querySelector('#albums').innerHTML = ' ';
        const search = document.querySelector('#search').value;
        let url = `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${search}`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(albums => {
                if (albums.length === 0) {
                    document.querySelector('#albums').innerHTML = `<div>
                                                                        <p>No albums found that match your search criteria.</p>
                                                                    </div>`;
                } else {
                    for (album of albums) {
                        document.querySelector('#albums').innerHTML += `<section class="album-card" id="${album.id}">
                                                                            <div>
                                                                                <img src="${album.image_url}">
                                                                                <h3>${album.name}</h3>
                                                                                <div class="footer">
                                                                                    <a href="${album.spotify_url}" target="_blank">
                                                                                        view on spotify
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </section>`;
                    }
                }
            })
};

const getArtist = (term) => {
    document.querySelector('#artist').innerHTML = ' ';
    const search = document.querySelector('#search').value;
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${search}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(artists => {
            if (artists.length === 0) {
                document.querySelector('#artist').innerHTML = `<div>
                                                                    <p>No artists found that match your search criteria.</p>
                                                                </div>`;
            } else {
                const artist = artists[0];
                console.log(artist);
                document.querySelector('#artist').innerHTML = `<section class="artist-card" id="${artist.id}">
                                                                    <div>
                                                                        <img src="${artist.image_url}">
                                                                        <h3>${artist.name}</h3>
                                                                        <div class="footer">
                                                                            <a href="${artist.spotify_url}" target="_blank">
                                                                                view on spotify
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </section>`;
            }
        })
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

import PlayButton from "./playButton";

const CardSong = ({ song }) => {

    function convertDurationTrack(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        if (seconds.toString().length === 1) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    return (
        <div className="container-song">
            <div className="cover-container">
                <img src={song.album.cover_small} alt={song.title} />
            </div>
            <div className="info-container">
                <span>{song.title_short}</span>
                <div className="contributors">
                    <p key={song.artist.id} className="track-artist">
                        {song.artist.name}
                    </p>
                </div>
            </div>
            <p className="duration">{convertDurationTrack(song.duration)}</p>
            <PlayButton url={song.preview} />
        </div>
    );
};

export default CardSong;
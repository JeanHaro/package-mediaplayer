import MediaPlayer from "../MediaPlayer";

class AutoPlay {
    constructor() { }
    run(player: MediaPlayer) {
        // Para que este en AutoPlay por regla básica, debemos ponerle en mute
        /* player.mute(); */
        if (!player.media.muted) {
            // Si está mutado lo queremos mutar por eso el true
            player.media.muted = true;
        }

        player.play();
    }
}

export default AutoPlay;
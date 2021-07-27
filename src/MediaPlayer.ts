class MediaPlayer {
    // Tipo de elemento de HTML
    media: HTMLMediaElement;
    plugins: Array<any>;
    container: HTMLElement;

    constructor(config) {
        this.media = config.el;
        this.plugins = config.plugins || [];

        this.initPlayer();
        // Para inicializar los plugins
        this._initPlugins();
    }

    // Vamos a inicializar el player para que pueda crear el contenedor de forma dinámica y que quede dentro del vídeo
    initPlayer() {
        // El contenedor
        this.container = document.createElement('div');
        // Le damos position relative, porque los ads tendrán position absolute
        this.container.style.position = 'relative';
        // Ubicamos el contenedor como pariente de media y ya este como pariente
        // Agarramos al media y lo ponemos adentro
        // Con insertBefore indicamos que container va ir antes de media
        this.media.parentNode.insertBefore(this.container, this.media);
        // El container indicamos que adentro tendrá al media
        this.container.appendChild(this.media);
    }

    private _initPlugins() {
        // Getters y Setters
        /* Control en la cantidad de datos que pasamos a los plugins, no queremos que tengan acceso a todo el
        player, si no a un subset de su funcionalidad */
        // Para hacer esto creamos una variable
        /* Ya no es necesario crear variables privadas cuando usamos TypeScript, ya que como privadas 
        TypeScript nos marca el error si accedemos a estas variables privadas */
        /* const player = {
            play: () => this.play(),
            pause: () => this.pause(),
            media: this.media,
            get muted() {
                // this hace referencia a player que es el objeto, pero no tenemos ningún media, así que le colocamos
                return this.media.muted;
            },
            set muted(value) {
                this.media.muted = value;
            },
        }; */
        // Si usamos este player y lo pasamos a plugin.run();
        // Ninguno de los plugins va a tener acceso a las demás funciones, como, togglePLay, mute, etc
        // Esto es bueno porque nos puede dar control sobre la capacidad de los que pueden tener los plugins
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    togglePlay() {
        (this.media.paused)
            ? this.play()
            : this.pause();
    }
    mute() {
        this.media.muted = true;
    }
    unmute() {
        this.media.muted = false;
    }
    // Reto
    toggleMute() {
        (this.media.muted)
            ? this.unmute()
            : this.mute();
    }
}

export default MediaPlayer;
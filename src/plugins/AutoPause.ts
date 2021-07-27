import MediaPlayer from '../MediaPlayer'

class AutoPause {
    /* threshold es una propiedad privada, variables privadas, propiedades privadas, no es un 
    concepto que existe en JavaScript, pero en TypeScript si, y eso nos va a permitir que alguna otra
    función o un objeto que importe AutoPause pueda leer este valor */
    private threshold: number;
    player: MediaPlayer;

    constructor() {
        this.threshold = 0.25;
        // Le haremos permanente el this, a la instancia del objeto
        // Cada vez que se llame la función isVisible, se va a referir a la instancia del plugin
        this.handleIntersection = this.handleIntersection.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    }

    run (player) {
        this.player = player;

        // Plugin de pausar si no lo observas al darle scroll
        /* el primer argumento es un handler es lo que va a recibir el anuncio si hubo una intersección 
        del elemento que observamos */
        /* el segundo argumento es unn elemento de configuración */
        const observer = new IntersectionObserver(this.handleIntersection, {
            /* Lo que va a decir es que por ciento del elemento tiene que tener intersección con el contenedor 
            para que te interese y nos avisa */
            threshold: this.threshold,
        });

        // El observer se va a poner a observar, se pondrá a observar el media, el contenedor es toda la pantalla
        observer.observe(this.player.media);

        // Otro plugin llamado VisibilityChange
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    // Cuando observer llame a handleIntersection, le va a pasar una lista de entries
    // Los entries son todos los objetos que estamos observando 
    // En este caso solo hay 1
    private handleIntersection (entries: IntersectionObserverEntry[]) {
        const entry = entries[0];
        
        // Si lo que tiene intersección es mayor que el umbral decimos que está visible 
        // Si está visible
        const isVisible = entry.intersectionRatio >= this.threshold;

        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause()
        }
    }

    private handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible';

        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause()
        }
    }
}

export default AutoPause;
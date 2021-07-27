import MediaPlayer from '../../MediaPlayer'
import Ads, { Ad } from './Ads'

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement;
    private currentAd: Ad;
    private adsContainer: HTMLElement;

    // Una instancia de los ads que estaremos tomando
    constructor() {
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement('div');
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    // Todos los plugin tienen un método publico que se llama run
    run (player: MediaPlayer) {
        this.player = player;
        // Le damos como hijo al elemento que creamos acá adsContainer
        this.player.container.appendChild(this.adsContainer);
        this.media = this.player.media;
        /* timeupdate - Cada vez que pasa una fracción de segundo anuncia, que cambio el tiempo y puede utilizar este evento
        para tomar diferentes acciones */
        this.media.addEventListener('timeupdate', this.handleTimeUpdate);
    }

    private handleTimeUpdate() {
        // Cada 30 segundos desplegamos los Ads
        // this.media.currentTime nos puede traer valores con decimales
        // Math.floor lo pasamos a valor entero
        const currentTime = Math.floor(this.media.currentTime);
        
        // Si currentTime se divide con 30 perfectamente, en ese momento desplegamos un ads
        if (currentTime % 30 === 0) {
            this.renderAd();
        }
    }

    private renderAd() {
        // Si ya tenemos un currentAd no mostremos otro
        if (this.currentAd) {
            return;
        }

        const ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
            <div class="ads">
                <a class="ads__links" href="${this.currentAd.url}" target="_blank"> 
                    <img class="ads__img" src="${this.currentAd.imageUrl}"/> 
                    <div class="ads__info"> 
                        <h5 class="ads__title">${this.currentAd.title}</h5> 
                        <p class="ads__body">${this.currentAd.body}</p> 
                    </div> 
                </a> 
            </div>
        `;
        
        setTimeout(() => {
            this.currentAd = null;
            this.adsContainer.innerHTML = '';
        }, 10000);
    }
}

export default AdsPlugin;
// Un ad serán arreglo de acá
export interface Ad {
    // Va a tener una imagen que tendremos su URL
    imageUrl: string;
    // Tendrá un titulo lo que vaya a mostrar 
    title: string;
    // Tendrá una descripción
    body: string;
    // Si el usuario le da click al Ad le mandamos a una URL
    url: string;
}

// Lista
const ALL_ADS: Ad[] = [
    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-profesional-javascript-13538df2-24ce-433f-9aa6-e34eed608e70.png',
    title: 'Curso Profesional de JavaScript',
    body:
        'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
    url: 'https://platzi.com/cursos/javascript-profesional/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-frontend-developer-8a49e681-3e22-408d-b886-2f47dfc9953a.png',
    title: 'Curso de Frontend Developer',
    body:
        'Domina las bases de HTML y CSS. Define la arquitectura de tu código y construye un sitio web usando componentes estáticos. ',
    url: 'https://platzi.com/cursos/frontend-developer/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-backend-node-8e6aa8a9-f7cd-42b7-bf4a-e1ee916a942b.png',
    title: 'Curso de Backend con Node.js',
    body:
        'Crea aplicaciones backend utilizando Node.js, Express y Mongo. Entiende cómo funciona Javascript en un servidor y escribe aplicaciones con Node.js.',
    url: 'https://platzi.com/cursos/backend-nodejs/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-prework-da6b0493-9908-40f3-ad53-f5d330b995b8.png',
    title:
        'Comienza tus proyectos de desarrollo para JavaScript configurando un entorno de desarrollo cómodo y adaptado a tus necesidades.',
    body:
        'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
    url: 'https://platzi.com/cursos/prework/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-autenticacion-passport-6d45426a-2b24-4757-8927-7bfaf54529dd.png',
    title: 'Curso de Autenticación con Passport.js',
    body:
        'Genera estrategias de autenticación Sign-In y Sign-Out usando Passport.js. Agrega autenticación con Facebook, Twitter y Google a tus desarrollos.',
    url: 'https://platzi.com/cursos/passport/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-backend-frontend-02b2ac18-331a-4959-85bf-0bd3c2aa009c.png',
    title: 'Curso de Backend for Frontend',
    body:
        'La ingeniería de software evoluciona día a día, no te quedes atrás. Ahora que eres un Desarrollador FullStack JavaScript necesitas evolucionar con el software, construye arquitecturas de software modernas.',
    url: 'https://platzi.com/cursos/bff/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-react-adec89d0-1c35-4c9c-847e-18c284dc79dd.png',
    title: 'Curso Práctico de React JS',
    body:
        'React es una de las librerías más utilizadas hoy para crear aplicaciones web. Aprende a través de la creación de la interfaz de PlatziVideo todo lo que necesitas para crear increíbles componentes con React.      ',
    url: 'https://platzi.com/cursos/react-ejs/',
    },

    {
    imageUrl:
        'https://static.platzi.com/media/achievements/badge-react-redux-2ca3c0a5-fc53-437f-bfba-69e9ddd5a803.png',
    title: 'Curso de React Router y Redux',
    body:
        'Aprende de forma práctica a implementar React Router para manejar rutas en tus proyectos de frontend como un profesional.',
    url: 'https://platzi.com/cursos/react-router-redux/',
    },
];

class Ads {
    private static instance: Ads;
    private ads: Ad[];

    private constructor () {
        // Inicializamos estos ads del inicializador
        this.initAds();
    }

    static getInstance() {
        if (!Ads.instance) {
            Ads.instance = new Ads();
        }

        return Ads.instance;
    }

    // Inicializamos los ads
    private initAds() {
        // tendremos como una copia intacta de ALL_ADS 
        /* Una tecnica es el destructor donde vamos a tomar todos los elementos que están en este arreglo 
        y es como dejarlos caer sobre otra caja, que es un nuevo arreglo */
        this.ads = [...ALL_ADS];
    }

    // Ads tiene que exponer una forma de dar los Ads a quien se los pida 
    getAd() {
        // Como sacaremos los ads poco a poco, llegará el momento en el que se nos va a acabar por eso
        if (this.ads.length === 0) {
            // Si la cantidad de ads es 0, lo volveremos a inicializar
            this.initAds();
        }

        // Tenemos un arreglo que se llama ads y con pop() va sacar un valor del arreglo y lo va a regresar
        return this.ads.pop();
    }
}

export default Ads;
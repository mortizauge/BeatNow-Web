import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZFkyvDeMj5NQ3lYTc_NWk2UDHPA2EB8w",
    authDomain: "auth-2f686.firebaseapp.com",
    projectId: "auth-2f686",
    storageBucket: "auth-2f686.appspot.com",
    messagingSenderId: "749315745117",
    appId: "1:749315745117:web:0ce591083803a14b0d34b4",
    measurementId: "G-DYFRKHSCN5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Función para registrar o iniciar sesión con Google
async function signInOrRegisterWithGoogle(): Promise<void> {
    try {
        const result = await signInWithPopup(auth, provider);
        // Aquí puedes acceder a la información del usuario registrado o logueado
        const user = result.user;
        console.log("User signed in with Google successfully:", user);
        window.location.href = ('/upload');
    } catch (error) {
        console.error("Error signing in with Google:", (error as Error).message);
        // Aquí podrías mostrar un mensaje de error al usuario

    }
}

export { signInOrRegisterWithGoogle };

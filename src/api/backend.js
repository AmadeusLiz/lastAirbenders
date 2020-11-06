import axios from "axios";

//Instancias de conexión, la app no necesita APIKey
const instance = axios.create ({
    baseURL: "https://last-airbender-api.herokuapp.com/api/v1/characters"
});

export default instance;
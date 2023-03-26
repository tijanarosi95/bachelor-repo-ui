import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
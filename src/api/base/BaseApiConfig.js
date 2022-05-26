import axios from "axios";

var BaseAPIConfig = axios.create({
	baseURL: "https://project20183534.herokuapp.com/",
});

export default BaseAPIConfig;
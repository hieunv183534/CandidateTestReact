
import axios from "axios";

var BaseAPIConfig = axios.create({
	baseURL: "https://candidate-test-2000.herokuapp.com/"
});

export default BaseAPIConfig;
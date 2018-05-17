import axios from 'axios';

//on va créer une instance d'Axios, un nouvel objet axios , 
//dans lequel on peut configurer des options

let http = axios.create({
	baseURL: 'http://localhost:2707',
	// headers: {
 //    'token': sessionStorage.getItem('token')
 //  }
})

export default http;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		aptTime:'',
		aptName:'',
		aptEmail:''
	},
	mutations:{
		getAptTime(state,apt){
			state.aptTime = apt;
		},
		getAptContact(state,contact){
			state.aptName = contact.name;
			state.aptEmail = contact.email
		}
	}
})
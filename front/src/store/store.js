import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		aptTime:'',
		aptDuration:60,
		aptName:'',
		aptEmail:'',
		slots: []
	},
	mutations:{
		getSlots(state,slots){
			state.slots = slots;
		},
		getAptTime(state,apt){
			state.aptTime = apt;
		},
		getAptContact(state,contact){
			state.aptName = contact.name;
			state.aptEmail = contact.email
		}
	}
})
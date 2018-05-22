<template>
	<v-content>
		<v-card>
			<v-toolbar card class="card__head">
				<v-toolbar-title class="card__title">Sélectionnez votre RDV</v-toolbar-title>
			</v-toolbar card>
			<v-card-text class="card__body">
				<table class="card__body__calendar">
					<thead class="card__body__calendar__head">
						<v-btn icon class="card__body__calendar__navicon"v-on:click="getPreviousDays()">
							<v-icon>navigate_before</v-icon>
						</v-btn>
						<!-- affichage de la date -->
						<tr class="card__body__calendar__headDays" v-for="(day,index) in dayRangeToDisplay">
							<ul class="card__body__calendar__headDayUl">
								<li class="card__body__calendar__headDayLi">{{day | dateFormatDayName}}</li>
								<li class="card__body__calendar__headDayLi">{{day | dateFormatDayNumberAndMonth}}</li>
							</ul>
						</tr>
						<v-btn icon class="card__body__calendar__navicon" v-on:click="getNextDays()">
							<v-icon>navigate_next</v-icon>
						</v-btn>
					</thead>
					<tbody class="card__body__calendar__body">
						<!-- affichage des boutons heures -->
						<tr class="card__body__calendar__bodyDay" v-for="(day,index) in dayRangeToDisplay" :key="index">
							<ul class="card__body__calendar__bodyUl"v-for="(hour, index) in hours" :key="index">
								<li class="card__body__calendar__bodyLi"><v-btn v-bind:disabled="DisableButton(getSlotsFromStore, hour, day)" v-on:click="selectTime(hour,day)" :key="index">{{hour}}</v-btn></li>
							</ul>
						</tr>
					</tbody>
				</table>
			</v-card-text>
		</v-card>
	</v-content>
</template>


<script>

import { store } from './../../store/store';
import cal from './../../helpers/calendar';
import moment from 'moment';
import 'moment/locale/fr';
import twix from 'twix';

export default {
	name: 'calendar',
	props:['visibleProp'],
	data () {
		return {
			hours:['10:00','11:00', '12:00', '13:00'],
			hour:'',
			day:'',
			beginDisplay:0,
			aptMoment:'',
			displayAuth:this.visibleProp,
		}
	},
	computed:{
		getCurrentDay(){
			return moment();
		},
		getDaysRange(){
			let start= moment(this.getCurrentDay).add(1, 'days');
			let end = this.getCurrentDayPlus2month(moment(start));
			return this.getDaysOfTheTimeRange(start, end);
		},
		endDisplay(){
			return this.beginDisplay+3;
		},
		dayRangeToDisplay(){
			return this.getDaysRange.slice(this.beginDisplay,this.endDisplay);
		},
		getSlotsFromStore(){
      		return this.$store.state.slots;
    	}
	},
	methods:{
		getCurrentDayPlus2month(now){
			return moment(now).add(2,'month');
		},
		getDaysOfTheTimeRange(start,end){
			let arr = moment(start).twix(end).toArray('days');
			return arr;
		},
		getNextDays(){
			if (this.beginDisplay>=0){ this.beginDisplay += 3}
		},
		getPreviousDays(){
			if (this.beginDisplay>=3){this.beginDisplay -= 3}
		},
		selectTime(hour,day){
			this.displayAuth = false;
			let aptTime ={};
			aptTime.day = day;
			aptTime.hour = hour;
			this.aptMoment = moment(aptTime.day).startOf('day').add(cal.convertTimeInMinutes(aptTime.hour), 'minutes');
			//pass to store the details of the appointment
			console.log('aptMoment:', this.aptMoment);
			this.$store.commit('getAptTime', this.aptMoment);
			//pass to parent component Home the event to change display Auth to visible
			this.updateDisplayAuth()
		},
		updateDisplayAuth(){
			this.displayAuth = !this.displayAuth;
			console.log('this.displayAuth: ', this.displayAuth);
			this.$emit('displayAuth', this.displayAuth);
		},
		DisableButton(slots, hour, day){
			//this function is called in the v-for, and evaluate for each day and each hour if there is a slot matching. slot matching means there is an appointment at that time. if so the button will be disabled because this function return true
			console.log('setClass is called');
			for (let i=0; i<slots.length; i++){
				console.log('slot[i]:', slots[i]);
				console.log('slot[i].start: ', slots[i].start);
				if (moment(slots[i].start).format('YYYY-MM-DD') == moment(day).format('YYYY-MM-DD') && moment(slots[i].start).format('HH:mm') == hour){
						console.log('day matching: ', day);
						console.log('hour matching: ', hour);
						return true;
					} 
			}
		}
	},
	filters:{
		dateFormatDayName: function(date) {
			return moment(date).format('dddd');
		},
		dateFormatDayNumberAndMonth: function(date) {
			return moment(date).format('D MMM');
		},
		dateFormatFullDayHour: function(date){
			return moment(date).format('LLLL');
		}
	}
};
</script>



<style scoped>

</style>
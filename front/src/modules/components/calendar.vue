<template>
	<div>
		<v-card>
			<v-toolbar card class="card__head">
				<v-toolbar-title class="card__title">Sélectionnez votre RDV</v-toolbar-title>
			</v-toolbar card>
			<v-card-text>

				<table class="calendar">
					<thead class="calendar__head">
						<v-btn icon class="calendar__navicon"v-on:click="getPreviousDays()">
							<v-icon>navigate_before</v-icon>
						</v-btn>
						<!-- affichage de la date -->
						<tr class="calendar__headDays" v-for="(day,index) in dayRangeToDisplay">
							<ul class="calendar__headDayUl">
								<li class="calendar__headDayLi">{{day | dateFormatDayName}}</li>
								<li class="calendar__headDayLi">{{day | dateFormatDayNumberAndMonth}}</li>
							</ul>
						</tr>
						<v-btn icon class="calendar__navicon" v-on:click="getNextDays()">
							<v-icon>navigate_next</v-icon>
						</v-btn>
					</thead>
					<tbody class="calendar__body">
						<!-- affichage des boutons heures -->
						<tr class="calendar__bodyDay" v-for="(day,index) in dayRangeToDisplay" :key="index">
							<ul class="calendar__bodyUl"v-for="(hour, index) in hours" :key="index">
								<li class="calendar__bodyLi"><v-btn v-on:click="selectTime(hour,day)">{{hour}}</v-btn></li>
							</ul>
						</tr>
					</tbody>
				</table>
			</v-card-text>
		</v-card>
	</div>
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
			displayAuth:this.visibleProp
		}
	},
	computed:{
		getCurrentDay(){
			return moment();
		},
		getDaysRange(){
			let start= this.getCurrentDay;
			let end = this.getCurrentDayPlus2month(moment(start));
			return this.getDaysOfTheTimeRange(start, end);
		},
		endDisplay(){
			return this.beginDisplay+3;
		},
		dayRangeToDisplay(){
			return this.getDaysRange.slice(this.beginDisplay,this.endDisplay);
		}
	},
	methods:{
		getCurrentDayPlus2month(now){
			return moment(now).add(1,'month');
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


	.calendar__navicon {
		color:#212121;
	}

	.card__head{
		padding: 0;
	}

	.card__title{
		padding: 0;
		margin: auto;
		/*font-weight: bold;*/
	}

	.calendar{
		width:100%;
		margin-top: 0;
	}

	.calendar__head{
		display: flex;
		flex-direction:row;
		width: 70%;
		margin-top: 0;
		justify-content: center;
		border-bottom: 2px solid #673AB7;
		margin: auto;
	}

	.calendar__headDays{
		font-size: 14px;
		margin-bottom: 5px;
		margin-top:5px;
	}

	.calendar__headDayUl{
		width: 100px;
	}

	.calendar__headDayLi{
		padding: 0px;
		margin: 0px;
		list-style:none;
		width: 100%;
	}

	.calendar__body{
		display: flex;
		flex-direction:row;
		width: 70%;
		padding-top: 10px;
		justify-content: center;
		margin: auto;
	}

	.calendar__bodyLi{
		list-style:none;
		width: 100px;
	}


</style>
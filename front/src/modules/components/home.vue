<template>
  <div class="home">
    <div class="calendar">
    <h1>{{ msg }}</h1>
   <!--  <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
    </ul> -->
    <calendar></calendar>
    </div>
    <div class="authentication">
      <authentication></authentication>
    </div>
  </div>
</template>

<script>
import calendar from '@/modules/components/calendar'
import authentication from '@/modules/components/authentication'


export default {
  name: 'home',
  components: {
    calendar,
    authentication
  },
  data () {
    return {
      msg: 'Welcome to my booking App!',

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.home{
  width: 100%;
  /*overflow:auto;*/
  display: flex;
}

.calendar{
  float:left; 
  width: 50%;
 /* background:grey;*/
  height: 400px;
}

.authentication{
  float: right;
  width: 50%;
  /*background:pink;*/
  height: 400px;
}


/*h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/
</style>

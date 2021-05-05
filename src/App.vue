<template>
  <div id="app">
  <Search v-if="searchOn" v-on:updateArray="emptyArray" v-on:closeSearch="toggleSearch" :APIKEY="this.APi_KEY"/>
    <div class="auth-wrapper" >
      <Nav/>
      <div >
        <router-view v-on:deleteAll="clearTable" v-bind:cities="cities"  v-on:add-city="toggleSearch"/>

      </div>
    </div>
  </div>

</template>

<script>
  import Nav from './components/Nav.vue'
  import axios from "axios";
  import Search from "./components/Search";

export default {

  name: 'App',
  components:{
    Search,
    Nav,
  },
  data(){
    return {
      APi_KEY:'cd60366880fe53294e1f87cd84fcd4fa',

      cities:[],
      searchOn:false
    }
  },
  methods:{
    getCurrentWeather(city){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.APi_KEY}`)
          .then((res)=>{
        console.log(res.data)
            this.cities.push(res.data)
      })
    },

    toggleSearch(){
      this.searchOn=!this.searchOn
    },
    emptyArray(city){
      this.cities=[]
      this.getCurrentWeather(city)

    },
    async clearTable(){
      //haen salaisen idn
      const res=await axios.get('http://localhost:3000/user',{
        headers:{
          Authorization: 'beartoken ' +localStorage.getItem('token')
        }
      })
      const key={
        user:res.data.data.user.userId
      }
      const response=await axios.post('http://localhost:3000/clearTable/', key)
      console.log(response)
      this.cities=[]
      location.reload()
    }
  },
  async created() {
    if (localStorage.getItem('token')!==null){
    try {
      //tarkistaa onko kirjautunut
      const response=await axios.get('http://localhost:3000/user',{
        headers:{
          Authorization: 'beartoken ' +localStorage.getItem('token')
        }
      })
      this.$store.dispatch('user',response.data.data.user)

      const key= {
        user:response.data.data.user.userId
      }
      const res=await axios.post('http://localhost:3000/getCountries',key)
      for (let i=0;i<res.data.length;i++){
        let Cweather=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${res.data[i].country}&units=metric&appid=${this.APi_KEY}`)
        this.cities.push(Cweather.data)
      }
     console.log(this.cities)
    }catch (e){
      console.log(e)
    }
    }

  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;

}
body{
  background-color: #313640;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: Fira Sans,sans-serif;

}

#app{
  text-align: center;
}
body,html,#app,#root,.auth-wrapper{
  width: 100%;
  height: 100%;

}
.auth-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-wrapper,.form.control:focus{
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}


</style>

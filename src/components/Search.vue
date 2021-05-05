<template>
<div @click="closeSearch" class="searchCountry" ref="modal">
  <div class="wrap" ref="modalwrap">
    <label>Enter city name</label>
    <input type="text" name="city-name" placeholder="search" v-model="city">
    <button v-on:click="addCity" v-if="user" class="addthis">Add</button>
    <button v-on:click="addGuest" v-else-if="!user" class="addthis">Add</button>
  </div>
</div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
export default {

name: "Search",
  props:['APIKEY'],
  data(){
  return{
    city:"",
  }
  },
  methods:{
      closeSearch(e){
        if (e.target===this.$refs.modal){
          this.$emit('closeSearch')
        }

      },
   async addCity(){
      if (this.city==""){
        alert("Fill out the field")
      }else{

        //haetaan maan tiedot
        const res =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIKEY}`)
        const countryName=await res.data.name
        //tallenetaan tietokantaan
        //haen kyseisen käyttäjän idn
        if (countryName!=="") {
          const response = await axios.get('http://localhost:3000/user', {
            headers: {
              Authorization: 'beartoken ' + localStorage.getItem('token')
            }
          })
          const key = {
            user: response.data.data.user.userId,
            country: countryName
          }
          const send = await axios.post('http://localhost:3000/NewCountry', key)
        console.log(send)
          location.reload()
        }

      }
      },
    addGuest(){
        if (this.city===""){
          return alert("Fill out the field")
        }else{
          console.log("Triggered")
          this.$emit("updateArray",this.city)
        }
    }
  },
  computed:{
    ...mapGetters(['user'])
  }

}
</script>

<style scoped>
.searchCountry{
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
label {
  color: #fff;
}
.wrap {
  max-width: 500px;
  border-radius: 8px;
  width: 80%;
  padding: 20px;
  background-color: #31363d;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
input{
  color: #fff;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  padding: 6px 4px;
  margin: 10px 0 20px;
  width: 100%;
}
.addthis{
  background-color: #222325;
  color: #fff;
  padding: 6px 20px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

</style>
<template>
  <main>
  <header >
    <nav class="SearchCity" v-if="user">
      <span>Search cities</span>
      <div class="right">
        <i @click="searchToggle" class="fas fa-plus"></i>
        <i @click="deleteAll" class="fas fa-trash-alt"></i>
      </div>
    </nav>
    <nav class="SearchCity" v-else-if="!user">
      <span>Search cities</span>
      <div class="right">
        <i @click="searchToggle" class="fas fa-search"></i>

      </div>
    </nav>
    <div class="grid">
      <div v-for="(city,index) in cities" v-bind:key="index">
        <City v-bind:city="city"/>
      </div>
    </div>
  </header>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
import City from "./City";
export default {
  name: "Weather",
  components: {City},
  props:["cities"],
  methods:{
    searchToggle(){

    this.$emit("add-city")
    },
    deleteAll(){
      let isBoss = confirm("Delete all?");
      console.log(isBoss)
      if (isBoss===true){
        this.$emit('deleteAll')
      }
    }
  },
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>

.SearchCity{
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0,0,0.1);
  top: 17%;
  left: 4%;
  padding:20px;
  background-color: #313640;
}
nav{
  display: flex;
  color: white;
  padding:30px 0px;
  justify-content: space-between;
}
.right :nth-child(2) {
  margin-left: 16px;
}
.right :nth-child(3) {
  margin-left: 16px;
}

.right{
  font-size: 20px;
}
span{
  font-weight: 600;
  font-family:sans-serif;
}
.grid {
  display: grid;
  max-width: 1024px;
  width: 100%;
  position: absolute;
  top: 200px;
  left: 60px;
  color: white;
  background-color: #313640;
  min-height: 100vh;
  grid-auto-rows: 250px;

}
@media (min-width: 400px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }}
</style>
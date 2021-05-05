<template>
<div  class="city">
  <span >{{this.city.name}}</span>
<div class="weather">
  <span>{{Math.round(this.city.main.temp)}}&#8451; </span>
  <img v-bind:src="this.urls" alt="WeatherIcon">
</div>
  <div class="video">
    <video autoplay loop muted :src="require(`../../public/videos/${this.city.weather[0].icon}.mp4`)"></video>
  </div>

</div>


</template>

<script>
export default {
  name: "City",
  props:['city'],
  data(){
    return{
      urls: `http://openweathermap.org/img/wn/${this.city.weather[0].icon}@2x.png`
    }
  },
  created() {
    console.log(this.city)

  }
}
</script>

<style scoped>
.city{
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: white;
  box-shadow: 0px 14px 80px rgba(34,35,58,0.2);
}
span{
  z-index: 1;
  text-transform: capitalize;
  display: block;
  font-size: 25px;
  font-weight: 600;
}
.weather{
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
}
.weather span{
  font-size: 35px;
  margin-right: 8px;
}
img{
  height: 20px;
  width: auto;
}
.video{
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (min-width: 900px) {
  video{
    height: auto;
    width: 100%;
  }
}

</style>
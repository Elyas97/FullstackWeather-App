<template>

    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">

        <a class="navbar-brand">MyWeatherApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto" v-if="user==null || user=='undefined'">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Weather</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" href="#" class="nav-link">Register</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-else-if="user!==null">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Weather</router-link>
            </li>
            <li class="nav-item">
              <a v-on:click="handleLOG" class="nav-link" href="javascript:void(0)">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Nav",
  methods:{
    handleLOG:function () {
      localStorage.removeItem('token');
        this.$store.dispatch('user',null)
       this.$router.push('/login')
        location.reload()

    }
  },
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.navbar-light{
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34,35,58,0.2);
}

</style>
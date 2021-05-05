<template>
  <div class="auth-inner">
<form @submit="handleSubmit">
  <h3>Login</h3>
  <div class="form-group">
    <label for="InputEmail1">Email address</label>
    <input :class="isActive ? 'form-control':'form-control is-invalid'" name="lname" v-model="email"  class="form-control" id="InputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="InputPassword1">Password</label>
    <input :class="isActive ? 'form-control':'form-control is-invalid'" name="lpassword" v-model="password" type="password" class="form-control" id="InputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
  </div>
  <button class="btn btn-primary btn-block">Login</button>
  <p class="forgot-password text-right"><router-link to="/register">Forgot your password?</router-link></p>
</form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data(){
    return{
      isActive:true,
      email:'',
      password:''
    }
  },
  methods:{
    handleSubmit: async function (e) {
      e.preventDefault()
      const data={
        email:this.email,
        password:this.password
      }
      let response
      try {
         response=await axios.post('http://localhost:3000/login',data)
        localStorage.setItem('token',response.data.token)
        console.log(response.data)
        this.$store.dispatch('user',response.data.user)
          this.$router.push('/').catch(err => {
            // Ignore the vuex err regarding  navigating to the page they are already on.
            if (
                err.name !== 'NavigationDuplicated' &&
                !err.message.includes('Avoided redundant navigation to current location')
            ) {
              // But print any other errors to the console
              console.log(err);
            }
          });
         location.reload()


      }catch (e) {
        this.isActive=false
      }

    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;

}
body{
  background: cornflowerblue;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: Fira Sans,sans-serif;

}
h1,h2,h3,label,span{
  font-weight: 500;
  font-family: inherit;
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
.auth-inner{
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34,35,58,0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
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
.forgot-password a{
  color: #167bff;
}

</style>
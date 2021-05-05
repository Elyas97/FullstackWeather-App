<template>
<div class="auth-inner">
<form  @submit="handleSubmit">
  <h3>Sign up</h3>
  <div class="form-group">
    <label for="fname">First Name</label>
    <input id="fname" name="first_name" type="text" class="form-control" v-model="first_name" placeholder="First Name" required pattern="[A-Z][a-z]{2,}" >
  </div>
  <div class="form-group">
    <label for="lname">Last Name</label>
    <input id="lname" name="last_name" type="text" class="form-control" v-model="last_name" placeholder="Last Name" required pattern="[A-Z][a-z]{2,}">
  </div>

  <div v-if="!emailtaken" class="form-group">
    <label for="email">Email</label>
    <input v-model="email" id="email" name="email" type="email" class="form-control" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Email">
  </div>
  <div v-else-if="emailtaken===true" class="form-group">
    <label >Email</label>
    <input v-model="email" name="email" type="email" class="form-control is-invalid" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Email">
    <div id="validationServer03Feedback" class="invalid-feedback">
      Email already registered
    </div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input id="password" v-model="password" name="password" type="password" class="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
  </div>
  <div class="form-group">
    <label for="Cpassword">Confirm Password</label>
    <input :class="isActive ? 'form-control':'form-control is-invalid'" v-model="cpassword" id="Cpassword" name="Cpassword" type="password" class="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
  </div>
<button class="btn btn-primary btn-block">Register</button>
</form>
</div>
</template>

<script>
import axios from 'axios'
export default {
name: "Register",
  data(){
  return{
    isActive: true,
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    cpassword:'',
    wrongpass:false,
    emailtaken: false
  }
  },
  methods:{
  handleSubmit: async function (e) {

    e.preventDefault()
    if (this.password!=this.cpassword){
      this.isActive=false
      return console.log("Wrong password")
    }
    const data={
      first_name:this.first_name,
      last_name:this.last_name,
      email:this.email,
      password:this.password
    }
    console.log("Submitted",data)
    let response;
    try {
       response = await axios.post('http://localhost:3000/register',data)
        if (response.data=='Email taken'){
        this.emailtaken=true
        console.log(this.emailtaken)
        }else{
        this.$router.push('/login')

        console.log(response)
        }
    }catch (e){
     console.log(e)
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

</style>
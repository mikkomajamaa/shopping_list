const baseUrl = '/api/notes'

new Vue({
  el: '.js-instance',
  name: 'vue-instance',

  data() {
    return {
      loginStatus: 1,
      id: null,
      itemName: null,
      itemNotes: null,
      username: null,
      password: null,
      newUsername: null,
      newPassword: null,
      newPassword2: null,
      token: null,
      warning: null,
      loginError: null,
      pwsDontMatch: 0,
      signUpText: null,
      items: [],
      user: null,
      id: null,
      loggedInUser: null,
    };
  },


  mounted() {
  },

  methods: {
    changeLoginStatus() {
        this.warning = null;
        this.signUpText = null;
        this.newUsername = null;
        this.newPassword = null;
        this.newPassword2 = null;
        if (this.loginStatus == 1) {
          this.loginStatus = 2;
          this.loginError = 0;
        } else if (this.loginStatus == 2){
          this.loginStatus = 1;
        } else if (this.loginStatus == 3) {
          this.loginStatus = 1;
          this.token = 0;
          this.items = [];
          this.loggedInUser = null;
        }
        this.pwsDontMatch = 0;
        this.signUpText = null;
    },


    removeItem(index) {
      var id = this.items[index];
      if ((id) && (this.token)){
        id = this.items[index]['id']
        const AuthStr = 'Token '.concat(this.token);

        axios({
          method: "delete",
          url: `${baseUrl}/${id}`,
          headers: {authorization: AuthStr}
        }).then(response => {
          this.items.splice(index, 1);
          this.saveItems();
        })



      } else {
        this.warning = "You can't delete this note";
        return;
      }
    },

    login() {
      const userObject = {user: {
        email: this.username,
        password: this.password}
      }


      axios({
        method: "post",
        url: "/api/users/login",
        data: userObject
      }).then(response =>{
        this.token = response.data.user.token
        this.loginError = null;
        this.loginStatus = 3;
        this.user = response.data.user
        this.id = response.data._id
        this.username = null
        this.password = null
        this.loggedInUser = response.data.user.email

        const AuthStr = 'Token '.concat(this.token);

        axios({
          url: baseUrl,
          headers: {authorization: AuthStr}
        })
          .then(res => {
             this.items = res.data;
           })
           .catch(function (error) {
             console.log(error)
           })



        return
      })
      .catch((error) => {
        this.loginError = 'Invalid username or password.';
      });

    },

    createAccount() {
      if (!(this.newPassword == this.newPassword2)) {
        this.pwsDontMatch = 1;
        return;
      }

      const userObject = {user: {
          email: this.newUsername,
          password: this.newPassword
        }
      }

      axios({
        method: "post",
        url: "/api/users",
        data: userObject
      }).then(response =>{
        this.signUpText = "Created a new account.";
        this.newUsername = null;
        this.newPassword = null;
        this.newPassword2 = null;
      }).catch((error) => {
        this.signUpText = "Name is already taken.";
        this.newUsername = null;
        this.newPassword = null;
        this.newPassword2 = null;
      })
    },

    add() {
      if (!this.itemName) {
        this.warning = 'No empty product names allowed.';
        return;
      }

      const AuthStr = 'Token '.concat(this.token);


        const noteObject = {
          item: this.itemName,
          additionalNotes: this.itemNotes,
        }

        axios({
          method: "post",
          url: baseUrl,
          data: noteObject,
          headers: {authorization: AuthStr}
        }).then(response =>{
          this.id = response.data.id
            this.items.push(
              {id: this.id, item: this.itemName, additionalNotes: this.itemNotes}
            )
          this.itemName = '';
          this.itemNotes = '';
          this.id = '';
          this.warning = '';
        })
      .catch((error) => {
        console.log('error 3 ' + error);
      })
    },
  }
});

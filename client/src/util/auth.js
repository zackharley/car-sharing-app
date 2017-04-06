let loggedIn = false;
let currentUser = '';

module.exports = {
  login(userID) {
    var loginData = {
      'userID': userID
    };

    localStorage.setItem('loginData', JSON.stringify(loginData));
  },

  logout() {
    localStorage.setItem('loginData', null);
  },

  sync(callback) {
    var data = JSON.parse(localStorage.getItem('loginData'));

    if(data !== null)
      loggedIn = true;

    if(typeof callback === "function")
      callback();
  },

  isLoggedIn() {
    return loggedIn;
  }
}

let loggedIn = false;
let isAdmin = false;
let currentUser = '';
let reactComponent = null;

module.exports = {
  login(userID, adminFlag) {
    var loginData = {
      'userID': userID,
      'loggedIn': true,
      'isAdmin': adminFlag
    };

    isAdmin = adminFlag;

    if(reactComponent !== null) {
      reactComponent.setState({
        'loggedIn': true,
        'isAdmin': adminFlag
      });
    }

    localStorage.setItem('loginData', JSON.stringify(loginData));
  },

  logout() {
    localStorage.setItem('loginData', null);
    loggedIn = false;
    isAdmin = false;
    currentUser = '';

    if(reactComponent !== null) {
      reactComponent.setState({
        'loggedIn': false,
        'isAdmin': false
      });
    }
  },

  sync(callback) {
    var data = JSON.parse(localStorage.getItem('loginData'));

    if(data !== null) {
      loggedIn = true;

      currentUser = data.userID;
      isAdmin = data.isAdmin;

      if(reactComponent !== null) {
        reactComponent.setState({
          'loggedIn': true,
          'isAdmin': isAdmin
        });
      }
    }

    if(typeof callback === "function")
      callback();
  },

  isLoggedIn() {
    return loggedIn;
  },

  isAdmin() {
    return isAdmin;
  },

  bindToChange(toBind) {
    reactComponent = toBind;
  },

  getCurrentUser() {
    return currentUser;
  }
}

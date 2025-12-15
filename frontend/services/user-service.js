var UserService = {
  init: function () {
    console.log("UserService.init() called");
    
    var token = localStorage.getItem("user_token");
    if (token && token !== undefined) {
      window.location.href = "index.html";
      return;
    }

    $("#login-form").on("submit", function(e) {
      e.preventDefault(); 
      console.log("Login form submitted");
      
      var entity = Object.fromEntries(new FormData(this).entries());
      console.log("Login data:", entity);
      UserService.login(entity);
    });

    $("#register-form").on("submit", function(e) {
      e.preventDefault(); 
      console.log("Register form submitted");
      
      var entity = Object.fromEntries(new FormData(this).entries());
      console.log("Register data:", entity);
      
      if (entity.password !== entity.password_confirm) {
        alert("Passwords do not match!");
        return;
      }
      
      UserService.register(entity);
    });

    console.log("Forms initialized");
  },

  login: function (entity) {
    console.log("Sending login request to:", Constants.PROJECT_BASE_URL + "auth/login");
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/login",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log("Login successful:", result);
        
        if (result.data && result.data.token) {
          localStorage.setItem("user_token", result.data.token);
          alert("Welcome back! Logging in as " + entity.email);
          window.location.href = "index.html";
        } else {
          alert("Login failed: No token received");
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.error("Login error:", XMLHttpRequest);
        var errorMsg = 'Login failed';
        
        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
          errorMsg += ': ' + XMLHttpRequest.responseJSON.message;
        } else if (XMLHttpRequest.responseText) {
          errorMsg += ': ' + XMLHttpRequest.responseText;
        } else {
          errorMsg += ': Unable to connect to server';
        }
        
        alert(errorMsg);
      },
    });
  },

  register: function (entity) {
    console.log("Sending register request to:", Constants.PROJECT_BASE_URL + "auth/register");
    
    delete entity.password_confirm;
    
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/register",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log("Registration successful:", result);
        alert('Registration successful! Please login.');
        
        $('.tab-btn[data-tab="login"]').click();
        $('#register-form')[0].reset();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.error("Registration error:", XMLHttpRequest);
        var errorMsg = 'Registration failed';
        
        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
          errorMsg += ': ' + XMLHttpRequest.responseJSON.message;
        } else if (XMLHttpRequest.responseText) {
          errorMsg += ': ' + XMLHttpRequest.responseText;
        } else {
          errorMsg += ': Unable to connect to server';
        }
        
        alert(errorMsg);
      },
    });
  },

  logout: function () {
    localStorage.clear();
    window.location.href = "login.html";
  },

  updateNavigation: function() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const decoded = Utils.parseJwt(token);
    if (!decoded || !decoded.user) {
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    const user = decoded.user;
    
    let navHtml = `
      <li><a href="#home">Home</a></li>
      <li><a href="#destinations">Destinations</a></li>
      <li><a href="#packages">Packages</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    `;

    if (user.role === Constants.ADMIN_ROLE) {
      navHtml += `<li><a href="#admin">Admin</a></li>`;
    }

    $("#navMenu").html(navHtml);
    
    $(".auth-buttons").html(`
      <button class="btn-login" onclick="UserService.logout()">Logout</button>
    `);
  }
};
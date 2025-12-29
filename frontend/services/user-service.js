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
        toastr.error("Passwords do not match!");
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
          
          // Decode JWT and store user info
          const decoded = Utils.parseJwt(result.data.token);
          console.log("Decoded JWT:", decoded);

          if (decoded && decoded.user) {
            const userInfo = {
              id: decoded.user.user_id || decoded.user.id,
              role: decoded.user.role,
              email: decoded.user.email,
              full_name: decoded.user.full_name,
              username: decoded.user.username
            };
            localStorage.setItem("user_info", JSON.stringify(userInfo));
          }
          
          toastr.success("Welcome back! Login successful.");
          window.location.href = "index.html";
        } else {
          toastr.error("Login failed: No token received");
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.error("Login error:", XMLHttpRequest);
        var errorMsg = 'Login failed';
        
        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
          errorMsg = XMLHttpRequest.responseJSON.message;
        } else if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
          errorMsg = XMLHttpRequest.responseJSON.error;
        } else if (XMLHttpRequest.responseText) {
          errorMsg = XMLHttpRequest.responseText;
        } else {
          errorMsg = 'Unable to connect to server';
        }
        
        toastr.error(errorMsg);
      },
    });
  },

  register: function (entity) {
    console.log("Sending register request to:", Constants.PROJECT_BASE_URL + "auth/register");
    
    // Remove password_confirm before sending to server
    delete entity.password_confirm;
    
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/register",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log("Registration successful:", result);
        toastr.success('Registration successful! Please login.');
        
        // Switch to login tab
        $('.tab-btn[data-tab="login"]').click();
        $('#register-form')[0].reset();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.error("Registration error:", XMLHttpRequest);
        var errorMsg = 'Registration failed';
        
        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
          errorMsg = XMLHttpRequest.responseJSON.message;
        } else if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
          errorMsg = XMLHttpRequest.responseJSON.error;
        } else if (XMLHttpRequest.responseText) {
          errorMsg = XMLHttpRequest.responseText;
        } else {
          errorMsg = 'Unable to connect to server';
        }
        
        toastr.error(errorMsg);
      },
    });
  },

  logout: function () {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    toastr.info("You have been logged out.");
    window.location.href = "login.html";
  },

  updateNavigation: function() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      return;
    }

    const decoded = Utils.parseJwt(token);
    if (!decoded || !decoded.user) {
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    const user = decoded.user;
    
    // Build navigation based on role
    let navHtml = `
      <li><a href="#home">Home</a></li>
      <li><a href="#destinations">Destinations</a></li>
      <li><a href="#packages">Packages</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    `;

    // Add admin link only for admin role
    if (user.role === Constants.ADMIN_ROLE) {
      navHtml += `<li><a href="#admin">Admin</a></li>`;
    }

    $("#navMenu").html(navHtml);
    
    // Update auth buttons
    $(".auth-buttons").html(`
      <span style="margin-right: 15px; color: white;">Welcome, ${user.full_name || user.username || user.email}</span>
      <button class="btn-logout" onclick="UserService.logout()">Logout</button>
    `);
  },

  isLoggedIn: function() {
    const token = localStorage.getItem("user_token");
    if (!token) return false;
    
    const decoded = Utils.parseJwt(token);
    if (!decoded || !decoded.exp) return false;
    
    // Check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      localStorage.clear();
      return false;
    }
    
    return true;
  },

  getCurrentUser: function() {
    const userInfo = localStorage.getItem("user_info");
    if (!userInfo) return null;
    
    try {
      return JSON.parse(userInfo);
    } catch (e) {
      console.error("Error parsing user info:", e);
      return null;
    }
  },

  getUserRole: function() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  },

  isAdmin: function() {
    return this.getUserRole() === Constants.ADMIN_ROLE;
  }
};
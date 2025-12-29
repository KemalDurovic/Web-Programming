let RestClient = {

  get: function (url, callback, error_callback) {
    $.blockUI({ message: "<h3>Processing...</h3>" });

    $.ajax({
      url: Constants.PROJECT_BASE_URL + url,
      type: "GET",

      beforeSend: function (xhr) {
        const token = localStorage.getItem("user_token");

        if (token) {
          // Remove "Bearer " prefix if it exists, backend expects raw token
          const cleanToken = token.replace('Bearer ', '');
          xhr.setRequestHeader("Authentication", cleanToken);
        }
      },

      success: function (response) {
        if (callback) callback(response);
      },

      error: function (jqXHR) {
        // Handle 401 Unauthorized - redirect to login
        if (jqXHR.status === 401) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_info");
          toastr.error("Session expired. Please login again.");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
          return;
        }

        if (error_callback) error_callback(jqXHR);
        else toastr.error(jqXHR?.responseJSON?.message || jqXHR?.responseJSON?.error || "Server error");
      },

      complete: function () {
        $.unblockUI();
      }
    });
  },

  request: function (url, method, data, callback, error_callback) {
    $.blockUI({ message: "<h3>Processing...</h3>" });

    $.ajax({
      url: Constants.PROJECT_BASE_URL + url,
      type: method,
      contentType: "application/json",
      data: data ? JSON.stringify(data) : null,

      beforeSend: function (xhr) {
        const token = localStorage.getItem("user_token");

        if (token) {
          // Remove "Bearer " prefix if it exists, backend expects raw token
          const cleanToken = token.replace('Bearer ', '');
          xhr.setRequestHeader("Authentication", cleanToken);
        }
      },

      success: function (response) {
        if (callback) callback(response);
      },

      error: function (jqXHR) {
        // Handle 401 Unauthorized - redirect to login
        if (jqXHR.status === 401) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_info");
          toastr.error("Session expired. Please login again.");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
          return;
        }

        if (error_callback) error_callback(jqXHR);
        else toastr.error(jqXHR?.responseJSON?.message || jqXHR?.responseJSON?.error || "Server error");
      },

      complete: function () {
        $.unblockUI();
      }
    });
  },

  post: function (url, data, callback, error_callback) {
    RestClient.request(url, "POST", data, callback, error_callback);
  },

  delete: function (url, data, callback, error_callback) {
    RestClient.request(url, "DELETE", data, callback, error_callback);
  },

  patch: function (url, data, callback, error_callback) {
    RestClient.request(url, "PATCH", data, callback, error_callback);
  },

  put: function (url, data, callback, error_callback) {
    RestClient.request(url, "PUT", data, callback, error_callback);
  }
};
let RestClient = {

  get: function (url, callback, error_callback) {
    $.blockUI({ message: "<h3>Processing...</h3>" });

    $.ajax({
      url: Constants.PROJECT_BASE_URL + url,
      type: "GET",

      beforeSend: function (xhr) {
        const token = localStorage.getItem("user_token");
        console.log("TOKEN IZ LOCALSTORAGE:", token);

        if (token) {
          
          xhr.setRequestHeader("Authorization", "Bearer " + token);
          xhr.setRequestHeader("Authentication", "Bearer " + token);
        }
      },

      success: function (response) {
        if (callback) callback(response);
      },

      error: function (jqXHR) {
        if (error_callback) error_callback(jqXHR);
        else toastr.error(jqXHR?.responseJSON?.message || "Server error");
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
        console.log("TOKEN IZ LOCALSTORAGE:", token);

        if (token) {
          
          xhr.setRequestHeader("Authorization", "Bearer " + token);
          xhr.setRequestHeader("Authentication", "Bearer " + token);
        }
      },

      success: function (response) {
        if (callback) callback(response);
      },

      error: function (jqXHR) {
        if (error_callback) error_callback(jqXHR);
        else toastr.error(jqXHR?.responseJSON?.message || "Server error");
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

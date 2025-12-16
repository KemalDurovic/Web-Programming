$(document).ready(function() {
        UserService.init();
        
        // Forgot Password Modal Logic
        const modal = $('#forgotPasswordModal');
        const closeBtn = $('.close');
        
        // Open modal when forgot password link is clicked
        $('.forgot-link').on('click', function(e) {
            e.preventDefault();
            modal.css('display', 'block');
        });
        
        // Close modal when X is clicked
        closeBtn.on('click', function() {
            modal.css('display', 'none');
        });
        
        // Close modal when clicking outside of it
        $(window).on('click', function(e) {
            if (e.target.id === 'forgotPasswordModal') {
                modal.css('display', 'none');
            }
        });
        
        // Handle forgot password form submission
        $('#forgot-password-form').on('submit', function(e) {
            e.preventDefault();
            
            const email = $('#reset-email').val();
            const newPassword = $('#new-password').val();
            const confirmPassword = $('#confirm-new-password').val();
            
            // Validate passwords match
            if (newPassword !== confirmPassword) {
                toastr.error('Passwords do not match!');
                return;
            }
            
            // Validate password length
            if (newPassword.length < 6) {
                toastr.error('Password must be at least 6 characters long!');
                return;
            }
            
            // Call the reset password service
            $.ajax({
                url: 'http://localhost/web-programming/rest/auth/reset-password',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    new_password: newPassword
                }),
                success: function(response) {
                    toastr.success('Password reset successfully!');
                    modal.css('display', 'none');
                    $('#forgot-password-form')[0].reset();
                },
                error: function(xhr) {
                    const error = xhr.responseJSON?.error || 'Failed to reset password';
                    toastr.error(error);
                }
            });
        });
    });
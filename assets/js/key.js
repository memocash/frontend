(function () {
    /**
     * @param {int} id
     * @param {jQuery} $form
     * @param {jQuery} $keyDiv
     */
    MemoApp.Form.LoadKey = function (id, $form, $keyDiv) {
        $form.submit(function (e) {
            e.preventDefault();
            var password = $form.find("[name=password]").val();
            if (password.length === 0) {
                alert("Must enter a password.");
                return;
            }

            $.ajax({
                type: "POST",
                url: MemoApp.GetBaseUrl() + MemoApp.URL.LoadKey,
                data: {
                    id: id,
                    password: password
                },
                success: function (keyHtml) {
                    $keyDiv.html(keyHtml);
                },
                /**
                 * @param {XMLHttpRequest} xhr
                 */
                error: function (xhr) {
                    if (xhr.status === 401) {
                        alert("Error unlocking. Please try again.");
                    } else {
                        MemoApp.Form.ErrorHandler(xhr);
                    }
                }
            });
        });
    };
    /**
     * @param {jQuery} $form
     * @param {jQuery} $outDiv
     */
    MemoApp.Form.ChangePassword = function ($form, $outDiv) {
        $form.submit(function (e) {
            e.preventDefault();
            var oldPassword = $form.find("[name=old-password]").val();
            if (oldPassword.length === 0) {
                alert("Must enter a password.");
                return;
            }
            var newPassword = $form.find("[name=new-password]").val();
            if (newPassword.length === 0) {
                alert("Must enter a new password.");
                return;
            }
            var retypeNewPassword = $form.find("[name=retype-new-password]").val();
            if (retypeNewPassword.length === 0) {
                alert("Must retype new password.");
                return;
            }
            if (retypeNewPassword !== newPassword) {
                alert("Passwords do not match.");
                return;
            }

            $.ajax({
                type: "POST",
                url: MemoApp.GetBaseUrl() + MemoApp.URL.KeyChangePasswordSubmit,
                data: {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                success: function (keyHtml) {
                    $outDiv.html(keyHtml);
                },
                /**
                 * @param {XMLHttpRequest} xhr
                 */
                error: function (xhr) {
                    if (xhr.status === 401) {
                        alert("Error unlocking. Please try again.");
                    } else {
                        MemoApp.Form.ErrorHandler(xhr);
                    }
                }
            });
        });
    };
})();

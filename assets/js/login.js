(function () {
    /**
     * @param {jQuery} $ele
     */
    MemoApp.Form.Login = function ($ele) {
        $ele.submit(function (e) {
            e.preventDefault();
            var username = $ele.find("[name=username]").val();
            var password = $ele.find("[name=password]").val();

            if (username.length === 0) {
                alert("Must enter a username.");
                return;
            }

            if (password.length === 0) {
                alert("Must enter a password.");
                return;
            }

            $.ajax({
                type: "POST",
                url: MemoApp.GetBaseUrl() + MemoApp.URL.LoginSubmit,
                data: {
                    username: username,
                    password: password
                },
                success: function () {
                    window.location = MemoApp.GetBaseUrl() + MemoApp.URL.Index
                },
                /**
                 * @param {XMLHttpRequest} xhr
                 */
                error: function (xhr) {
                    switch(xhr.status) {
                        case 401:
                            alert("Invalid username or password. Please try again.");
                            return
                        case 500:
                            alert("Server side issue. Please try again.");
                            return
                    }
                    var errorMessage =
                        "Error logging in:\n" + xhr.responseText + "\n" +
                        "If this problem persists, try refreshing the page.";
                    alert(errorMessage);
                }
            });
        });
    };
})();

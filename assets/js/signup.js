(function () {
    /**
     * @param {jQuery} $form
     * @param {jQuery} $privateKeyField
     */
    MemoApp.Form.Signup = function ($form, $privateKeyField) {
        var $radio = $form.find("[name=key-type]");
        $radio.change(function () {
            console.log($radio.val());
            if ($radio.filter(':checked').val() === "import") {
                $privateKeyField.show();
            } else {
                $privateKeyField.hide();
            }
        });

        $form.submit(function (e) {
            e.preventDefault();
            var username = $form.find("[name=username]").val();
            var password = $form.find("[name=password]").val();
            var retypePassword = $form.find("[name=retype-password]").val();
            if (!$form.find("[name=accept]").is(':checked')) {
                alert("Please accept the disclaimer");
                return;
            }

            if (username.length === 0) {
                alert("Must enter a username.");
                return;
            }

            if (password.length === 0) {
                alert("Must enter a password.");
                return;
            }

            if (retypePassword.length === 0) {
                alert("Must retype password.");
                return;
            }

            if (retypePassword !== password) {
                alert("Password don't match.");
                return;
            }

            var privateKey;
            if ($radio.filter(':checked').val() === "import") {
                privateKey = $form.find("[name=private-key]").val();
                if (privateKey.length === 0) {
                    alert("Must enter a private key for import.");
                    return;
                }
            }

            $.ajax({
                type: "POST",
                url: MemoApp.GetBaseUrl() + MemoApp.URL.SignupSubmit,
                data: {
                    username: username,
                    password: password,
                    wif: privateKey
                },
                success: function () {
                    window.location = MemoApp.GetBaseUrl() + MemoApp.URL.Index
                },
                /**
                 * @param {XMLHttpRequest} xhr
                 */
                error: function (xhr) {
                    var errorMessage =
                        "Error creating account:\n" + xhr.responseText + "\n" +
                        "If this problem persists, try refreshing the page.";
                    alert(errorMessage);
                }
            });
        });
    };
})();

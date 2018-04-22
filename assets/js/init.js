var MemoApp = {
    Template: {},
    Form: {}
};

(function () {
    /**
     * @param token {string}
     */
    MemoApp.InitCsrf = function (token) {
        /**
         * @param method {string}
         * @returns {boolean}
         */
        function csrfSafeMethod(method) {
            // HTTP methods that do not require CSRF protection.
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        $.ajaxSetup({
            crossDomain: false,
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRF-Token", token);
                }
            }
        });
    };

    var BaseURL = "/";

    /**
     * @param url {string}
     */
    MemoApp.SetBaseUrl = function (url) {
        BaseURL = url;
    };

    /**
     * @return {string}
     */
    MemoApp.GetBaseUrl = function () {
        return BaseURL;
    };

    /**
     * @param {XMLHttpRequest} xhr
     */
    MemoApp.Form.ErrorHandler = function (xhr) {
        var errorMessage =
            "Error with request (response code " + xhr.status + "):\n" +
            (xhr.responseText !== "" ? xhr.responseText + "\n" : "") +
            "If this problem persists, try refreshing the page.";
        alert(errorMessage);
    };

    MemoApp.Events = {};

    MemoApp.URL = {
        Index: "",
        Profile: "profile",
        LoadKey: "key/load",
        LoginSubmit: "login-submit",
        SignupSubmit: "signup-submit",
        MemoPost: "post",
        MemoNewSubmit: "memo/new-submit",
        MemoFollowSubmit: "memo/follow-submit",
        MemoUnfollowSubmit: "memo/unfollow-submit",
        MemoSetNameSubmit: "memo/set-name-submit",
        MemoLikeSubmit: "memo/like-submit",
        KeyChangePasswordSubmit: "key/change-password-submit"
    };
})();

$(document).ready(function () {
    $("#loginEmail").bind('input propertychange', monitorInput);
    $("#loginPassword").bind('input propertychange', monitorInput);
    refreshImageCaptcha();
})

function monitorInput() {
    if (!$.trim($("#loginEmail").val()).match(/.+@.+\..+/)) {
        $("#loginEmail").attr("class", "form-control is-invalid");
        $("#loginEmailVerification").attr("class", "input-group-text invalid-feedback");
        $("#loginEmailVerification").html("请输入有效的邮箱！");
    } else {
        $("#loginEmail").attr("class", "form-control is-valid");
        $("#loginEmailVerification").attr("class", "input-group-text valid-feedback");
        $("#loginEmailVerification").html("邮箱格式正确！");
    }

    if ($.trim($("#loginPassword").val()).length < 5) {
        $("#loginPassword").attr("class", "form-control col-sm-12 col-md-6 col-lg-6 is-invalid");
        $("#loginPasswordVerification").attr("class", "input-group-text invalid-feedback");
        $("#loginPasswordVerification").html("密码必须大于5位！");
    } else {
        $("#loginPassword").attr("class", "form-control col-sm-12 col-md-6 col-lg-6 is-valid");
        $("#loginPasswordVerification").attr("class", "input-group-text valid-feedback");
        $("#loginPasswordVerification").html("密码格式正确！");
    }
}

function refreshImageCaptcha() {
    $.ajax({
        type: "get",
        url: "captcha/",
        headers: {
            "Accept": "text/html"
        },
        success: function (data) {
            $('#loginCaptcha').attr("src", data);
        }
    })
}

function sendForgetPasswordEmail(element) {
    let email = $.trim($("#loginEmail").val());
    if (email.match(/.+@.+\..+/)) {
        changeButtonState(element, "sending");
        $("#loginEmail").attr("disabled", true);

        let param = "email=" + email;
        $.post('password/', param, function (data) {
            if (data === "密码重置成功！") {
                changeButtonState(element, "tick");
                $("#loginPassword").val("");
                $("#loginPassword").focus();
            } else {
                changeButtonState(element, "retry");
                $("#loginEmail").attr("disabled", false);
            }
        })
    } else {
        alert("邮箱格式错误！");
        return false;
    }
}

function changeButtonState(element, status) {
    let ticks = 30;
    let tick = function () {
        if (ticks > 0) {
            setTimeout(function () {
                $(element).html("已发送(" + ticks + ")");
                ticks--;
                tick();
            }, 1000);
        } else {
            changeButtonState("retry");
        }
    };
    ticks = 30;
    switch (status) {
        case "sending": {
            $(element).attr("disabled", true);
            $(element).html("发送中");
            break;
        }
        case "tick": {
            $(element).attr("disabled", true);
            tick("Sent");
            break;
        }
        case "retry": {
            $(element).attr("disabled", false);
            $(element).html("重新发送");
            break;
        }
    }
}
(function () {
   
    localStorage.setItem("uid", "");

});

function home() {
    $.mobile.changePage("#home", { role: "page" });
}

function aboutMenu() {
    $.mobile.changePage("#about", { role: "page" });
}


function ContactnMenu() {
    $.mobile.changePage("#contact", { role: "page" });
}

function NoteMenu() {
    $.mobile.changePage("#notepage", { role: "page" });
}

function loginMenu() {
    $.mobile.changePage("#loginpage", { role: "page" });
}
function projectMenu() {
    $.mobile.changePage("#projectpage", { role: "page" });
}

function RegisterMenu() {
    $.mobile.changePage("#registerpage", { role: "page" });
}
//---------------


function send() {
    try {

        var author = document.getElementById("author").value;
        var subject = "";
        var email = document.getElementById("email").value;
        var text = document.getElementById("text").value;


        var expname = /^[a-zA-zأ-ي| ]+$/;
        var expno = /^[0-9|]+$/;
        var expemail = /^[a-zA-z0-9.@|]+$/;
        if (author == "") {
            toast('Please input your name');
            return;
        }
        var arr = author.split(" ");

        var no = 0;
        no = arr.length;
        if (no < 3) {
            toast('please input name at least three part');
            return;

        }
        if (!expname.test(author)) {
            toast("Please input your name in char only");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            toast("please input email in correct format emailaddress@company.com");
            return;
        }
        if (!expemail.test(email)) {
            toast("Please input email in correct format");
            return;
        }



        //        if (subject == "") {
        //            Message("Please input suject");
        //            return;
        //        }
        if (text == "") {
            toast("Please input Message");
            return;
        }

        $.ajax({
            type: "POST",
            url: "code/send.ashx",
            data: { author: author, subject: subject, email: email, text: text },
            success: function (response) {
                document.getElementById("author").value = "";
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("text").value = "";
                var json = JSON.parse(response);
                toast(json.message);

            },
            error: function (response) {
                toast(response.status + "  " + response.statusText);

            }
        });
    } catch (e) { Message(e); }
}
// ----- Login

function login() {
    try {

        var author = document.getElementById("id").value;
        var pass = document.getElementById("pass").value;

        if (author == "") {
            toast('Please input your user id');
            return;
        }



        if (pass == "") {
            toast("Please input user password");
            return;
        }


        $.ajax({
            type: "POST",
            url: "code/login.ashx",
            data: { author: author, pass: pass },
            success: function (response) {
                //alert(response);

                var obj = JSON.parse(response);

                localStorage.setItem("uid", author);
                localStorage.setItem("uname", obj.name);
                localStorage.setItem("pass", pass);

                if (obj.op == 1) {
                    // window.location = "adminhome.html";
                    toast("Welcome " + obj.name);
                }
                else {
                    toast(obj.message);
                }

            },
            error: function (response) {
                toast(response.status + "  " + response.statusText);

            }
        });
    } catch (e) { toast(e); }
}


//=============== Register 
function rgisterCustomer() {
    try {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;

        if (name == "") {
            toast("please input Customer name ");
            return;
        }
        if (email == "") {
            toast("please input Customer email ");
            return;
        }

        if (phone == "") {
            toast("please input Customer phone ");
            return;
        }
        if (pasword == "") {
            toast("please input Customer password ");
            return;
        }

        if (phone.length != 10) {
            toast("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            toast("input phone incorrect format and start with 05");
            return;
        }
        var exp = /^[0-9|]+$/;

        if (!exp.test(phone)) {
            toast("the phone must in number only ");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            toast("input Email incorrect format ");
            return;
        }
        return;
        $.ajax({
            type: "POST",
            url: "http://carspare.somee.com/code/register.ashx",
            data: { name: name, phone: phone, email: email, pass: pasword },
            success: function (text) {
                var json = JSON.parse(text);
                showmessage(json.message);
                if (json.code != "0") {
                    toast('Your  ID is : ' + json.code);
                    document.getElementById("id").value = json.code;
                }
            },
            error: function (data) { showmessage("error " + data); }
        });
    }
    catch (e) { alert(e); }

}



//-------------- toast
var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'  data-theme='a'><h3>" + msg + "</h3></div>")
.css({ display: "block",
    opacity: 0.90,
    position: "fixed",
    padding: "7px",
    color: "#FFFFFF",
    "background-color": "#880000",
    "text-align": "center",
    width: "270px",
    left: ($(window).width() - 284) / 2,
    top: $(window).height() / 2
})
.appendTo($.mobile.pageContainer).delay(1500)
.fadeOut(500, function () {
    $(this).remove();
});
}
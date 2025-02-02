var prevAccounts = 0;
var carbonBudget = 0;
var streak = 0;
var carbonUsed = 0;
var streakExtension = "";
var lifeExpectancies = [83.94, 82.12, 77.77, 82.27, 81.36, 70.82, 84.03, 72.99, 81.45, 79.46];
var averageEmissions = [15.01, 14.99, 8.89, 4.76, 8.01, 1.89, 8.66, 13.11, 5.00, 14.21];
if(localStorage.getItem("accounts") === null) {
    localStorage.setItem("accounts", "0")
}
function signUp(event) {
    event.preventDefault();
    var goodEmail = true;
    var passwordsMatch = true;
    for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
        if(document.getElementById("signUpEmail").value === localStorage.getItem("email"+i.toString())) {
            alert("This email is already taken.");
            goodEmail = false;
            break;
        }
    }
    if(document.getElementById("signUpPassword").value != document.getElementById("confirmPassword").value) {
        alert("Your passwords do not match.");
        passwordsMatch = false;
    }
    if(goodEmail == true && passwordsMatch == true) {
        localStorage.setItem("email"+localStorage.getItem("accounts"), document.getElementById("signUpEmail").value);
        localStorage.setItem("fName"+localStorage.getItem("accounts"), document.getElementById("signUpFName").value);
        localStorage.setItem("lName"+localStorage.getItem("accounts"), document.getElementById("signUpLName").value);
        localStorage.setItem("password"+localStorage.getItem("accounts"), document.getElementById("signUpPassword").value);
        var countryCheck = document.getElementById("country");
        localStorage.setItem("country"+localStorage.getItem("accounts"), countryCheck.value);
        localStorage.setItem("streak"+localStorage.getItem("accounts"), "0");
        localStorage.setItem("carbonUsedDay"+localStorage.getItem("accounts"), "0");
        localStorage.setItem("loggedDay"+localStorage.getItem("accounts"), "false")
        prevAccounts = parseInt(localStorage.getItem("accounts"));
        localStorage.setItem("accounts", (prevAccounts+1).toString());
        window.location.replace("login.html");
    }
};
function login(event) {
    event.preventDefault();
    var goodFName = false;
    var goodLName = false;
    var goodPassword = false;
    var emailPosition = -1
    var alreadyProblem = false;
    for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
        if(document.getElementById("logEmail").value === localStorage.getItem("email"+i.toString())) {
            emailPosition = i;
            break;
        }
    }
    if(emailPosition === -1) {
        alert("This email is not signed up yet. Please sign up with thisemail to continue.");
        alreadyProblem = true;
    }
    else {
        if(document.getElementById("logFName").value === localStorage.getItem("fName"+emailPosition.toString())) {
            goodFName = true;
        }
        if(document.getElementById("logLName").value === localStorage.getItem("lName"+emailPosition.toString())) {
            goodLName = true;
        }
        if(document.getElementById("logPassword").value === localStorage.getItem("password"+emailPosition.toString())) {
            goodPassword = true;
        }
    }
    if(goodFName === true && goodLName === true && goodPassword === true) {
        localStorage.setItem("loggedInUser", localStorage.getItem("fName" + emailPosition.toString()));
        window.location.replace("mainApp.html");
    }
    else {
        if(alreadyProblem === false) {
            alert("Incorrect login credentials. Please try again.");
        }
    }
};
function level() {
    var theLevelSelect = document.getElementsByName("emLevel");
    for(var i = 0; i < theLevelSelect.length; i++) {
        if(theLevelSelect[i].checked === true) {
            for(var x = 0; x < parseInt(localStorage.getItem("accounts")); x++) {
                if(localStorage.getItem("fName"+x.toString()) === localStorage.getItem("loggedInUser")) {
                    localStorage.setItem("level"+x.toString(), theLevelSelect[i].value);
                    if(theLevelSelect[i].value === "zero") {
                        localStorage.setItem("multiplier"+x.toString(), "4");
                    }
                    if(theLevelSelect[i].value === "one") {
                        localStorage.setItem("multiplier"+x.toString(), "3");
                    }
                    if(theLevelSelect[i].value === "two") {
                        localStorage.setItem("multiplier"+x.toString(), "2");
                    }
                    if(theLevelSelect[i].value === "three") {
                        localStorage.setItem("multiplier"+x.toString(), "1.5");
                    }
                    if(theLevelSelect[i].value === "four") {
                        localStorage.setItem("multiplier"+x.toString(), "1");
                    }
                }
            }
        }
    }
};
function travel() {
    var pastUse = 0;
    if(document.getElementById("carTravel").value !== null) {
        for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
            if(localStorage.getItem("fName"+i.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+i.toString()));
                localStorage.setItem("loggedDay"+i.toString(), "true");
                localStorage.setItem("carbonUsedDay"+i.toString(), (pastUse+parseInt(document.getElementById("carTravel").value)*0.15).toString());
            }
        }
    }
    if(document.getElementById("planeTravel").value !== null) {
        for(var x = 0; x < parseInt(localStorage.getItem("accounts")); x++) {
            if(localStorage.getItem("fName"+x.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+x.toString()));
                localStorage.setItem("loggedDay"+x.toString(), "true");
                localStorage.setItem("carbonUsedDay"+x.toString(), (pastUse+parseInt(document.getElementById("planeTravel").value)*0.25).toString());
            }
        }
    }
};
function energyConsumption() {
    var pastUse = 0;
    if(document.getElementById("electricityUsage").value !== null) {
        for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
            if(localStorage.getItem("fName"+i.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+i.toString()));
                localStorage.setItem("loggedDay"+i.toString(), "true");
                localStorage.setItem("carbonUsedDay"+i.toString(), (pastUse+parseInt(document.getElementById("electricityUsage").value)*0.4/30.5).toString());
            }
        }
    }
    if(document.getElementById("naturalGasUsage").value !== null) {
        for(var x = 0; x < parseInt(localStorage.getItem("accounts")); x++) {
            if(localStorage.getItem("fName"+x.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+x.toString()));
                localStorage.setItem("loggedDay"+x.toString(), "true");
                localStorage.setItem("carbonUsedDay"+x.toString(), (pastUse+parseInt(document.getElementById("naturalGasUsage").value)*1.9/30.5).toString());
            }
        }
    }
};
function shopping() {
    var pastUse = 0;
    if(document.getElementById("clothingItems").value !== null) {
        for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
            if(localStorage.getItem("fName"+i.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+i.toString()));
                localStorage.setItem("loggedDay"+i.toString(), "true");
                localStorage.setItem("carbonUsedDay"+i.toString(), (pastUse+parseInt(document.getElementById("clothingItems").value)*10).toString());
            }
        }
    }
    if(document.getElementById("electronicItems").value !== null) {
        for(var x = 0; x < parseInt(localStorage.getItem("accounts")); x++) {
            if(localStorage.getItem("fName"+x.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+x.toString()));
                localStorage.setItem("loggedDay"+x.toString(), "true");
                localStorage.setItem("carbonUsedDay"+x.toString(), (pastUse+parseInt(document.getElementById("electronicItems").value)*50).toString());
            }
        }
    }
};
function foodConsumption() {
    var pastUse = 0;
    if(document.getElementById("meatConsumption").value !== null) {
        for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
            if(localStorage.getItem("fName"+i.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+i.toString()));
                localStorage.setItem("loggedDay"+i.toString(), "true");
                localStorage.setItem("carbonUsedDay"+i.toString(), (pastUse+parseInt(document.getElementById("meatConsumption").value)*2.5).toString());
            }
        }
    }
    if(document.getElementById("dairyConsumption").value !== null) {
        for(var x = 0; x < parseInt(localStorage.getItem("accounts")); x++) {
            if(localStorage.getItem("fName"+x.toString()) === localStorage.getItem("loggedInUser")) {
                pastUse = parseInt(localStorage.getItem("carbonUsedDay"+x.toString()));
                localStorage.setItem("loggedDay"+x.toString(), "true");
                localStorage.setItem("carbonUsedDay"+x.toString(), (pastUse+parseInt(document.getElementById("dairyConsumption").value)*1.2).toString());
            }
        }
    }
};
setInterval(function() {
    const d = new Date();
    if(d.getHours == 0 && d.getMinutes == 0 && d.getSeconds < 3) {
        for(var i = 0; i < parseInt(localStorage.getItem("accounts")); i++) {
            var countryIndex = parseInt(localStorage.getItem("country" + i.toString()));
            var lifeExpectancy = lifeExpectancies[countryIndex];
            var avgEmissions = averageEmissions[countryIndex];
            if(Math.round((90719 * avgEmissions) / (4.8 * lifeExpectancy * 365)) < parseFloat(localStorage.getItem("carbonUsedDay"+i.toString())) && localStorage.getItem("loggedDay"+i.toString()) == "true") {
                var prevStreak = parseInt(localStorage.getItem("streak"+i.toString));
                localStorage.setItem("streak"+i.toString(), (prevStreak+1).toString())
            }
            else {
                localStorage.setItem("streak"+i.toString(), "0");
            }
        }
    }
}, 1);
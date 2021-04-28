
var collectedErrors = '';                                       //These are the sets of Regex's and global variables for the entire script
var postalcodeRegex =/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
var PhonenumberRegex = /^[(]?\d\d\d[)]?[-]?\d\d\d[-]?\d\d\d\d$/;
var numChecker = /^\d*$/;
var submissionNumber = 0;
var registrantName;
var userEmail;
var userPhone;
var userAddress;
var userCity;
var userPostalcode;
var userProvince;
var GroupSize;
var RegisterDays;

function submitform() { // This is the method that submits the form and puts through validations then sends it back to page as the invoice or gives errors if errors exist

    submissionNumber++;
        var SellerInformation = document.getElementById('SellerInformation');
        SellerInformation.hidden = false;
        SellerInformation.innerHTML = "";
        
        var TotalPrice = 0;
        var DiscountPrice = 0;
        var registeredDaysTxt;

        var errorTxt = document.getElementById("errorsLog");
        errorTxt.innerHTML = "";


        registrantName = document.getElementById('FirstName').value + ' ' + document.getElementById('LastName').value;
        userEmail = document.getElementById('EmailAddress').value;
        userPhone = document.getElementById('PhoneNumber').value;
        userAddress = document.getElementById('Address').value;
        userCity = document.getElementById('City').value;
        userPostalcode = document.getElementById('PostalCode').value;
        userProvince = document.getElementById('Province').value;
        GroupSize = document.getElementById('GroupSize').value;
        RegisterDays = document.getElementById('Days').value;


        collectedErrors = "";

        registrantName = (registrantName + "").trim();
        userEmail = (userEmail + "").trim();
        userPhone = (userPhone + "").trim();
        userAddress = (userAddress + "").trim();
        userCity = (userCity + "").trim();
        userPostalcode = (userPostalcode + "").trim();
        userProvince = (userProvince + "").trim();
        GroupSize = (GroupSize + "").trim();
        RegisterDays = (RegisterDays + "").trim();

        if (userEmail == "") {
            collectedErrors += "Error, Seller's Email Address is required to be inputed \n";
            if (collectedErrors == "") {
                document.getElementById('email').focus();
            }
        }
        if (userPhone == "") {
            collectedErrors += "Error, Phone Number is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('PhoneNumber').focus();
            }
        }
        if (registrantName == "") {
            collectedErrors += "Error, The Sellers Name is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('SellerName').focus();
            }
        }
        if (userAddress == "") {
            collectedErrors += "Error, Your Address is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('Address').focus();
            }
        }
        if (userCity == "") {
            collectedErrors += "Error, Your City is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('').focus();
            }
        }
        if (userPostalcode == "") {
            collectedErrors += "Error, Your Postal Code is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('PostalCode').focus();
            }
        }
        if (userProvince == "") {
            collectedErrors += "Error, Province is required to be inputed \n <br>";
            if (collectedErrors == "") {
                document.getElementById('Province').focus();
            }
        }
        if (RegisterDays == "0"){
            collectedErrors += "Error, Number of Days being Registered For needs to be selected \n <br>";
            if (collectedErrors == "") {
                document.getElementById('Days').focus();
            }
        }
    if (GroupSize == "") {
        collectedErrors += "Group Size needs to be inputed \n <br>";
        if (collectedErrors == "") {
            document.getElementById('VehicleModel').focus();
        }
    }
    if (collectedErrors == ""){
    regexChecker(postalcodeRegex, userPostalcode, 'The Inputed Postal Codes format is invalid, please reinput');
    regexChecker(PhonenumberRegex, userPhone, 'The Inputed Phone Numbers format is invalid, please reinput');
    regexChecker(numChecker, GroupSize, 'The Inputed GroupSize is not numaric');
    if (GroupSize <= 0){
        collectedErrors += "Error, Group Size is required to be inputed \n <br>";
    }
    }
if (collectedErrors != "") {
document.getElementById('errorsLog').innerHTML = collectedErrors;
return false;
}
else {
    if (RegisterDays == 1){

        registeredDaysTxt = "Day 1"
        if(GroupSize >= 5){
            DiscountPrice = 350*0.10;
            TotalPrice = 350 - DiscountPrice;

        }
        else {
            TotalPrice = 350;
        }
    }
    else if (RegisterDays == 2){

        registeredDaysTxt = "Day 2"
        if(GroupSize >= 5){
            DiscountPrice = 450*0.10;
            TotalPrice = 450 - DiscountPrice;

        }
        else {
            TotalPrice = 450;
        }
    }
    if (RegisterDays == 3){

        registeredDaysTxt = "Both Days"
        if(GroupSize >= 5){
            DiscountPrice = 750*0.10;
            TotalPrice = 750 - DiscountPrice;

        }
        else {
            TotalPrice = 750;
        }
    }

    var RegistrantResult = `
<b> Registrant Name: </b> ${registrantName} <br><br>
<b> Email Address: </b> ${userEmail} <br><br>
<b> Phone Number: </b> ${userPhone} <br><br>
<b> Customer Address: </b> ${userAddress} <br><br>
<b> City: </b> ${userCity} <br><br>
<b> Province: </b> ${userProvince} <br><br>
<b> Postal Code: </b> ${userPostalcode} <br><br>
<b> Group Size:</b> ${GroupSize}<br><br>
<b> Registered: </b> ${registeredDaysTxt}<br><br>
<b> Price: </b> $ ${TotalPrice}<br><br>

`;
    submissionNumber++;
    localStorage.setItem(`${registrantName}${submissionNumber}`, `${RegistrantResult}`);
    location.href = "ConfirmationPage.html";
    
}
return false;
}
function regexChecker (Regex, Input, causedError){ //This method checks the regex of the Inputs that require it and return the errors
if (Regex.test(Input) == false){
 collectedErrors += `${causedError} <br>`;
}
}
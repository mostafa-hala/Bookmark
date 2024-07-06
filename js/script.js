var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var websitesBody = document.getElementById("websitesBody");
var addbtn = document.getElementById("addbtn");

var websitesList;
if (localStorage.getItem('websites') !== null) {
    websitesList = JSON.parse(localStorage.getItem('websites'));
    displayWebsites();
} else {
    websitesList = [];
}

addbtn.addEventListener('click', function() {
    if (siteName.value === "" || siteUrl.value === "") return;
    if (!validateUrl(siteUrl.value)) {
        alert('Please enter a valid URL that starts with "https://" and does not end with "/".');
        return;
    }
    addWebsite();
});

function validateUrl(url) {
    var pattern = /^https:\/\/(?!.*\/$).*/;
    return pattern.test(url);
}

function addWebsite() {
    var website = {
        name: siteName.value,
        url: siteUrl.value
    };

    websitesList.push(website);
    localStorage.setItem('websites', JSON.stringify(websitesList));
    displayWebsites();
    clearInput();
    console.log(websitesList);
}

function clearInput() {
    siteName.value = "";
    siteUrl.value = "";
}

function displayWebsites() {
    var content = "";
    for (var i = 0; i < websitesList.length; i++) {
        content += `<tr>
                        <td>${i + 1}</td>
                        <td>${websitesList[i].name}</td>
                        <td><button onclick="visitWebsite('${websitesList[i].url}')">Visit</button></td>
                        <td><button onclick="deleteWebsite(${i})" class="delete-btn">Delete</button></td>
                    </tr>`;
    }
    websitesBody.innerHTML = content;
}

function visitWebsite(url) {
    window.open(url, '_blank');
}

function deleteWebsite(index) {
    websitesList.splice(index, 1);
    localStorage.setItem('websites', JSON.stringify(websitesList));
    displayWebsites();
}

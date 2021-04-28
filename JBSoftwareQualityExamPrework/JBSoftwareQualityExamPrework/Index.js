function loadPage(href)
{
    var loadingPage = new XMLHttpRequest();
    loadingPage.open("GET", href, false);
    loadingPage.send();
    return loadingPage.responseText;
}

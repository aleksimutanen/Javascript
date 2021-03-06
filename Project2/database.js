
var tagPage = document.getElementById("tagInfo");
var artistPage = document.getElementById("artistInfo");
var albumPage = document.getElementById("albumInfo");
var trackPage = document.getElementById("trackInfo");
var searchPage = document.getElementById("search");

var pages = new Array(tagPage, artistPage, albumPage, trackPage, searchPage);

var pageHistory = [];
var pageIndex = -1;



function backward() {
    if (pageIndex <= 0) return;
    pageIndex -= 2;
    window[pageHistory[pageIndex + 1].name](pageHistory[pageIndex + 1].parameter);
}

function forward() {
    if (pageIndex + 1 == pageHistory.length) return;
    window[pageHistory[pageIndex + 1].name](pageHistory[pageIndex + 1].parameter);
}



function hideAllPages() {
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
}



function gettrackPage(track) {
    pageIndex++;
    pageHistory[pageIndex] = { name: "gettrackPage", parameter: track };


    var trackName = track.innerHTML;
    var artistName = track.name;

    hideAllPages();
    document.getElementById("trackInfo").style.display = "block";

    console.log(artistName + ", " + trackName);

    trackGetInfo(trackName, artistName);
}

function trackGetInfo(name, artist) {
    console.log("start track getinfo on: " + artist + ", " + name);

    http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=4caf6b0a2f5bdf928767aa1fcce128be&artist=Pink+Floyd&track=comfortably+numb&format=json

    var method = "track.getinfo";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&api_key=" + apiKey + "&artist=" + artist + "&track=" + search + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var areaBio = document.getElementById("trackBio");
            var areaHeadline = document.getElementById("trackHeadline");

            if (data.track.wiki == null) {
                areaBio.innerHTML = "<p>" + "track data not available..." + "</p>";
            } else {
                areaBio.innerHTML = "<p>" + data.track.wiki.content + "</p>";
            }

            areaHeadline.innerHTML = "About " + data.track.name + ":";

        }
    }
}



function getartistPage(artist) {
    pageIndex++;
    pageHistory[pageIndex] = { name: "getartistPage", parameter: artist };


    console.log("START ARTIST PAGE");

    hideAllPages();
    document.getElementById("artistInfo").style.display = "block";

    var artistName = artist.innerHTML;

    artistGetInfo(artistName, "artist");
    artistGetTopAlbums(artistName, "album");
    artistGetTopTracks(artistName, "track");
}

function artistGetInfo(name, area) {
    console.log("start " + area + " getinfo on: " + name);

    var method = area + ".getinfo";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&" + area + "=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var areaBio = document.getElementById("artistBio");
            var areaHeadline = document.getElementById("artistHeadline");
            var similarHeadline = document.getElementById("similarArtistsHeadline");
            var tagsHeadline = document.getElementById("artistTagsHeadline");
            var similarArea = document.getElementById("similarArtists");
            var areaTags = document.getElementById("artistTags");

            if (data.artist.bio == null) {
                areaBio.innerHTML = "<p>" + "artist data not available..." + "</p>";
            } else {
                areaBio.innerHTML = "<p>" + data.artist.bio.content + "</p>";
            }

            areaBio.innerHTML = "<p>" + data.artist.bio.content + "</p>";
            areaHeadline.innerHTML = "About " + data.artist.name + ":";
            similarHeadline.innerHTML = "Similar artists: ";
            tagsHeadline.innerHTML = "Tags: ";


            var similarAreaOutput = "";
            similarAreaOutput += "<ul class='nav nav-pills flex-column'>";

            for (var i = 0; i < data.artist.similar.artist.length; i++) {

                similarAreaOutput += "<li class='nav-item'>";
                similarAreaOutput += "<a class='nav-link' href='#' onclick='getartistPage(this)'>" + data.artist.similar.artist[i].name + "</a>";
                similarAreaOutput += "</li>";
            }

            similarAreaOutput += "</ul>";
            similarArea.innerHTML = similarAreaOutput;


            var areaTagsOutput = "";
            areaTagsOutput += "<ul class='nav nav-pills flex-column'>";

            for (var i = 0; i < data.artist.tags.tag.length; i++) {

                areaTagsOutput += "<li class='nav-item'>";
                areaTagsOutput += "<a class='nav-link' href='#' onclick='gettagPage(this)'>" + data.artist.tags.tag[i].name + "</a>";
                areaTagsOutput += "</li>";
            }

            areaTagsOutput += "</ul>";
            areaTags.innerHTML = areaTagsOutput;

        }
    }
}

function artistGetTopAlbums(name, area) {
    console.log("start " + area + " getinfo on: " + name);

    var method = "artist.gettopalbums";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&artist=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var topArea = document.getElementById("topAlbums");
            var areaHeadline = document.getElementById("topAlbumsHeadline");
            areaHeadline.innerHTML = "Top albums: ";

            var topAreaOutput = "";
            topAreaOutput += "<ul class='nav nav-pills'>";

            for (var i = 0; i < /*data.topalbums.album.length*/5; i++) {

                topAreaOutput += "<li class='nav-item'>";
                topAreaOutput += "<img src='" + data.topalbums.album[i].image[3]["#text"] + "' alt='failed to load'><br>";
                topAreaOutput += "<a class='nav-link albumName' href='#' onclick='getalbumPage(this)' name='" + data.topalbums.album[i].artist.name + "'>" + data.topalbums.album[i].name + "</a>";
                topAreaOutput += "</li>";
            }

            topAreaOutput += "</ul>";
            topArea.innerHTML = topAreaOutput;

        }
    }
}

function artistGetTopTracks(name, area) {
    console.log("start " + area + " getinfo on: " + name);

    var method = "artist.gettoptracks";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&artist=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var topArea = document.getElementById("topTracks");
            var areaHeadline = document.getElementById("topTracksHeadline");
            areaHeadline.innerHTML = "Top tracks: ";

            var topAreaOutput = "";
            topAreaOutput += "<ul class='nav nav-pills'>";

            for (var i = 0; i < /*data.topalbums.album.length*/5; i++) {

                topAreaOutput += "<li class='nav-item'>";
                topAreaOutput += "<img src='" + data.toptracks.track[i].image[2]["#text"] + "' alt='failed to load'><br>";
                topAreaOutput += "<a class='nav-link albumName' onclick='gettrackPage(this)' href='#' name='" + data.toptracks.track[i].artist.name + "'>" + data.toptracks.track[i].name + "</a>";
                topAreaOutput += "</li>";
            }

            topAreaOutput += "</ul>";
            topArea.innerHTML = topAreaOutput;

        }
    }
}



function getalbumPage(album) {
    pageIndex++;
    pageHistory[pageIndex] = { name: "getalbumPage", parameter: album };

    var albumName = album.innerHTML;
    var artistName = album.name;

    hideAllPages();
    document.getElementById("albumInfo").style.display = "block";

    console.log(artistName);

    albumGetInfo(artistName, albumName);
}

function albumGetInfo(artist, name) {
    console.log("start album getinfo on: " + artist + ", " + name);

    var method = "album.getinfo";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&api_key=" + apiKey + "&artist=" + artist + "&album=" + search + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var areaBio = document.getElementById("albumBio");
            var areaHeadline = document.getElementById("albumHeadline");
            var tagsHeadline = document.getElementById("albumTagsHeadline");
            var areaTags = document.getElementById("albumTags");
            var areaImage = document.getElementById("albumImage");
            var trackListHeadline = document.getElementById("trackListingHeadline");
            var trackList = document.getElementById("trackListing");

            if (data.album.wiki == null) {
                areaBio.innerHTML = "<p>" + "album data not available..." + "</p>";
            } else {
                areaBio.innerHTML = "<p>" + data.album.wiki.content + "</p>";
            }

            areaHeadline.innerHTML = "About " + data.album.name + ":";
            tagsHeadline.innerHTML = "Tags: ";
            areaImage.innerHTML = "<img src='" + data.album.image[4]["#text"] + "' alt='xd'>"
            trackListHeadline.innerHTML = "Track listing:";


            var areaTagsOutput = "";
            areaTagsOutput += "<ul class='nav nav-pills flex-column'>";

            for (var i = 0; i < data.album.tags.tag.length; i++) {

                areaTagsOutput += "<li class='nav-item'>";
                areaTagsOutput += "<a class='nav-link' href='#' onclick='gettagPage(this)'>" + data.album.tags.tag[i].name + "</a>";
                areaTagsOutput += "</li>";
            }

            areaTagsOutput += "</ul>";
            areaTags.innerHTML = areaTagsOutput;


            var trackListingOutput = "";
            trackListingOutput += "<ul class='nav nav-pills flex-column'>";

            for (var i = 0; i < data.album.tracks.track.length; i++) {

                trackListingOutput += "<li class='nav-item'>";
                trackListingOutput += "<a class='nav-link' onclick='gettrackPage(this)' href='#' name='" + data.album.artist + "'>" + data.album.tracks.track[i].name + "</a>";
                trackListingOutput += "</li>";
            }

            trackListingOutput += "</ul>";
            trackList.innerHTML = trackListingOutput;

        }
    }
}



function gettagPage(tag) {
    pageIndex++;
    pageHistory.push({ name: "gettagPage", parameter: tag });

    var tagName = tag.innerHTML;

    hideAllPages();
    document.getElementById("tagInfo").style.display = "block";

    tagGetInfo(tagName, "tag");
    tagGetArtists(tagName, "tag");
}

function tagGetInfo(name, area) {
    console.log("start tag getinfo on: " + name);


    var method = "tag.getinfo";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&" + area + "=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);


            var areaBio = document.getElementById("tagBio");
            var areaHeadline = document.getElementById("tagHeadline");

            if (data.tag.wiki == null) {
                areaBio.innerHTML = "<p>" + "tag data not available..." + "</p>";
            } else {
                areaBio.innerHTML = "<p>" + data.tag.wiki.content + "</p>";
            }

            areaHeadline.innerHTML = "About " + data.tag.name + ":";

        }
    }
}

function tagGetArtists(name, area) {
    console.log("start getartists on: " + name);


    var method = "tag.gettopartists";
    var search = name;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&" + area + "=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var similarHeadline = document.getElementById("tagArtistsHeadline");
            var tagArtists = document.getElementById("tagArtists");

            similarHeadline.innerHTML = "Artists: ";


            var tagArtistOutput = "";
            tagArtistOutput += "<ul class='nav nav-pills flex-column'>";

            for (var i = 0; i < 6; i++) {

                tagArtistOutput += "<li class='nav-item'>";
                tagArtistOutput += "<a class='nav-link' href='#' onclick='getartistPage(this)'>" + data.topartists.artist[i].name + "</a>";
                tagArtistOutput += "</li>";
            }

            tagArtistOutput += "</ul>";
            tagArtists.innerHTML = tagArtistOutput;
        }
    }
}



function search() {
    pageIndex++;
    pageHistory[pageIndex] = { name: "search", parameter: "" };

    console.log("START SEARCH");

    hideAllPages();
    document.getElementById("search").style.display = "block";

    var searchword = document.getElementById("searchbar").value;

    if (searchword == "") {
        console.log("searchbar is empty");
        return false;
    }

    //artistSearch(searchword, "artist");
    //albumSearch(searchword, "album");
    //trackSearch(searchword, "track");
    areaSearch(searchword, "artist");
    areaSearch(searchword, "album");
    areaSearch(searchword, "track");

}

function areaSearch(word, area) {
    console.log("start " + area + " search on: " + word);

    var method = area + ".search";
    var search = word;
    var format = "json";
    var apiKey = "4caf6b0a2f5bdf928767aa1fcce128be";

    var url = "http://ws.audioscrobbler.com/2.0/" + "?method=" + method + "&" + area + "=" + search + "&api_key=" + apiKey + "&format=" + format;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.send();

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            var obj = JSON.parse(xmlHTTP.responseText);

            var data = obj;

            console.log(data);

            var areaSearch = document.getElementById(area + "SearchResults");
            var areaSearch2 = document.getElementById(area + "SearchResults2");
            var areaHeadline = document.getElementById(area + "SearchHeadline");

            areaHeadline.innerHTML = area + "s: ";

            var areaSearchOutput = "";
            areaSearchOutput += "<ul class='nav nav-pills'>";

            var areaSearchOutput2 = "";
            areaSearchOutput2 += "<ul class='nav nav-pills'>";

            if (data.results[area + "matches"][area].length >= 6) {


                for (var i = 0; i < 6; i++) {

                    areaSearchOutput += "<li class='nav-item'>";
                    areaSearchOutput += "<img class='resultImage' src='" + data.results[area + "matches"][area][i].image[2]["#text"] + "' alt='no picture available :('><br>";
                    areaSearchOutput += "<a class='nav-link resultItemName' onclick='get" + area + "Page(this)' href='#' name='" + data.results[area + "matches"][area][i].artist + "'>" + data.results[area + "matches"][area][i].name + "</a>";

                    i++;

                    areaSearchOutput2 += "<li class='nav-item'>";
                    areaSearchOutput2 += "<img class='resultImage' src='" + data.results[area + "matches"][area][i].image[2]["#text"] + "' alt='no picture available :('><br>";
                    areaSearchOutput2 += "<a class='nav-link resultItemName' onclick='get" + area + "Page(this)' href='#' name='" + data.results[area + "matches"][area][i].artist + "'>" + data.results[area + "matches"][area][i].name + "</a>";

                    areaSearchOutput += "</li>";
                    areaSearchOutput2 += "</li>";

                }

            } else {

                for (var i = 0; i < data.results[area + "matches"][area].length; i++) {

                    areaSearchOutput += "<li class='nav-item'>";
                    areaSearchOutput += "<img class='resultImage' src='" + data.results[area + "matches"][area][i].image[2]["#text"] + "' alt='no picture available :('><br>";
                    areaSearchOutput += "<a class='nav-link resultItemName' onclick='get" + area + "Page(this)' href='#' name='" + data.results[area + "matches"][area][i].artist + "'>" + data.results[area + "matches"][area][i].name + "</a>";

                    if ((i + 1) == data.results[area + "matches"][area].length) break;

                    i++;

                    areaSearchOutput2 += "<li class='nav-item'>";
                    areaSearchOutput2 += "<img class='resultImage' src='" + data.results[area + "matches"][area][i].image[2]["#text"] + "' alt='no picture available :('><br>";
                    areaSearchOutput2 += "<a class='nav-link resultItemName' onclick='get" + area + "Page(this)' href='#' name='" + data.results[area + "matches"][area][i].artist + "'>" + data.results[area + "matches"][area][i].name + "</a>";

                    areaSearchOutput += "</li>";
                    areaSearchOutput2 += "</li>";
                }

            }

            areaSearchOutput += "</ul>";
            areaSearch.innerHTML = areaSearchOutput;

            areaSearchOutput2 += "</ul>";
            areaSearch2.innerHTML = areaSearchOutput2;
        }
    }
}

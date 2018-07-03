'use strict';

/**
 * Rick and Morty Api class.
 *
 * @constructor
 */

function Api() {
    CACHE.locations = new Array();
    CACHE.characters = new Array();
}
/**
 * Load all locations and save to CACHE
 */
Api.prototype.loadLocatiions = function () {
    $.ajaxSetup({
        async: false
    });
    document.querySelector("#js-loader").style.visibility = "visible";
    var location_path = "location/";
    var req_url = api_path + location_path;
    while (req_url.length > 0) {
        $.getJSON(req_url, function (result) {
            for (var loc in result["results"]) {
                CACHE.locations[api_path + location_path + result["results"][loc]["id"]] = result["results"][loc];
            }
            req_url = result["info"]["next"];
        });
    }
    document.querySelector("#js-loader").style.visibility = "hidden";
    $.ajaxSetup({
        async: true
    });
};

/**
 * Load characters by urls array
 * @param {string[]} characters_array
 */
Api.prototype.loadCharacters = function (characters_array) {
    $.ajaxSetup({
        async: false
    });
    document.querySelector("#js-loader").style.visibility = "visible";
    var char_path = "character/";
    var param = "", tt;
    for (var ch in characters_array) {
        tt = characters_array[ch].slice(characters_array[ch].lastIndexOf('/') + 1);
        param += tt + ',';
    }
    param = param.slice(0, param.length - 1);
    var req_url = api_path + char_path + param;

    $.getJSON(req_url, function (result) {
        if(characters_array.length > 1){
            for (var char in result) {
                CACHE.characters[api_path + char_path + result[char]["id"]] = result[char];
            }
        }
        else {
            CACHE.characters[api_path + char_path + result["id"]] = result;
        }

    });
    document.querySelector("#js-loader").style.visibility = "hidden";
    $.ajaxSetup({
        async: true
    });
};

/**
 * Load one character by url
 * @param {string} characters_url
 */
Api.prototype.loadCharacter = function (characters_url) {
    $.ajaxSetup({
        async: false
    });
    document.querySelector("#js-loader").style.visibility = "visible";
    $.getJSON(characters_url, function (result) {
        CACHE.characters[characters_url] = result;
    });
    document.querySelector("#js-loader").style.visibility = "hidden";
    $.ajaxSetup({
        async: true
    });
};


var rmApi = new Api();

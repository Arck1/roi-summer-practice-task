/**
 * Graphics class.
 *
 * @constructor
 * @param {String} color
 */
function Graphics(color) {
    this.color = color;
}

/**
 * Construct rectangle with number
 * @param {int} x
 * @param {int} y
 * @param {int} w
 * @param {int} h
 * @param {int} id
 * @param {string} name
 * @param {int} count
 * @returns {string} - html code
 */

Graphics.prototype.getRectBody = function (x, y, w, h, id, name, count) {
    return "<g id=rct" + id + " class=\"\" onmouseover=\"mover(" + id + ")\" onmouseout=\"mout(" + id + ")\" onclick=\"selectLocation("+id+")\" >\n" +
        "<rect class=\"rect\" x=\"" + x + "\" y=\"" + y + "\" height=\"" + h + "\" width=\"" + w + "\"/>\n" +
        "<text class=\"svg-text-white\" x=\"" + (x + 5) + "\" y=\"" + (y + 20) + "\" font-family=\"Verdana\" font-size=\"20\">" + count + "</text>" +
        "</g>";
};

/**
 * Construct background rectangle with text informations
 * @param {int} x
 * @param {int} y
 * @param {int} w
 * @param {int} h
 * @param {int} id
 * @param {string} name
 * @param {int} count
 * @returns {string}
 */
Graphics.prototype.getRectInfo = function (x, y, w, h, id, name, count, scale) {
    var infoH = 50, infoW, infoX, infoY;
    infoW = Math.max((name.length) * 9, (14 + count.toString().length) * 9);
    infoX = x + w;
    infoY = y + h / 4;

    if (infoX + infoW > window.innerWidth) {
        infoX = window.innerWidth - infoW;
    }
    if(infoY + infoH > window.innerHeight){
        infoY = window.innerHeight - infoH;
    }
    return "<g id=info" + id + " class=\"slow-transform\" visibility=\"hidden\" opacity=\"0\">\n" +
        "<rect class=\"svg-info\" x=\"" + infoX + "\" y=\"" + infoY + "\" height=\"50\" width=\"" + infoW + "\" />\n" +
        "<text class=\"svg-text js-text-top\" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 20) + "\" font-family = \"Verdana\" font-size = \"16\">" + name + "</text>\n" +
        "<text class=\"svg-text js-text-bottom\" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 40) + "\" font-family = \"Verdana\" font-size = \"16\" >Has " + count + " residents</text>\n" +
        "</g>"
};
/**
 * Render locations page
 * @param mArr - array of locations
 * @param w - array with param to render
 * @param sumW - param to render (sumW = sum(w[i]))
 */
Graphics.prototype.renderLocations = function (mArr, w, sumW) {
    document.querySelector("#locations-wrap").innerHTML = "";

    var hm, dx = 0, lineCounter = 0, dw;
    for (var i in mArr) {
        hm = Math.max(30, window.innerHeight / mArr[i].length);
        dy = 0;
        dw = (mgc.getW(w[i]) / sumW) * window.innerWidth;
        for (var j in mArr[i]) {
            document.querySelector("#locations-wrap").innerHTML += rmg.getRectBody(dx, dy * hm, dw, hm, mArr[i][j]["id"], mArr[i][j]["name"], mArr[i][j]["residents"].length, 1);
            dy++;
        }
        lineCounter++;
        dx += dw;
        dy += 10;
    }
    dx = 0;
    lineCounter = 0;
    for (i in mArr) {
        hm = Math.max(30, window.innerHeight / mArr[i].length);
        dw = (mgc.getW(w[i]) / sumW) * window.innerWidth;
        dy = 0;
        for (j in mArr[i]) {
            document.querySelector("#locations-wrap").innerHTML += rmg.getRectInfo(dx, dy * hm, dw, hm, mArr[i][j]["id"], mArr[i][j]["name"], mArr[i][j]["residents"].length, 1);
            dy++;
        }
        lineCounter++;
        dx += dw;
    }
};
/**
 * Construct rectangle to return
 * @param {int} x
 * @param {int} y
 * @param {int} w
 * @param {int} h
 * @returns {string} - html code
 */
Graphics.prototype.getRectBodyBack = function (x, y, w, h) {
    return "<g id=\"js-back\" class=\"\" onclick=\"selectLocation(0)\" >\n" +
        "<rect class=\"body-back\" x=\"" + x + "\" y=\"" + y + "\" height=\"" + h + "\" width=\"" + w + "\"/>\n" +
        "<text class=\"svg-text-white\" x=\"" + (x + 5) + "\" y=\"" + (y + 20) + "\" font-family=\"Verdana\" font-size=\"20\">Back</text>" +
        "</g>";
};

/**
 * Construct svg img
 * @param {int} x
 * @param {int} y
 * @param {int} w
 * @param {int} h
 * @param {string} link
 * @param {int} id
 * @returns {string} - html code
 */
Graphics.prototype.getImg = function (x, y, w, h, link, id) {
    return "<image id=\"char"+id+"\" xlink:href=\"" + link + "\" x=\"" + x + "\" y=\"" + y + "\" height=\"" + h + "\" width=\"" + w + "\" onmouseover=\"charover("+id+")\" onmouseout=\"charout("+id+")\" />";
};

/**
 * Construct character information block
 * @param {int} x
 * @param {int} y
 * @param {int} w
 * @param {int} h
 * @param char - character object
 * @returns {string} - html code
 */
Graphics.prototype.getCharInfo = function (x, y, w, h, char) {
    var infoH = 180, infoW, infoX, infoY;
    infoW = Math.max(6 + char["name"].length, 10 + char["location"]["name"].length, 8 + char["origin"]["name"].length, 6+char["type"].length) * 9 + 10;
    infoX = x + w;
    infoY = y;

    if (infoX + infoW > window.innerWidth) {
        infoX = x - infoW;
    }
    if(infoY + infoH > window.innerHeight){
        infoY = window.innerHeight - infoH;
    }
    return "<g id=\"chinfo" + char["id"] + "\" class=\"slow-transform\" visibility=\"hidden\" opacity=\"0\">\n" +
        "<rect class=\"svg-info\" x=\"" + infoX + "\" y=\"" + infoY + "\" height=\""+infoH+"\" width=\"" + infoW + "\" />\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 20) + "\" font-family = \"Verdana\" font-size = \"16\" >Id: " + char["id"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 40) + "\" font-family = \"Verdana\" font-size = \"16\">Name: " + char["name"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 60) + "\" font-family = \"Verdana\" font-size = \"16\" >Status: " + char["status"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 80) + "\" font-family = \"Verdana\" font-size = \"16\" >Species: " + char["species"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 100) + "\" font-family = \"Verdana\" font-size = \"16\" >Type: " + char["type"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 120) + "\" font-family = \"Verdana\" font-size = \"16\" >Gender: " + char["gender"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 140) + "\" font-family = \"Verdana\" font-size = \"16\" >Origin: " + char["origin"]["name"] + "</text>\n" +
        "<text class=\"svg-text \" x=\"" + (infoX + 5) + "\" y=\"" + (infoY + 160) + "\" font-family = \"Verdana\" font-size = \"16\" >Location: " + char["location"]["name"] + "</text>\n" +
        "</g>"
};
/**
 * Render characters from location with id
 * @param id - location id
 */
Graphics.prototype.renderCharacters = function (id) {
    document.querySelector("#locations-wrap").innerHTML = "";
    var loclink = "https://rickandmortyapi.com/api/location/" + id;
    var place = CACHE.locations[loclink];
    var p = CACHE.characters[place["residents"][0]];
    if (!p) {
        rmApi.loadCharacters(place["residents"]);
    }
    //var size = Math.min(500, mgc.findOptimalSize(window.innerWidth, window.innerHeight, place["residents"].length + 1)); set size limit 500
    var size = Math.min(500, mgc.findOptimalSize(window.innerWidth, window.innerHeight, place["residents"].length + 1)); //without limit, fill all svg
    var xp = size, yp = 0,  residens = place["residents"];
    document.querySelector("#locations-wrap").innerHTML += rmg.getRectBodyBack(0, 0, size, size);
    for(var charLink in residens){
        if(xp + size > window.innerWidth){
            yp += size;
            xp = 0;
        }
        if(!CACHE.characters[residens[charLink]]){ //if char not downloaded before
            rmApi.loadCharacter(residens[charLink]);
        }
        document.querySelector("#locations-wrap").innerHTML += rmg.getImg(xp, yp, size, size, CACHE.characters[residens[charLink]]["image"], CACHE.characters[residens[charLink]]["id"]);
        xp += size;
    }
    xp = size;
    yp = 0;
    for(charLink in residens){
        if(xp + size > window.innerWidth){
            yp += size;
            xp = 0;
        }
        document.querySelector("#locations-wrap").innerHTML += rmg.getCharInfo(xp, yp, size, size, CACHE.characters[residens[charLink]]);
        xp += size;
    }
};

function mover(id) {
    var elem = document.querySelector("#info" + id);
    if (window.event) {
        var iy = event.clientY;
        if(iy + 50 > window.innerHeight){
            iy = window.innerHeight - 50;
        }
        elem.querySelector(".svg-info").setAttribute("y", iy);
        elem.querySelector(".js-text-bottom").setAttribute("y", iy + 40);
        elem.querySelector(".js-text-top").setAttribute("y", iy + 20);
    }
    document.querySelector("#info" + id).style.visibility = 'visible';
    document.querySelector("#info" + id).setAttribute("opacity", 1);
}

function mout(id) {
    var elem = document.querySelector("#info" + id);
    document.querySelector("#info" + id).setAttribute("opacity", 0);
    document.querySelector("#info" + id).style.visibility = 'hidden';
}

function charover(id) {
    var elem = document.querySelector("#chinfo" + id);
    document.querySelector("#chinfo" + id).style.visibility = 'visible';
    document.querySelector("#chinfo" + id).setAttribute("opacity", 1);
}

function charout(id) {
    var elem = document.querySelector("#chinfo" + id);
    document.querySelector("#chinfo" + id).setAttribute("opacity", 0);
    document.querySelector("#chinfo" + id).style.visibility = 'hidden';
}

function selectLocation(id) {

    document.querySelector("#js-loader").style.visibility = "visible";
    CURRENTPAGE = id;
    if(CURRENTPAGE <= 0){
        rmg.renderLocations(mgc.mArrt, mgc.wt, mgc.sumW);
    }
    else{
        rmg.renderCharacters(CURRENTPAGE);
    }
    document.querySelector("#js-loader").style.visibility = "hidden";
}
var rmg = new Graphics("white");
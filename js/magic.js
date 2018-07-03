/*
All functions in this file is real magic for up performance
 */

/**
 * Magic class.
 *
 * @constructor
 * @param {String} color
 */
function Magic() {
    this.wt = new Array();
    this.mArrt = new Array();
    this.sumW = 0;
}

/**
 * Space distribution function
 * @param weight
 * @param height
 * @returns {number}
 */
Magic.prototype.getMWight = function (weight, height) {
    return Math.pow(((weight + 2)*5 / height), 0.5);
};

/**
 * Calculate w param to next renders
 * @param locations
 */
Magic.prototype.calclulateW = function (locations) {
    this.wt = new Array();
    this.mArrt = new Array();
    this.sumW = 0;

    for (var g in locations) {
        if (!mgc.mArrt[locations[g]["residents"].length])
            mgc.mArrt[locations[g]["residents"].length] = new Array();
        mgc.mArrt[locations[g]["residents"].length].push(locations[g]);
    }
    var ht;
    for(var t in mgc.mArrt){
        ht = window.innerHeight / mgc.mArrt[t].length;
        mgc.wt[t] = mgc.getMWight(t, ht);
        mgc.sumW += mgc.wt[t];
    }
};

Magic.prototype.getW = function (w) {
    return w;// / (Math.pow(window.innerHeight, 0.5));
};

/**
 * binarySearch - find optimal size for square
 * @param {int} WW - wight of screen
 * @param {int} WH - height of screen
 * @param {int} count - squares count
 * @returns {number}
 */
Magic.prototype.findOptimalSize = function (WW, WH, count) {
    var left = 1, right = Math.min(WH, WW), mid;
    while (right - left > 1) {
        mid = (left + right) >> 1;
        if (Math.floor(WH / mid) * Math.floor(WW / mid) >= count) {

            left = mid;
        }
        else {
            right = mid;
        }
    }
    return mid - 1;
};
var mgc = new Magic();
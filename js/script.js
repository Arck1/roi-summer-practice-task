window.onload = function () {

    document.querySelector("#locations-wrap").setAttribute("height", window.innerHeight);
    rmApi.loadLocatiions();
    mgc.calclulateW(CACHE.locations);
    rmg.renderLocations(mgc.mArrt, mgc.wt, mgc.sumW);

    window.onresize = function (ev) {
        document.querySelector("#locations-wrap").setAttribute("height", window.innerHeight);
        if(CURRENTPAGE <= 0){
            rmg.renderLocations(mgc.mArrt, mgc.wt, mgc.sumW);
        }
        else{
            rmg.renderCharacters(CURRENTPAGE);
        }
    };
    document.querySelector("#js-loader").style.visibility = "hidden";
};


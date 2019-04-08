//URLSearchParams polyfill
(function (w) {

    w.URLSearchParams = w.URLSearchParams || function (searchString) {
        this.searchString = searchString;
        this.get = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(this.searchString);
            if (results == null) {
                return null;
            }
            else {
                return decodeURI(results[1]) || 0;
            }
        };
    }

})(window);

//querystring encoder [href] attribute
//save onload handler
var windowOnLoad = window.onload;
var load = function() {
    //if saved onload handler exists, execute it.
    windowOnLoad && windowOnLoad();
    var target = document.querySelectorAll('[href]');
    for(var i = 0;i < target.length;i++) {
        var url = target[i].getAttribute('href');
        url = encodeURI(url);
        target[i].setAttribute('href', url);
    }
}
addEventListener('load', load);
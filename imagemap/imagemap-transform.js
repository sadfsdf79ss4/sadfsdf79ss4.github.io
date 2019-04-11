//imagemap coords transformer
(function(window) {
    function _ImagemapTransform(imgTag) {
        var transformer = ImagemapTransformer(imgTag);
        transformer();
        imgTag.addEventListener('load', transformer);
        imgTag.addEventListener('resize', transformer);
    }
    function ImagemapTransformer(imgTag) {
        return function() {
            if((imgTag || imgTag.tagName == 'img') && imgTag.hasAttribute('usemap')) {
                var areas = document.querySelector('map[name='+imgTag.useMap.split('#')[1]+']').areas;
                for(var i = 0;i < areas.length;i++) {
                    var e = areas[i];
                    e.coords = transformCoord(e.coords, imgTag.naturalWidth, imgTag.naturalHeight, imgTag.clientWidth, imgTag.clientHeight);
                }
            } else {
                console.log('invalid img tag with usemap attribute')
            }
        }
    }
    function transformCoord(oldCoord, naturalWidth, naturalHeight, finalWidth, finalHeight) {
        var scaleX = finalWidth / naturalWidth;
        var scaleY = finalHeight / naturalHeight;
        var coords = oldCoord.split(',');
        if(coords.length <= 1 && coords.length % 2 != 0) {
            console.log("coord pair must be even");
            return oldCoord;
        }
        var transformed = '';
        for(var i = 0;i < coords.length;i+=2) {
            var coordX = Number(coords[i].trim()) * scaleX;
            var coordY = Number(coords[i+1].trim()) * scaleY;
            transformed += (coordX + ',' + coordY);
            if(i != coords.length - 2) {
                transformed += ',';
            }
        }
        return transformed;
    };
    window.ImagemapTransform = _ImagemapTransform;
})(window);
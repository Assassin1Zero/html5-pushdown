'use strict';
var ads = require('ad-utils/lib/helper'),
    frameUtils = require('ad-utils/lib/frame-utils');

window.AdOps = window.AdOps || {};

window.AdOps.pushdown = function(options) {

    var config = {
        clickUrl: 'http://www.example.com',
        src: 'about:blank',
        iframeId: 'HTML5PushdownFrame'
    };


    var d = document,
        frame;

    function setConfiguration() {

        for (var key in options) {

            if (config.hasOwnProperty(key)) {

                config[key] = options[key];
            }
        }
    }

    function createFrame(src) {

        var f = d.createElement('iframe');
        f.setAttribute('id', config.iframeId);
        f.setAttribute('marginwidth', 0);
        f.setAttribute('marginheight', 0);
        f.setAttribute('frameborder', 0);
        f.setAttribute('scrolling', 'no');
        f.setAttribute('allowtransparency', true);
        f.setAttribute('src', src + '?clickTag=' + config.clickUrl);
        f.setAttribute('width', '970');
        f.setAttribute('height', '250');
        document.body.appendChild(f);

        return f;
    }

    function handleMessage(e) {

        if (!e.origin.match(/websure\.org|discoveryint1\.edgeboss\.net|dniadops-a\.akamaihd\.net/i)) {
            return;
        }

        if (e.data.resizeFrame) {

            var f = frameUtils.adFrame();
            //d.getElementById(config.iframeId).setAttribute('height', e.data.resizeFrame.height);
            f.setAttribute('height', e.data.resizeFrame.height);

        }
    }

    if (options) {
        setConfiguration();
    }

    return {
        init: function() {

            frame = createFrame(config.src);
            ads.addEvent('message', handleMessage, window);
        }
    };
};

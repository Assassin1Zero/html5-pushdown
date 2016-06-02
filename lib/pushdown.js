'use strict';
var find = require('sizzle'),
    ads = require('ad-utils/helper');

window.AdOps = window.AdOps || {};

window.AdOps.pushdown = function(options) {

    var config = {
        stage: '#Pushdown_Stage',
        openContainer: '#Pushdown_Opened',
        closeContainer: '#Pushdown_Closed',
        close: '.ad-close',
        mute: '.ad-mute',
        unmute: '.ad-unmute',
        click: '.ad-click',
        clickUrl: 'http://www.example.com',
        minHeight: 90,
        maxHeight: 250,
        delay: 1500
    };

    var isOpen = true;

    var adReady = document.createEvent('Event'),
        adClosed = document.createEvent('Event'),
        adOpened = document.createEvent('Event');

    adReady.initEvent('ADOPS_PUSHDOWN_READY', true, true);
    adClosed.initEvent('ADOPS_PUSHDOWN_CLOSED', true, true);
    adOpened.initEvent('ADOPS_PUSHDOWN_OPENED', true, true);

    function setConfiguration() {

        for (var key in options) {

            if (config.hasOwnProperty(key)) {

                config[key] = options[key];
            }
        }
    }

    function getStage() {

        return find(config.stage)[0];
    }

    function getCloseContainer() {

        return find(config.closeContainer)[0];
    }

    function getOpenContainer() {

        return find(config.openContainer)[0];
    }

    function toggle() {

        if (isOpen) {

            return closeAd();
        }

        return openAd();
    }

    function closeAd() {

        window.top.parent.postMessage({
            resizeFrame: {
                height: config.minHeight
            }
        }, '*');

        getOpenContainer().style.display = 'none';
        getCloseContainer().style.display = 'block';

        find('video, audio').forEach(function(el) {
            el.pause();
            el.currentTime = 0;
        });

        isOpen = false;
        return;
    }

    function openAd() {

        window.top.parent.postMessage({
            resizeFrame: {
                height: config.minHeight
            }
        }, '*');

        getOpenContainer().style.display = 'block';
        getCloseContainer().style.display = 'none';

        isOpen = true;
        return;
    }


    if (options) {

        setConfiguration(options);
    }

    return {

        init: function() {



            document.dispatchEvent(adReady);



            document.dispatchEvent(adOpened);
        },

        toggle: toggle,

        addEvent: ads.addEvent

    };
};

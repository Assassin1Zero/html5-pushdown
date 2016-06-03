'use strict';
var find = require('sizzle'),
    ads = require('ad-utils/lib/helper');

window.AdOps = window.AdOps || {};

window.AdOps.pushdown = function(options) {

    var isOpen = true,
        qs = ads.qsToObject();

    var config = {
        stage: '#Pushdown_Stage',
        openContainer: '#Pushdown_Opened',
        closeContainer: '#Pushdown_Closed',
        toggle: '.ad-toggle',
        mute: '.ad-mute',
        unmute: '.ad-unmute',
        click: '.ad-click',
        clickUrl: qs.clickTag || qs.clickTAG || 'http://www.example.com',
        minHeight: 90,
        maxHeight: 250,
        delay: 1500
    };

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

        window.parent.postMessage({
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

        find(config.toggle).forEach(function(el) {
            el.classList.remove('ad-opened');
            el.classList.add('ad-closed');
        });

        document.dispatchEvent(adClosed);
        isOpen = false;
        return;
    }

    function openAd() {

        window.parent.postMessage({
            resizeFrame: {
                height: config.maxHeight
            }
        }, '*');

        getOpenContainer().style.display = 'block';
        getCloseContainer().style.display = 'none';

        find(config.toggle).forEach(function(el) {
            el.classList.add('ad-opened');
            el.classList.remove('ad-closed');
        });

        document.dispatchEvent(adOpened);

        if (config.delay) {

            setTimeout(closeAd, config.delay);
        }

        isOpen = true;
        return;
    }


    if (options) {

        setConfiguration(options);
    }

    return {

        init: function() {

            find(config.click).forEach(function(el) {

                ads.addEvent('click', function(e) {

                    e.preventDefault();
                    window.open(config.clickUrl, '_blank');

                }, el);
            });

            find(config.toggle).forEach(function(el) {

                ads.addEvent('click', function(e) {

                    e.preventDefault();
                    toggle();
                }, el);
            });

            document.dispatchEvent(adReady);

            openAd();

        },

        toggle: toggle,

        addEvent: ads.addEvent

    };
};

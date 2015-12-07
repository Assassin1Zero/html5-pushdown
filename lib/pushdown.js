var ads = require('ad-utils');

window.AdOps = window.AdOps || {};

window.AdOps.pushdown = (function (options) {

    var config = {
        stage: '#stage',
        close: '.ad-close',
        mute: '.ad-mute',
        unmute: '.ad-unmute',
        base: '/',
        click: '.ad-click',
        clickUrl: 'http://www.example.com',
        minHeight: 90,
        maxHeight: 250
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

    function getStage() {

        return document.getElementById(config.stage.replace('#', ''));
    }

    function setStageSize(width, height) {

        var stage = getStage();

        if (stage) {

            if (width && !isNaN(width)) {

                stage.style.width = width + 'px';

            }

            if (height && !isNaN(height)) {

                stage.style.height = height + 'px';

            }
        }
    }

    function toggle() {

        var stage = getStage();

        if (stage.clientHeight >= config.maxHeight) {

            setStageSize(null, config.minHeight);
            ads.frame.resizeFrame(null, config.minHeight);
            document.dispatchEvent(adClosed);

        } else {

            setStageSize(null, config.maxHeight);
            ads.frame.resizeFrame(null, config.maxHeight);
            document.dispatchEvent(adOpened);

        }
    }

    try {
        var base = document.createElement('base');
        base.href = config.base;
        document.head.appendChild(base);
    } catch(e) {}

    if (options) {

        setConfiguration(options);
    }

    return {

        init: function () {

            ads.helper.query(config.close, function (el) {

                ads.helper.addEvent('click', function (e) {

                    e.preventDefault();
                    toggle();
                }, el);
            });

            ads.helper.query(config.click, function (el) {

                ads.helper.addEvent('click', function (e) {

                    e.preventDefault();
                    window.open(config.clickUrl);
                }, el);
            });

            document.dispatchEvent(adReady);
            setStageSize(null, config.maxHeight);
            ads.frame.resizeFrame(null, config.maxHeight);
            document.dispatchEvent(adOpened);
        },

        toggle: toggle,

        addEvent: ads.helper.addEvent

    };
});

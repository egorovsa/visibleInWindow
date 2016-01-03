(function ($) {
    var methods = {
        init: function (options) {
            this.each(function () {
                var $this = jQuery(this);

                var settings = jQuery.extend({
                    afterVisible: 220,
                    beforeEnd: 150,
                    beginShow: function () {
                    },
                    endShow: function () {
                    },
                }, options);

                $this.data({
                    visibledInWindow: {
                        settings: settings,
                        showed: true
                    }
                });
                methods._initCopy($this);
            });
        },
        _initCopy: function ($this) {
            var data = $this.data().visibledInWindow;
            var settings = $this.data().visibledInWindow.settings;
            var scrTol = jQuery(window).scrollTop();
            var wHeight = jQuery(window).height();
            this.eventScroll($this);
            this.actionScroll($this, scrTol, wHeight);
            settings.endShow();
        },
        eventScroll: function ($this) {
            var self = this;
            var data = $this.data().visibledInWindow;
            jQuery(window).scroll(function () {
                var scrTol = jQuery(this).scrollTop();
                var wHeight = jQuery(this).height();
                self.actionScroll($this, scrTol, wHeight)
            });
        },
        actionScroll: function ($this, scrTol, wHeight) {
            var data = $this.data().visibledInWindow;
            var settings = $this.data().visibledInWindow.settings;
            var objTop = $this.offset().top;

            var objVisibleBegin = objTop - wHeight + settings.afterVisible;
            var objVisibleBeginEnd = objTop + $this.height() - settings.beforeEnd;
            if (scrTol > objVisibleBegin && scrTol < objVisibleBeginEnd) {
                if (data.showed == false) {
                    settings.beginShow($this);
                }
                data.showed = true;
            }
            if (scrTol < objVisibleBegin || scrTol > objVisibleBeginEnd) {
                if (data.showed == true)
                    settings.endShow($this);
                data.showed = false;
            }

        },
    };
    jQuery.fn.visibledInWindow = function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);

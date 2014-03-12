;(function($) {
    'use strict';
    $.fn.jptab = function(settings) {
        var _defaultSettings = {
                activeClass: 'active',
                tabBlocks: 'div.tab-block',
                tabs: 'div.tabs'
            },
            _settings = $.extend(_defaultSettings, settings),
            _handler = function() {
                var container = this,
                    $tabBlocks = $(_settings.tabBlocks, container),
                    $tabsList = $(_settings.tabs + ' li', container),
                    $tabsLink = $(_settings.tabs + ' li a', container),
                    tabIdList = [];

                $tabsLink.each(function() {
                    var matches = (String(this.href).match(/(#.+)$/));
                    if (null !== matches) {
                        tabIdList.push(matches[1]);
                    }
                });

                var matches = (String(location.href).match(/(#.+)$/));
                if (null !== matches && -1 !== $.inArray(matches[1], tabIdList)) {
                    var id = matches[1];
                    $tabBlocks.hide();
                    $(id).show();
                    $tabsList.removeClass(_settings.activeClass);
                    $tabsLink.each(function() {
                        if (-1 !== String(this.href).indexOf(id)) {
                            $(this).parent('li').toggleClass(_settings.activeClass);
                        }
                    });
                } else {
                    $tabBlocks.hide().eq(0).show();
                }

                $tabsLink.on('click', function() {
                    $tabsList.removeClass(_settings.activeClass);
                    $(this).parent('li').toggleClass(_settings.activeClass);
                    $tabBlocks.hide();
                    var id = (String(this.href).match(/(#.+)$/))[1];
                    $(id).show();
                    return false;
                });

                var $activeLink = $(_settings.tabs + ' li.' + _settings.activeClass + ' > a', container);
                if (0 !== $activeLink.size()) {
                    $activeLink.trigger('click');
                }
            };
        return this.each(_handler);
    };
})(jQuery);
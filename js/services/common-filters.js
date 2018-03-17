(function () {
    'use strict';

    angular.module('common-filters', []).
            filter('camelCase', camelCase)
            .filter('secondsToDateTime', secondsToDateTime);
    function secondsToDateTime() {
        return function (seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }

    function camelCase()
    {
        var camelCaseFilter = function (input)
        {
            var words = input.split(' ');
            for (var i = 0, len = words.length; i < len; i++)
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            return words.join(' ');
        };
        return camelCaseFilter;
    }
})();
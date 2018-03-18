(function () {
    'use strict';
    var template = require('raw-loader!./filter.template.html');
    angular.module('filterModule', []).
            directive('filter', filter).
            controller('filterController', filterController);

    function filter() {
        return{
            template: template,
            controller: "filterController",
            controllerAs: "vmController",
            bindToController: true,
            restrict: 'E',
            scope: {filterData: '=', remove: '&'},
            link: linkFunction()
        };
    }

    function linkFunction() {
        return{
            pre: preLink,
            post: postLink
        };
    }

    /**
     * prelinking function
     */
    function preLink(scope, elem, attr, ctrl) {
    }

    /**
     * postlinking function
     */
    function postLink(scope, elem, attr, ctrl) {
    }

    /**
     * Controller function
     */
    function filterController() {
    }

})();
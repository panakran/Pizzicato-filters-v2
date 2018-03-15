(function () {
    'use strict';

    angular.module('filterModule', []).
            directive('filter', filter).
            controller('filterController', filterController);

    function filter() {
        return{
            templateUrl: './js/directives/filter/filter.template.html',
            controller: "filterController",
            controllerAs: "vmController",
            bindToController: true,
            restrict: 'E',
            scope: {filterData: '=', remove:'='},
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
    filterController.$inject = ['$scope', 'fetchKnobFilterConstants'];
    function filterController($scope, fetchKnobFilterConstants) {
        var vm = this;
        console.log('vm::',vm);
        
    }

})();
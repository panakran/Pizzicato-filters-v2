(function () {
    'use strict';

    angular.module('filterAttrModule', []).
            directive('filterAttr', filterAttr).
            controller('filterAttrController', filterAttrController);

    function filterAttr() {
        return{
            templateUrl: './js/directives/filter-attributes/filter.attr.template.html',
            controller: "filterAttrController",
            controllerAs: "vmController",
            bindToController: true,
            restrict: 'E',
            scope: {
                /**
                 * min, max, name one-way bindings
                 * defautls two-way bind so we can communicate with parent
                 */
                min: '<',
                max: '<',
                name: '<',
                defaults: '='
            },
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
    filterAttrController.$inject = ['$scope', 'fetchConstants'];
    function filterAttrController($scope, fetchConstants) {

        var vm = this;

        /**
         * Ctrl functions
         */
        vm.options = fetchConstants.knobFilter();
        vm.init = init;

        /**
         * Ctrl wathers
         */
        $scope.$watch('vm.defaults', watcherDefaults);

        /**
         * Function implementations
         */
        function watcherDefaults(newVal) {
            vm.default = parseFloat(newVal);
        }
        function init() {
                vm.options.min = vm.min;
                vm.options.max = vm.max;
            vm.options.defaults = parseFloat(vm.defaults);
            vm.options.step = (vm.max - vm.min > 0 ? vm.max - vm.min : vm.min - vm.max) / 100;
            vm.options.subText.text = vm.name;
        }
    }



})();
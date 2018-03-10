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
                min: '<',
                max: '<',
                name: '<',
                value: '='
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
    filterAttrController.$inject = ['$scope', 'fetchKnobFilterConstants', '$q'];
    function filterAttrController($scope, fetchKnobFilterConstants, $q) {
        var vm = this;
        console.log(vm);
        vm.options = {
            skin: {
                type: 'tron'
            },
            dynamicOptions: true,
            size: 200,
            unit: "",
            barWidth: 30,
            trackColor: 'rgba(255,0,0,.1)',
            prevBarColor: 'rgba(0,0,0,.2)',
            subText: {
                enabled: true,
                text: ''
            },
            scale: {
                enabled: true,
                type: 'dots',
                width: 2
            },
            displayPrevious: true
        };
        vm.init = init;
        function init() {
            vm.options.min = vm.min;
            vm.options.max = vm.max;
            vm.options.step = (vm.max - vm.min) / 100;
            vm.options.subText.text = vm.name;
        }
    }



})();
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ngprogress/ngProgress.css';
(function () {
    'use strict';
    var template = require('raw-loader!./song.template.html');
    angular.module('SongModule', [
        'ui.knob',
        'common-services',
        'filterModule',
        'filterAttrModule',
        'ngProgress',
        'common-filters',
        'ngAnimate']).
            controller('SongController', SongController).
            directive('song', song);

    function song() {
        return{
            template: template,
            controller: "SongController",
            controllerAs: "vmController",
            bindToController: true,
            restrict: 'E',
            scope: {title: '<'},
            link: linkFunction(),
            transclude: true
        };
    }

    /**
     * Linking function
     */
    function linkFunction() {
        return{
            pre: preLink,
            post: postLink
        };
    }

    /**
     * prelinking function
     */
    function preLink(scope, elem, attr, ctrl, transclude) {

    }

    /**
     * postlinking function
     */
    function postLink(scope, elem, attr, ctrl) {
    }

    SongController.$inject = ['$scope', 'fetchConstants', 'pizzicatoFilterService', 'playerService', 'intervalService', '$transclude'];
    function SongController($scope, fetchConstants, pizzicatoFilterService, playerService, intervalService, $transclude) {

        /**
         * Private variables
         */
        var vm = this;
        var promise;
        /**
         * Ctrl variables
         */
        vm.filtersApplied = [];
        vm.playStatus = true;
        vm.volume = 65;
        vm.options = fetchConstants.knobVolume();
        vm.songLoaded = false;

        /**
         * Ctrl Functions
         */
        vm.addFilter = addFilter;
        vm.removeFilter = removeFilter;
        vm.togglePlay = togglePlay;
        vm.stop = stop;
        vm.initConstants = initConstants;
        vm.stopCounter = stopCounter;
        vm.startCounter = startCounter;

        /**
         * Ctrl watchers
         */
        $scope.$watch('vmController.volume', watcherVolume);
        $scope.$watch('vmController.filtersApplied', watcherFiltersApplied, true);

        /**
         * Ctrl on destroy
         */
        $scope.$on('$destroy', destroyCounterInterval);

        /**
         * Run on start up
         */
        initConstants();


        /**
         * Functions implementation
         */
        function startCounter() {
            // stops any running interval to avoid two intervals running at the same time
            vm.stopCounter();
            // store the interval promise
            promise = intervalService.startInterval(vm);

        }
        function stopCounter() {
            intervalService.stopInterval(promise);
        }

        function destroyCounterInterval() {
            stopCounter();
        }

        function watcherVolume(newVolume) {
            if (vm.songFile !== undefined) {
                vm.songFile.volume = pizzicatoFilterService.scale(newVolume);
            }
        }
        function watcherFiltersApplied(newFilterAttr) {
            pizzicatoFilterService.applyNewValues(newFilterAttr, vm.songFile);
        }

        function togglePlay() {
            playerService.togglePlay(vm);
        }

        function stop() {
            playerService.stop(vm);
        }

        function addFilter(filter) {
            pizzicatoFilterService.addFilter(vm, filter);
        }

        function removeFilter(index) {
            pizzicatoFilterService.removeFilter(vm, index);
        }

        function initConstants() {
            fetchConstants.pizzicato().then(
                    function Success(data) {
                        vm.filters = data;
                        vm.filtersApplied = [];
                        $transclude(function (transcudeContent) {
                            angular.forEach(transcudeContent, function (value, index) {
                                pizzicatoFilterService.transcludeFilters(vm, value, index);
                            });
                        });
                    },
                    function Error() {
                    });

        }

    }
})();
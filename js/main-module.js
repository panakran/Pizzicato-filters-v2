(function () {
    'use strict';


    angular.module('MainModule', ['ui.knob', 'common-services', 'filterModule', 'filterAttrModule', 'ngProgress', 'common-filters']).
            controller('MainModuleCtrl', MainModuleCtrl);

    MainModuleCtrl.$inject = ['$scope', 'fetchConstants', 'pizzicatoFilterService', 'ngProgressFactory', '$interval'];
    function MainModuleCtrl($scope, fetchConstants, pizzicatoFilterService, ngProgressFactory, $interval) {

        var vm = this;

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
        vm.loadSong = loadSong;
        vm.addFilter = addFilter;
        vm.removeFilter = removeFilter;
        vm.togglePlay = togglePlay;
        vm.stop = stop;
        vm.initConstants = initConstants;

        /**
         * Ctrl watchers
         */
        $scope.$watch('vm.volume', watcherVolume);
        $scope.$watch('vm.filtersApplied', watcherFiltersApplied, true);

        /**
         * Run on start up
         */
        //////////////
        vm.stopCounter = stopCounter;
        vm.startCounter = startCounter;

        // simulated items array
        var promise;
        // starts the interval
        function startCounter() {
            // stops any running interval to avoid two intervals running at the same time
            vm.stopCounter();
            // store the interval promise
            promise =
                    $interval(function () {
//                        console.log(vm.songFile);
                        vm.progressbar.set(
                                100-(vm.counter/vm.songFile.sourceNode.buffer.duration)*100
                                );
                        vm.counter--;
                    }, 1000);
        }
        

        // stops the interval
        function stopCounter() {
            $interval.cancel(promise);
        }
        

        // starting the interval by default


        // stops the interval when the scope is destroyed,
        // this usually happens when a route is changed and 
        // the ItemsController $scope gets destroyed. The
        // destruction of the ItemsController scope does not
        // guarantee the stopping of any intervals, you must
        // be responsible for stopping it when the scope is
        // is destroyed.
        $scope.$on('$destroy', function () {
            stopCounter();
        });
        //////////////
        initConstants();


        /**
         * Functions implementation
         */
        function watcherVolume(newVolume) {
            if (vm.songFile !== undefined) {
                vm.songFile.volume = pizzicatoFilterService.scale(newVolume);
            }
        }
        function watcherFiltersApplied(newFilterAttr) {
            pizzicatoFilterService.applyNewValues(newFilterAttr, vm.songFile);
        }

        function togglePlay() {
            if (vm.playStatus) {
                if (vm.songFile == null) {
                    loadSong();
                    
                } else {
                    vm.songFile.play();
                    vm.startCounter();
                    vm.state = 'running';
                }
            } else {
                vm.songFile.pause();
                vm.stopCounter();
                vm.state = 'paused';
            }
            vm.playStatus = !vm.playStatus;
        }

        function stop() {
            vm.songFile.stop();
            vm.stopCounter();
            vm.counter = vm.songFile.sourceNode.buffer.duration;
            vm.state = 'stoped';
            vm.playStatus = true;
            vm.progressbar.set(0);
        }

        function loadSong() {
            vm.songLoaded = true;
            vm.progressbar = ngProgressFactory.createInstance();
            vm.progressbar.start();
            vm.songFile =
                    new Pizzicato.Sound({
                        source: 'file',
                        options: {path: '/songs/nirv.mp3'}
                    }, function () {
                        vm.songFile.play();
                        console.log("DURATION", vm.songFile.sourceNode.buffer.duration)
                        vm.counter = vm.songFile.sourceNode.buffer.duration;
                        vm.startCounter();
                        vm.state = 'running';
                        vm.songFile.volume = vm.volume / 100;
                        angular.forEach(vm.filtersApplied, function (singleFilter, index) {
                            console.log(singleFilter);
                            vm.songFile.addEffect(new singleFilter.class());
                        });
                        vm.progressbar.complete();
                        vm.songLoaded = false;

                    });
        }
        function addFilter(filter) {
            pizzicatoFilterService.addFilter(vm, filter);
        }
        function removeFilter(index) {
            pizzicatoFilterService.removeFilter(vm, index);
        }
        function initConstants() {

            fetchConstants.pizzicato().then(function (data) {

                vm.filters = data;
                vm.filtersApplied = [];
            }, function () {

            });
        }

    }
})();
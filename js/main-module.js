angular.module('MainModule', ['ui.knob', 'common-services', 'filterModule', 'filterAttrModule']).
        controller('MainModuleCtrl', function ($scope, fetchKnobVolumeConstants, fetchFilterConstants) {
            var vm = this;
            vm.fil = [];
            vm.filtersApplied = [];
            vm.playStatus = false;
            vm.loadSong = loadSong;
            vm.addFilter = addFilter;
            vm.removeFilter = removeFilter;
            vm.togglePlay = togglePlay;
            vm.stop = stop;
            $scope.$watch('vm.volume', watcherVolume);
            $scope.$watch('vm.filtersApplied', wathcerFiltersApplied, true);

            function watcherVolume(newVolume) {
                if (vm.songFile !== undefined)
                    vm.songFile.volume = newVolume / 100;
            }
            function wathcerFiltersApplied(newFilterAttr) {
                newFilterAttr.forEach(function (element, index) {
                    element.props.forEach(function (property) {
                        vm.songFile.effects[index][property.name] = parseFloat(property.defaults);
                    });
                });
            }

            function togglePlay() {

                if (vm.playStatus) {
                    vm.songFile.play();
                } else {
                    vm.songFile.pause();
                }
                vm.playStatus = !vm.playStatus;
            }

            function stop() {
                vm.songFile.stop();
                vm.playStatus = true;
            }

            function loadSong() {
                vm.songFile =
                        new Pizzicato.Sound({
                            source: 'file',
                            options: {path: '/songs/nirv.mp3'}
                        }, function () {
                            console.log('sound file loaded!');
                            vm.songFile.play();
                            vm.songFile.volume = vm.volume / 100;
                            angular.forEach(vm.filtersApplied, function (singleFilter, index) {
                                console.log(singleFilter);
                                var tempFilterClass = new singleFilter.class;
                                vm.filtersApplied.push(tempFilterClass);
                                vm.songFile.addEffect(vm.filtersApplied[index]);
                            });

                        });
            }
            function addFilter(filter) {
                vm.filtersApplied.push(filter);
                vm.songFile.addEffect(new vm.filtersApplied[vm.filtersApplied.indexOf(filter)].class);

            }
            function removeFilter(filter) {
                console.log("REMOVE", filter);
//                $scope.songFile.removeEffect($scope.filtersApplied[0]);
            }

            vm.volume = 65;
            vm.options = fetchKnobVolumeConstants;
            fetchFilterConstants.then(function (data) {

                vm.filters = data;
                console.log(vm.filters);
                vm.filtersApplied = [];
            }, function () {

            });

        });
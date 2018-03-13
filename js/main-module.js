angular.module('MainModule', ['ui.knob', 'common-services', 'filterModule', 'filterAttrModule']).
        controller('MainModuleCtrl', function ($scope, fetchKnobVolumeConstants, fetchFilterConstants) {
            $scope.fil = [];
            $scope.fil2 = [];
            $scope.playStatus = false;

            $scope.loadSong = function () {
                $scope.songFile =
                        new Pizzicato.Sound({
                            source: 'file',
                            options: {path: '/songs/nirv.mp3'}
                        }, function () {
                            console.log('sound file loaded!');
                            $scope.songFile.play();
                            $scope.songFile.volume = $scope.volume / 100;
                            angular.forEach($scope.filtersApplied, function (singleFilter, index) {
                                console.log(singleFilter);
                                var tempFilterClass = new singleFilter.class;
                                $scope.fil2.push(tempFilterClass);
                                $scope.songFile.addEffect($scope.fil2[index]);
                            });

                        });
            };
            $scope.$watch('volume', function (newVolume) {
                $scope.songFile.volume = newVolume / 100;
            });
            $scope.addFilter = function (filter) {
                console.log("filter to apply", filter);
                var tempFilterClass = new filter.class;
                $scope.fil2.push(tempFilterClass);
                $scope.filtersApplied.push(filter);
                $scope.songFile.addEffect($scope.fil2[$scope.fil2.indexOf(tempFilterClass)]);
                
                console.log("filter to apply", $scope.filtersApplied);
            };
            $scope.removeFilter = function (filter) {
//                $scope.songFile.removeEffect
                console.log("REMOVE", filter);
            };
            $scope.togglePlay = function () {

                if ($scope.playStatus) {
                    $scope.songFile.play();
                } else {
                    $scope.songFile.pause();
                }
                $scope.playStatus = !$scope.playStatus;
            };
            $scope.stop = function () {
                $scope.songFile.stop();
                $scope.playStatus = true;
            };
            $scope.$watch('filtersApplied', function (newVolume) {
                 console.log("WATCHER", newVolume);
                newVolume.forEach(function (value1, index) {
                    value1.props.forEach(function (value2) {
                        $scope.fil2[index][value2.name] = parseFloat(value2.defaults);
                    });
                });
            }, true);

            $scope.volume = 65;
            $scope.options = fetchKnobVolumeConstants;
            fetchFilterConstants.then(function (data) {

                $scope.filters = data;
                console.log($scope.filters);
                $scope.filtersApplied = [];
            }, function () {

            });

        });
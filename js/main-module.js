angular.module('MainModule', ['ui.knob', 'common-services', 'filterModule', 'filterAttrModule']).
        controller('MainModuleCtrl', function ($scope, fetchKnobVolumeConstants, fetchFilterConstants) {
            $scope.fil = [];
            $scope.fil2 = [];

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
            $scope.$watch('filtersApplied', function (newVolume) {
                angular.forEach(newVolume, function (value1, index) {
                    angular.forEach(value1.props, function (value2) {
                        $scope.fil2[index][value2.name] = parseFloat(value2.defaults);
                    });
                });
            }, true);

            $scope.volume = 65;
            $scope.options = fetchKnobVolumeConstants;
            fetchFilterConstants.then(function (data) {

                $scope.filters = data;
                $scope.filtersApplied = [$scope.filters[3], $scope.filters[1]];
            }, function () {

            });

        });
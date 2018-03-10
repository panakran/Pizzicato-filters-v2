angular.module('MainModule', ['ui.knob', 'common-services', 'filterModule', 'filterAttrModule']).
        controller('MainModuleCtrl', function ($scope, fetchKnobVolumeConstants, fetchFilterConstants) {


            $scope.loadSong = function () {
                $scope.songFile =
                        new Pizzicato.Sound({
                            source: 'file',
                            options: {path: '/songs/nirv.mp3'}
                        }, function () {
                            console.log('sound file loaded!');
                            $scope.songFile.play();
                            $scope.songFile.volume = $scope.volume / 100;
                            $scope.fil = new $scope.filtersApplied[0].class;
                            $scope.songFile.addEffect($scope.fil);
                        });
            };
            $scope.$watch('volume', function (newVolume) {
                $scope.songFile.volume = newVolume / 100;
            });
            $scope.$watch('filtersApplied', function (newVolume) {
                console.log("change", newVolume);
                $scope.fil['gain'] = parseFloat(newVolume[0].props[0].defaults);
//                $scope.filtersApplied[0].class. = parseFloat(newVolume);
            }, true);
            
            $scope.volume = 65;
            $scope.options = fetchKnobVolumeConstants;
            fetchFilterConstants.then(function (data) {

                $scope.filters = data
                $scope.filtersApplied = [$scope.filters[3]];
            }, function (reason) {

            });

        });
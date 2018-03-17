(function () {
    'use strict';

    angular.module('common-services', []).
            factory('lodash', lodash).
            factory('fetchConstants', fetchConstants).
            factory('pizzicatoFilterService', pizzicatoFilterService);

    function pizzicatoFilterService() {
        return {
            applyNewValues: applyNewValues,
            scale: scale,
            addFilter: addFilter,
            removeFilter: removeFilter
        };


        function addFilter(model, filter) {
            model.filtersApplied.push(angular.copy(filter));
            if (model.songFile !== undefined) {
                model.songFile.addEffect(new filter.class());
            }
        }
        function removeFilter(model, index) {
            if (model.songFile !== undefined) {
                model.songFile.removeEffect(model.songFile.effects[index]);
            }
            model.filtersApplied.splice(index, 1);
        }
        function scale(volume) {
            return  volume / 100;
        }
        function applyNewValues(newValues, song) {
            if (song !== undefined) {
                newValues.forEach(function (element, index) {
                    element.props.forEach(function (property) {
                        song.effects[index][property.name] = parseFloat(property.defaults);
                    });
                });
            }
        }
    }

    function lodash() {
        return _;
    }

    /**
     * Fetch constants services
     */
    fetchConstants.$inject = ['$q'];
    function fetchConstants($q) {
        return {
            knobVolume: knobVolume,
            knobFilter: knobFilter,
            pizzicato: pizzicato
        };

        function knobFilter() {
            return {
                size: 200,
                bgColor: '#2C3E50',
                trackWidth: 50,
                barWidth: 30,
                barColor: '#FFAE1A',
                textColor: '#eee',
                subText: {
                    enabled: true,
                    text: '',
                    color: 'white'
                }

            };
        }
        function knobVolume() {
            return {
                size: 250,
                subText: {
                    enabled: true,
                    text: 'Volume',
                    color: 'gray',
                    font: 'auto'
                },
                trackWidth: 50,
                barWidth: 30,
                trackColor: '#656D7F',
                barColor: '#2CC185'
            };
        }
        function pizzicato() {
            var deferred = $q.defer();
            deferred.resolve([
                {
                    name: "Delay",
                    class: Pizzicato.Effects.Delay,
                    props: [{
                            min: 0, max: 1, defaults: 0.5, name: "feedback"
                        },
                        {
                            min: 0, max: 1, defaults: 0.3, name: "time"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }]
                },
                {
                    name: "Ping pong delay",
                    class: Pizzicato.Effects.PingPongDelay,
                    props: [{
                            min: 0, max: 1, defaults: 0.5, name: "feedback"
                        },
                        {
                            min: 0, max: 1, defaults: 0.3, name: "time"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]
                },
                {
                    name: "Dub delay",
                    class: Pizzicato.Effects.DubDelay,
                    props: [{
                            min: 0, max: 1, defaults: 0.5, name: "feedback"
                        },
                        {
                            min: 0, max: 1, defaults: 0.3, name: "time"
                        },
                        {
                            min: 0, max: 4000, defaults: 700, name: "cutoff"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]
                },
                {
                    name: "Distortion",
                    class: Pizzicato.Effects.Distortion,
                    props: [{
                            min: 0, max: 1, defaults: 0.5, name: "gain"
                        }
                    ]
                },
                {name: "Quadrafuzz",
                    class: Pizzicato.Effects.Quadrafuzz,
                    props: [{
                            min: 0, max: 1, defaults: 0.6, name: "lowGain"
                        },
                        {
                            min: 0, max: 1, defaults: 0.8, name: "midLowGain"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "midHighGain"
                        },
                        {
                            min: 0, max: 1, defaults: 0.6, name: "highGain"
                        }
                    ]
                },
                {
                    name: "Flanger",
                    class: Pizzicato.Effects.Flanger,
                    props: [{
                            min: 0, max: 1, defaults: 0.45, name: "time"
                        },
                        {
                            min: 0, max: 1, defaults: 0.2, name: "speed"
                        },
                        {
                            min: 0, max: 1, defaults: 0.1, name: "depth"
                        },
                        {
                            min: 0, max: 1, defaults: 0.1, name: "feedback"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]
                },
                {
                    name: "Compressor",
                    class: Pizzicato.Effects.Compressor,
                    props: [{
                            min: -100, max: 0, defaults: -24, name: "threshold"
                        },
                        {
                            min: 0, max: 40, defaults: 30, name: "knee"
                        },
                        {
                            min: 0, max: 1, defaults: 0.003, name: "attack"
                        },
                        {
                            min: 0, max: 1, defaults: 0.025, name: "release"
                        },
                        {
                            min: 1, max: 20, defaults: 12, name: "ratio"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]
                },
                {
                    name: "Low pass filter",
                    class: Pizzicato.Effects.LowPassFilter,
                    props: [{
                            min: 10, max: 22050, defaults: 350, name: "frequency"
                        },
                        {
                            min: 0.0001, max: 1000, defaults: 1, name: "peak"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix "
                        }
                    ]
                },
                {
                    name: "High pass filter",
                    class: Pizzicato.Effects.HighPassFilter,
                    props: [{
                            min: 10, max: 22050, defaults: 350, name: "frequency"
                        },
                        {
                            min: 0.0001, max: 1000, defaults: 1, name: "peak"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]
                },
                {
                    name: "Stereo panner",
                    class: Pizzicato.Effects.StereoPanner,
                    props: [{
                            min: -1, max: 1, defaults: 0, name: "pan"
                        }
                    ]
                },
                {
                    name: "Tremolo",
                    class: Pizzicato.Effects.Tremolo,
                    props: [{
                            min: 0, max: 20, defaults: 4, name: "speed"
                        },
                        {
                            min: 0, max: 1, defaults: 1, name: "depth"
                        },
                        {
                            min: 0, max: 1, defaults: 0.5, name: "mix"
                        }
                    ]}
            ]);
            return deferred.promise;
        }
    }

})();
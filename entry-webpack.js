
/**
 * Vendors
 */
require("angular");
require("angular-animate");
require("bootstrap");
require('./node_modules/bootstrap/dist/css/bootstrap.css');
require("d3");
require("lodash");
require("./node_modules/ngprogress/build/ngProgress.js");
require("./node_modules/ngprogress/ngProgress.css");
require("./node_modules/pizzicato/distr/Pizzicato.js");
require("./lib/ng-knob.js");

/**
 * Custom scripts
 */
require("./js/main-module.js");
require("./js/services/common-services.js");
require("./js/services/common-filters.js");
require("./js/directives/filter/filter.directive.js");
require("./js/directives/filter-attributes/filter.attr.directive.js");
require("./js/directives/song/song.directive.js");

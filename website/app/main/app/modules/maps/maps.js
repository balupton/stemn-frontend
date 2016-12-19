angular.module('modules.maps', [
]);
angular.module('modules.maps').

directive('goToMap', function ($state) {
    return {
        restrict: 'A',
        scope: {
            location: '=', //{lat: XX, lng: XX}
            locationType: '@', //project||organisation
        },
        link: function(scope, element, attrs) {
            element.bind('click', function (e) {
                $state.go('app.map', {
                    type: scope.locationType,
                    c: scope.location.lat+':'+scope.location.lng+':20'
                })
            })
        }
    }
}).

service('MapService', function() {

});

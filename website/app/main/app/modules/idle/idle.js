angular.module('modules.idle', [
]);
angular.module('modules.idle').

/*****************************************************************
This module will emmit events when the app becomes active/inactive

$rootScope.$on('Idle.active', function() {
    console.log('active');
});

$rootScope.$on('Idle.active', function() {
    console.log('inactive');
});

*****************************************************************/
run(function(IdleService) {
    IdleService.watch();
}).

service('IdleService',function($timeout, $interval, $rootScope) {
    var service = this;
    var inactiveTime = 30*1000; // The number of seconds before the app is deemed inactive

    this.watch = watch;
    this.idleTimeout    = ''
    this.status  = 'active'; // active || inactive;
    this.newIdleTimeout = newIdleTimeout;


    service.newIdleTimeout(); // Initialise timeout
    ///////////////////////////////////////

    function newIdleTimeout(){
        service.idleTimeout = $timeout(function(){
            $rootScope.$broadcast('Idle.inactive');
            service.status = 'inactive';
        }, inactiveTime)
    }

    function watch(){
        var interrupt = 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll';
        angular.element(document.body).on(interrupt, function() {
            if(service.status == 'inactive'){
                $rootScope.$broadcast('Idle.active');
            }
            service.status = 'active';
            $timeout.cancel(service.idleTimeout);
            service.newIdleTimeout();
        });
    }
});


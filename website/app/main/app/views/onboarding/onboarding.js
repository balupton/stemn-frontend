angular.module('views.onboarding', [
    'views.onboarding.select',
    'views.onboarding.sync',
]);
angular.module('views.onboarding').

config(function ($stateProvider) {
    $stateProvider.
    state('app.onboarding', {
        url: '/onboarding',
        abstract: true,
        templateUrl: 'app/views/onboarding/tpls/onboarding.html',
        controller: 'OnboardingViewCtrl',
		authLevel: 'user', // Auth level does not seem to work on abstract states
        layout: {
            horizontalMenu: false,
            topBanner     : false,
            size          : 'md',
            bgColor       : 'rgba(0, 0, 0, 0.03)'
        },
    })
}).

controller('OnboardingViewCtrl', function ($scope, $state) {


});

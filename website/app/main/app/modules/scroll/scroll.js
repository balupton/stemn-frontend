angular.module('modules.scroll', [
    'duScroll',
]);
angular.module('modules.scroll').
value('duScrollOffset', 0).
value('duScrollGreedy', true).

run(function ($rootScope, $document) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        // Split the state.name to find substates, for example: app.user.projects
        var toStates = toState.name.split(".");
        var fromStates = fromState.name.split(".");
        // Page specific rules:
        if((toStates[1] === 'search') && (fromStates[1] === 'search')){
            // Do nothing
        }
        else{
            $document.scrollTopAnimated(0, 100);
        }
    });
}).

directive('smoothScrollToc', function($document) {

  return {
    link : function($scope, $element, $attr) {
      $element.on('click', function(e) {
        if((!$attr.href || $attr.href.indexOf('#') === -1) && $attr.smoothScrollToc === '') return;
        var id = $attr.href ? $attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1) : $attr.smoothScrollToc;
        var target = document.getElementById(id) || document.getElementsByName(id)[0];
        if(!target || !target.getBoundingClientRect) return;


				var offset = $element[0].getBoundingClientRect().top;
				$document.scrollToElement(target, offset, 500);

        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
      });
    }
  };
}).

directive('fixTopOrBottom', function ($window) {
    return {
        restrict: 'A',
		link: function(scope, element, attrs){
			var windowEl = angular.element($window);
            var checkIfFix = function () {
				if(element[0].offsetHeight<=$window.innerHeight){
					// If the sidebar height is less than window height
					// The sidebar is fixed at the top
					element.css({
						position : 'fixed',
						top      : '0px',
						bottom   : ''
					})
				}
				else if($window.innerHeight+windowEl.scrollTop()>=element[0].offsetHeight){
					// If the sidebar is greater than the window and we have scrolled past the bottom
					// We must fix sidebar at bottom
					element.css({
						position : 'fixed',
						top      : '',
						bottom   : '0px'
					})
				}
				else{
					// Else we are somwhere in between, sidebar scrolls with absolute
					element.css({
						position : 'absolute',
						top      : '0px',
						bottom   : ''
					})
				}
            }
            windowEl.on('scroll', scope.$apply.bind(scope, checkIfFix));
            checkIfFix();
		}
    };
}).

directive('scrollDown', function($window) {
    return {
        restrict: 'E',
        replace: true,
        template: '<a class="scroll-down"><md-icon md-svg-icon="expand-more"></md-icon></a>',
        link: function (scope, element, attrs) {
            var $body   = angular.element(document.body);
            var windowEl = angular.element($window);

            windowEl.on('scroll', onScroll);
            scope.$on('$destroy', onDestroy);
            onScroll();

            //////////////////////////////////////////////////

            function onScroll() {
				if(windowEl.scrollTop() === 0){
                    $body.removeClass('scrolled-past-top')
                }
                else{
                    $body.addClass('scrolled-past-top')
                }
            }

            function onDestroy() {
				windowEl.off('scroll', onScroll);
			}
        }
    };
});


angular.module('modules.compile', []);
angular.module('modules.compile').

directive('compileWatch', ['$compile', function ($compile) {
    // Compiles string (like ng-bing-html but runs directives)
    //
    // We pass in a scope as an attribute, the directive will then compile in this scope.
    //
    // http://stackoverflow.com/questions/
    // 17417607/angular-ng-bind-html-unsafe-and-directive-within-it
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compileWatch);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves

                // We compile scope or 'scope.$eval(attrs.scope)' which is the scope passed in as an attr.
                $compile(element.contents())( scope.$eval(attrs.scope) || scope );
            }
        );
    };
}]).
directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        var ensureCompileRunsOnce = scope.$watch(
            function(scope) {
            // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);

              // Use un-watch feature to ensure compilation happens only once.
              ensureCompileRunsOnce();
            }
        );
    };
}]);

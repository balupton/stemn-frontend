
angular.module('views.create', [
]);
angular.module('views.create').

config(function ($stateProvider) {
    $stateProvider.
    state('app.create', {
        url: '/create',
        abstract: true,
    }).
    state('app.create.something', {
        url: '',
        dialog: true, // when true, dialogs will not close on state load.
        onEnter: function(NewCreationsService, $state) {
            NewCreationsService.createModal().catch(function(response) {
                $state.go('app.home')
            });
        }
    }).
    state('app.create.project', {
        url: '/project',
        dialog: true, // when true, dialogs will not close on state load.
        onEnter: function(ProjectCreateModalService, $state) {
            ProjectCreateModalService.newProject().catch(function(response) {
                $state.go('app.home')
            });
        }
    }).
    state('app.create.question', {
        url: '/question',
        dialog: true, // when true, dialogs will not close on state load.
        onEnter: function(ThreadCreateModalService, $state) {
            ThreadCreateModalService.newThread(event, {type:'question'}).catch(function(response) {
                $state.go('app.home')
            });
        }
    }).
    state('app.create.general', {
        url: '/general',
        dialog: true, // when true, dialogs will not close on state load.
        onEnter: function(ThreadCreateModalService, $state) {
            ThreadCreateModalService.newThread(event, {type:'general'}).catch(function(response) {
                $state.go('app.home')
            });
        }
    }).
    state('app.create.blog', {
        url: '/blog',
        dialog: true, // when true, dialogs will not close on state load.
        onEnter: function(ThreadCreateModalService,$state) {
            ThreadCreateModalService.newThread(null,{type:'blog'}).catch(function(response) {
                $state.go('app.home')
            });
        }
    })
});

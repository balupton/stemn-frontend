angular.module('views.project.settings', [
]);

angular.module('views.project.settings').
config(function ($stateProvider) {
    $stateProvider.
    state('app.project.settings', {
        url: '/settings',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings.html',
        layout: {
            bgColor: 'rgba(0, 0, 0, 0.03)'
        },
        resolve: {
            userPermissions: function(userdata, project, PermissionsService, $stateParams){
                return PermissionsService.permissionRedirect({
                    userdata : userdata,
                    entity   : project,
                    level    : 'collaborator',
                    secret   : $stateParams.secret
                })
            },
        },
        seo: function(resolve){
            return {
                title       : 'Settings - ' + resolve.project.name + ' - STEMN',
            }
        },
        abstract: true,
        controller: 'ProjectSettingsViewCtrl'
    }).
    state('app.project.settings.options', {
        url: '',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings-options.html',
    }).
    state('app.project.settings.team', {
        url: '/team',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings-team.html',
    }).
    state('app.project.settings.tags', {
        url: '/tags',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings-tags.html',
    }).
    state('app.project.settings.sync', {
        url: '/sync',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings-sync.html',
        controller: 'ProjectSettingsSyncCtrl',
    }).
    state('app.project.settings.sections', {
        url: '/sections',
        templateUrl: 'app/views/project/project-settings/tpls/project-settings-sections.html',
        controller: 'ProjectSectionsSyncCtrl'
    })
}).

controller('ProjectSettingsSyncCtrl', function(SyncService, $scope){
    $scope.remoteLink    = remoteLink;
    $scope.remoteUnlink  = remoteUnlink;

    if($scope.project.remote.connected){
        initMeta();
    }

    ////////////////////////////

    function initMeta(){
        $scope.ownerInfo = {loading: true};
        SyncService.ownerInfo($scope.project.stub, '').then(function(response){
            $scope.ownerInfo.data    = response;
            $scope.ownerInfo.loading = false;
        })
        if($scope.project.remote.provider == 'drive'){
            SyncService.getPath($scope.project.remote.root.id, $scope.project.stub, '', true).then(function(response){
                var pathArray = _.map(response, 'name');
                pathArray.shift();
                $scope.project.remote.root.path = pathArray.join('/');
            })
        }
    }

    function remoteLink(event, provider){
        SyncService.remoteLink(event, $scope.project.stub, provider, $scope.project.name).then(function(response){
            _.extend($scope.project.remote, response.data);
            initMeta();
        })
    }
    function remoteUnlink(provider){
        SyncService.remoteUnlink($scope.project.stub, provider).then(function(response){
            $scope.project.remote = {};
        })
    }
}).
controller('ProjectSectionsSyncCtrl', function($scope){
    $scope.editorOptions = {
		realtime  : false,
		contained : true
	}
}).

controller('ProjectSettingsViewCtrl',function (project, $scope, $state, $timeout, HighlightElement, EntityService, LicenseData, SyncService, CoreLibrary, PublishService, ProjectService, $mdToast, Authentication, SocialModalService, $document) {
    $scope.project = project;
    $scope.forms = {};

	$scope.tabs = [
        {
            label: 'General',
            sref: 'app.project.settings.options'
        },{
            label: 'Project Details',
            sref: 'app.project.settings.sections',
        },{
            label: 'Tags',
            sref: 'app.project.settings.tags'
        },{
            label: 'Files & Sync',
            sref: 'app.project.settings.sync',
        },{
            label: 'Team & Permissions',
            sref: 'app.project.settings.team',
        },
	];

    $scope.deleteProject    = deleteProject; // function()
    $scope.saveProject      = saveProject; // function()
    $scope.backToProject    = backToProject; // function()
    $scope.publish          = publish; // function(event)

    // Secret Url
    newSecretUrl();
    if(!project.permissions.secret){newSecretUrl()}
    $scope.newSecretUrl = newSecretUrl;


    //////////////////////////////////

    function publish(event) {
        PublishService.selectStubModal(event, $scope.project).then(function(stub){
            $scope.project.stub    = stub;
            $scope.project.updated = Date.now();
            var projectCopy = _.clone($scope.project, true);
            projectCopy.published = true;
            ProjectService.updateProject(projectCopy).then(function(response){
                $scope.project.published = true;
                $mdToast.show(
                    $mdToast.simple().
                    content('Your project has been published. It will now be public.')
                );
                console.log(response);
                SocialModalService.sharePrompt(event, {entity:'project'}).then(function(){
                    $state.go('app.project.overview',{stub: stub})
                }).catch(function(){
                    $state.go('app.project.overview',{stub: stub})
                })
            })
        })
    }

    function newSecretUrl(){
        var secret = CoreLibrary.getUuid();
        $scope.project.permissions.secret = secret;
        $scope.secretUrl = location.origin + '/projects/' + project.stub + '?secret=' + secret;
        saveProject();
    }

    function saveProject(){
        return EntityService.update('project', $scope.project);
    }
    function backToProject(){
        $state.go('app.project.overview')
    }

    function deleteProject(){
        EntityService.remove('project', $scope.project._id).then(function(){
            $state.go('app.dashboard.projects')
        });
    }

});

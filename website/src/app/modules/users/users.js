import './users.scss';
import './users-permissions-edit/users-permissions-edit.js';

angular.module('modules.users', [
    'modules.authentication',
    'modules.users.permissions-edit'
]);

angular.module('modules.users').

directive('users', function () {
    return {
        restrict: 'E',
        scope: {
            parentType : '@?',
            parentId   : '@?',
            type       : '@?',
        },
        template: require('./tpls/users.html'),
        controller: function($scope, UserService) {

            var typeInfos = { // The keys match type inputs
                'topProjects'     : { title : 'Top Projects'},
                'topBloggers'     : { title : 'Top Bloggers'},
                'topContributors' : { title : 'Top Contributors'},
                'project'         : { title : 'Top Projects'},
            };
            $scope.typeInfo = typeInfos[$scope.type] || typeInfos.topProjects;

            $scope.users = [];
            var page = $scope.users.length ? 2 : 1;
            $scope.query = function () {
                UserService.getUsers({
                            page : page,
                            size : 5,
                            sort : 'numProjects'
                        }).then(function (users) {
                    $scope.users = _.union($scope.users, _.compact(_.map(users, function (user) {
                        if (user.blurb) {
                            return user;
                        }
                    })));
                });
                page++;
            };

            $scope.query();

        }
    }
}).


directive('userRows', function () {
    return {
        restrict: 'E',
        scope: {
            query : '=?',
            sort  : '=?',
            order : '=?',
            criteria : '=?'
        },
        template: require('./tpls/user-rows.html'),
        controller: function($scope, UserService, HttpQuery) {
            console.log($scope.criteria);
            $scope.query = HttpQuery({
                url       : 'api/v1/search',
                params    : {
                    type     : 'user',
                    select   : ['name', 'blurb', 'stub', 'numProjects', 'picture', 'followers'],
                    size     : 24,
                    order    : 'dsc',
                    sort     : $scope.sort,
                    criteria : $scope.criteria || {},
                }
            });

            // Filters
            $scope.orderFilter = {
                model:   $scope.sort,
                reverse: $scope.order == 'asc' ? true : false,
            };

            // init
            $scope.query.more();
        }
    }
}).


directive('usersGroups', function ($mdDialog, $timeout) {
    return {
        restrict: 'E',
        scope: {
            users      : '=',
            saveFn     : '&?',
            showEdit   : '=?',
            parent     : '=?', // the project object - used to pass into userSearch
            edit       : '=?', // true || false - change the edit status
            modalCallback : '&?' // Modal callback function

        },
        template: require('./tpls/users-groups.html'),
        controller: function($scope) {
            $scope.usersGroups = teamToGroups($scope.users);

            $scope.save = function(){
                $scope.users = groupsToTeam($scope.usersGroups);
                $timeout($scope.saveFn, 0);
            }
            $scope.$watch('usersGroups', function(){
                $scope.users = groupsToTeam($scope.usersGroups);
            }, true)

            $scope.userSortConfig = {
                group: 'users',
                animation: 150,
                handle: '.my-handle'
            };
            $scope.userGroupSortConfig = {
                animation: 150,
                handle: '.my-handle'
            };
            $scope.delete = function(group, index){
                group.splice(index, 1);
            }
            $scope.newGroup = function(){
                var emptyGroup = {
                    name    : '',
                    members : []
                };
                $scope.usersGroups.push(emptyGroup);
            }

            // If empty, add an empty group
            if($scope.users.length === 0){
                $scope.newGroup();
            }

            // adds a 'people groups' data structure onto the project that is a mapping
            // of the back end's flat team structure so a front end style group structure
            function teamToGroups(team) {

                var original = {
                    project : {
                        team : [{
                            _id : 'ObjectId',
                            role : 'String',
                            owner : 'Boolean',
                            group : 'String'
                        }]
                    }
                };

                var target = {
                    project : {
                        usersGroups : [{
                            name : 'String',
                            members : [{
                                _id : 'ObjectId',
                                role : 'String',
                                owner : 'Boolean'
                            }]
                        }]
                    }
                };

                var usersGroups = [];

                // take the flat team representation and put them into arrays of groups
                team.forEach(function(member) {
                    var group = _.find(usersGroups, { name : member.group });
                    // if there's no group for the given user group, create it
                    if (!group) {
                        group = {
                            name : member.group,
                            members : []
                        };
                        usersGroups.push(group);
                    }
                    group.members.push(member);
                });

                return usersGroups;
            }

            // maps the front end generated people groups field back to
            // the back end format of th team field for the project
            function groupsToTeam(usersGroups) {

                var original = {
                    project : {
                        usersGroups : [{
                            name : 'String',
                            members : [{
                                _id : 'ObjectId',
                                role : 'String',
                                owner : 'Boolean'
                            }]
                        }]
                    }
                };

                var target = {
                    project : {
                        team : [{
                            _id : 'ObjectId',
                            role : 'String',
                            owner : 'Boolean',
                            group : 'String'
                        }]
                    }
                };

                var newTeam = [];

                // take the peopleGroup as the true correct data, and rebuild the team from this data
                usersGroups.forEach(function(group) {
                    group.members.forEach(function(member) {
                        member.group = group.name;
                        newTeam.push(member);
                    });
                });

                return newTeam;
            }
        }
    }
}).

directive('emptyGroup', function () {
    return {
        restrict: 'E',
        scope: {
            deleteFn : '&?'
        },
        template: require('./tpls/empty-group.html'),
    }
}).

directive('addRow', function () {
    return {
        restrict: 'E',
        scope: {
            addFn : '&?'
        },
        template: require('./tpls/add-row.html'),
    }
}).

directive('personcard', function () {
    return {
        restrict: 'E',
        scope: {
            id   : '@?',
            size : '@',
            user : '=?'
        },
        template: require('./tpls/personcard.html'),
        controller: function ($scope, Authentication, UserService) {
            setBanner();
            if ($scope.id) {
                // Initiate Loading class
                $scope.loading = true;
                UserService.getUser($scope.id, 'md').then(function (user) {
                    $scope.user = user;
                    setBanner();
                    // Set loading to false when user has loaded
                    $scope.loading = false
                });
            }

            function setBanner(){
                // Set defaults
                if($scope.user && !$scope.user.profile.banner.url){
                    $scope.alternateBanner = 'assets/images/banners/space'+$scope.user.profile.banner.gradient+'.jpg'
                }
            }
        }
    };
}).

directive('userRowDetailed', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            userId   : '@?',
            user     : '=?',
            showEdit : '=?',
            buttonText : '@',
            buttonHref : '@',
            job        : '=?'
        },
        template: require('./tpls/user-row-detailed.html'),
        controller: function ($scope, UserService) {
			if($scope.userId){
                $scope.loading = true;
				UserService.getUser($scope.userId, 'lg').then(function (user) {
					$scope.user = user;
                    $scope.loading = false;
				});
			}
            $scope.itemLimit = 2;
            $scope.raiseLimit = function(){
                $scope.itemLimit = 100;
            }
        }
    };
}).


directive('userIcon', function () {
    return {
        restrict: 'E',
        scope: {
            userId : '@?',
            user   : '=?',
        },
        template: require('./tpls/user-icon.html'),
        controller: function ($scope, Authentication, UserService) {
			if($scope.userId){
				UserService.getUser($scope.userId, 'sm').then(function (user) {
					$scope.user = user;
				});
			}
        }
    };
}).

service('UsersModalService', function($mdDialog) {
    var service = this;
    this.usersNew = function (event, data) {
        return $mdDialog.show({
            template: require('./tpls/users-new-modal.html'),
            controller: 'UsersNewModalCtrl',
            clickOutsideToClose: true,
            targetEvent: event,
            locals : {
                data  : data,
            }
        })
    }
}).

controller('UsersNewModalCtrl', function (data, $scope, $mdDialog, OrganisationService, $http, $mdToast, Authentication, InviteService) {
    $scope.data = angular.copy(data);

    InviteService.generateInviteCode({
        parentType : data.parentType,
        parentId   : data.parentId,
    }).then(function(result){
        $scope.inviteId = result.data._id;
    })

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.invite = function () {
        if($scope.NewUserForm.$valid){
            $http.post('/api/v1/mail/invite/project', {
                email      : $scope.data.email,
                parentType : $scope.data.parentType,
                name       : $scope.data.name,
                inviteId   : $scope.inviteId,
                role       : $scope.role,
                group      : $scope.data.group
            }).success(function () {
                $mdToast.show(
                    $mdToast.simple().
                    content('Great stuff... '+$scope.data.name+' was invited to your '+$scope.data.parentType)
                );
                $mdDialog.hide();
            });
        }
    };

}).

service('UserService', function($http, HttpService, LocalCache, $rootScope) {

	this.getUser     = getUser;     // function(id, select, fresh)
	this.getUserOrgs = getUserOrgs; // function(id)
    this.getUsers    = getUsers;    // function(data)
    this.updateUser  = updateUser;  // function(user)

    var endpoint     = 'user';

	///////////////////////////////////

    function getUserOrgs(id){
        return  $http({
            url: '/api/v1/users/'+id+'/organisations',
            method: "GET",
        })
    }

	function getUser(stubOrId, select, fresh) {

        // Default the selectFields
        var selectFields
        if(select == 'sm'){
            selectFields = ['stub', 'name', 'picture', 'blurb'];
        } else if (select == 'md'){
            selectFields = ['stub', 'name', 'picture', 'blurb', 'profile.banner', 'followers', 'numProjects' ];
        } else{
            selectFields = ['*'];
            select = 'lg'
        }

        var getPromise = function(data){
            // data - [asfasffsa, asfafsasfasf] - Array of user ids
            return HttpService({
                url: '/api/v1/users',
                method: "GET",
                params: {
                    'select[]' : selectFields,
                    'ids[]'  : data,
                }
            });
        };
        return LocalCache.getPackaged(endpoint+select, stubOrId, getPromise, fresh)
	}

	function getUsers(data) {
      console.log('GET USERS', data);
    }
	function updateUser(user) {
		// Save to local cache
		LocalCache.save(endpoint+'lg', user);
        analytics.track('Profile Save');
        return HttpService({
            url    : '/api/v1/users/'+user._id,
            method : "PUT",
            data   : user
        }).then(function () {
            $rootScope.$broadcast('user.save', user);
        })
    }
});









































angular.module('modules.referrals', [
    'ngStorage'
]);
angular.module('modules.referrals').

service('ReferralsService', function ($stateParams, $state, $location, $localStorage) {

	this.setRefCode = setRefCode; // function()
	this.getRefCode = getRefCode; // function()

	//////////////////////////////////////////////

	function setRefCode(){
		// Clear out some query params from $location;
		if($stateParams.ref){
			$state.current.reloadOnSearch = false;
			$location.search('ref', null);
			// Set to memory
            $localStorage.refCode = $stateParams.ref;
		}
	}
	function getRefCode(){
		return $localStorage.refCode
	}
});

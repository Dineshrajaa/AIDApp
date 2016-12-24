angular.module('aid.services', [])

.service('DonorsSvc',function($http){
	this.getDonorsList=function(){
		return $http.get(localStorage.wsURL+"donors");
	}
})
angular.module('aid.services', [])

.service('DonorsSvc',function($http){
	this.getDonorsList=function(){
		return $http.get(localStorage.wsURL+"donors");
	}
	this.storeDonor=function(donorObj){
		return $http.post(localStorage.wsURL+"donors",donorObj);
	}
	this.buildDonorObj=function(donorObj){
		var formattedDonor={};
		formattedDonor.fname=donorObj.fname;
		formattedDonor.lname=donorObj.lname;
		formattedDonor.pmobile=donorObj.pmobile;
		formattedDonor.smobile=donorObj.smobile;
		formattedDonor.bloodGroup=donorObj.bloodGroup;
		formattedDonor.age=donorObj.age;
		formattedDonor.habits={};
		formattedDonor.habits.alcohol=donorObj.drinker;
		formattedDonor.habits.smoker=donorObj.smoker;
		formattedDonor.conditions={};
		formattedDonor.conditions.bp=donorObj.bp;
		formattedDonor.conditions.sugar=donorObj.sugar;
		formattedDonor.conditions.surgery=donorObj.surgery;
		formattedDonor.weight=donorObj.weight;
		formattedDonor.address=donorObj.address;
		console.log("formattedDonor:"+angular.toJson(formattedDonor));
		return formattedDonor;
	}
})
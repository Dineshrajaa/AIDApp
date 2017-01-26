angular.module('aid.services', [])

.service('DonorsSvc', function($http) {
    this.getDonorsList = function() {
        return $http.get(localStorage.wsURL + "donors");
    }
    this.storeDonor = function(donorObj) {
        return $http.post(localStorage.wsURL + "donors", donorObj);
    }
    this.buildDonorObj = function(donorObj) {
        var formattedDonor = {};
        formattedDonor.fname = donorObj.fname;
        formattedDonor.lname = donorObj.lname;
        formattedDonor.pmobile = donorObj.pmobile;
        formattedDonor.smobile = donorObj.smobile;
        formattedDonor.bloodGroup = donorObj.bloodGroup;
        formattedDonor.age = donorObj.age;
        formattedDonor.gender = donorObj.gender;
        formattedDonor.habits = {};
        formattedDonor.habits.alcohol = donorObj.drinker;
        formattedDonor.habits.smoker = donorObj.smoker;
        formattedDonor.conditions = {};
        formattedDonor.conditions.bp = donorObj.bp;
        formattedDonor.conditions.sugar = donorObj.sugar;
        formattedDonor.conditions.surgery = donorObj.surgery;
        formattedDonor.weight = donorObj.weight;
        formattedDonor.address = donorObj.address;
        formattedDonor.district = donorObj.district;
        formattedDonor.state = donorObj.stateName;
        // formattedDonor.country = donorObj.country;
        console.log("formattedDonor:" + angular.toJson(formattedDonor));
        return formattedDonor;
    }
    this.getAppInfo=function(){
        return $http.get(localStorage.wsURL + "appinfo");
    }
})

.service('GenericSvc', function($ionicLoading,$http) {
    this.showLoader = function(msg) {
        /*Show loader*/
        $ionicLoading.show({
            template: msg
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
    }
    this.hideLoader = function() {
        /*Hide loader*/
        $ionicLoading.hide().then(function() {
            console.log("The loading indicator is now hidden");
        });
    }
    this.showToast = function(msg) {
        /*Customized Toast Message*/
        window.plugins.toast.showWithOptions({
            message: msg,
            duration: "short", // 2000 ms
            position: "bottom",
            styling: {
                opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                backgroundColor: '#d66625', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF'
            }
        });
    }

    this.getStateList=function(){
        /*To get the list of Indian states*/
        return $http.get("https://www.whizapi.com/api/v2/util/ui/in/indian-states-list?project-app-key=58xah1b6ksiuys5p12xr9sjl");
        
    }
    this.getDistrictList=function(stateId){
        /*To get the list of Districts of the selected State*/
        return $http.get("https://www.whizapi.com/api/v2/util/ui/in/indian-city-by-state?stateid="+stateId+"&project-app-key=58xah1b6ksiuys5p12xr9sjl");
    }
})

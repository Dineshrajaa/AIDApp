angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, $ionicFilterBar, DonorsSvc, GenericSvc) {
    $scope.myOrder = 'weight';
    $scope.myFilter={};
    $scope.myFilter.district=$scope.selectedDistrict;
    $scope.bloodList = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    $scope.fetchStates = function() {
        // Method to get the list of Indian states
        GenericSvc.showLoader('Processing form');
        GenericSvc.getStateList().then(function(res) {
            $scope.statesList = res.data.Data;
            console.warn($scope.statesList);
        }, function(err) {
            GenericSvc.showToast('Unable to get states');
        }).finally(function() {            
            GenericSvc.hideLoader();
            $scope.fetchAppInfo();
        });
    };

    $scope.fetchDistricts = function(selectedState) {
        // Method to get the list of Districts from the selected state
        GenericSvc.showLoader('Fetching Cities');
        GenericSvc.getDistrictList(selectedState).then(function(res) {
            $scope.districtsList = res.data.Data;
            console.warn($scope.districtsList);
        }, function(err) {
            GenericSvc.showToast('Unable to get cities');
        }).finally(function() {
            GenericSvc.hideLoader();
        });
    };
    $scope.resetFilter=function(filterName){
        // Method to reset the filter
        switch(filterName){
            case 'blood':
                $scope.myFilter.bloodGroup="";
                break;
            case 'state':
                $scope.myFilter.state="";
                break;

        }
    };
    $scope.getSelectedState=function(newValue){
        // Method to get the selected state
        $scope.myFilter.state=newValue.Name;
        console.warn($scope.myFilter.state);
        $scope.fetchDistricts(newValue.ID);
    };
    $scope.getSelectedBloodGroup=function(newValue){
        // Method to get the selected blood group
        $scope.myFilter.bloodGroup=newValue;
    };
    $scope.fetchDonorsList = function() {
        // Method to get the list of donors
        GenericSvc.showLoader('Fetching Donors');
        DonorsSvc.getDonorsList().then(function(res) {
            $scope.fetchedDonors = res.data;
            console.warn($scope.fetchedDonors);
        }, function(err) {
            GenericSvc.showToast('Unable to fetch Donors list');
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            GenericSvc.hideLoader();
            $scope.fetchStates();
        });
    };
    $scope.fetchAppInfo=function(){
        // Method to get the app info to share with users
        GenericSvc.showLoader('Fetching App info');
        DonorsSvc.getAppInfo().then(function(res) {
            $scope.appInfo = res.data;
            console.warn($scope.appInfo);
        }, function(err) {
            GenericSvc.showToast('Unable to fetch app info');
        }).finally(function() {
            // Stop the spinning
            GenericSvc.hideLoader();
        });        
    };

    $scope.shareAppInfo=function(){
        // Method to share the app info with friends in social media
        window.plugins.socialsharing.share($scope.appInfo[0].appName, null, null, $scope.appInfo[0].appURL);
    };

    $scope.setSortCriteria = function(criteria) {
        // Method to set sort criteria
        $scope.myOrder = criteria;
    };
    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.fetchedDonors,
            update: function(filteredItems, filterText) {
                $scope.fetchedDonors = filteredItems;
                if (filterText) {
                    console.log(filterText);
                }
            }
        });
    };
    
    $scope.fetchDonorsList();
})

.controller('AddDonorCtrl', function($scope, $state, DonorsSvc, GenericSvc) {
    // $scope.bloodList=[{bg:'A+'},{bg:'B+'},{bg:'AB+'},{bg:'O+'},{bg:'A-'},{bg:'B-'},{bg:'AB-'},{bg:'O-'}];
    $scope.bloodList = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    $scope.validations = {};
    $scope.validations.textonly = '^[a-zA-Z]+$';
    $scope.donorObj = {};
    $scope.donorObj.bloodGroup = 'A+';
    $scope.addDonor = function() {
        // Method to add donor
        if (!$scope.donorObj.agree) {
            GenericSvc.showToast('Please agree our rules to register');
            return;
        }
        GenericSvc.showLoader('Adding Donor');
        DonorsSvc.storeDonor(DonorsSvc.buildDonorObj($scope.donorObj)).then(function(res) {
            localStorage.firstRun = "false";
            $state.go('donorslist');
        }, function(err) {
            GenericSvc.showToast('Unable to add Donor');
        }).finally(function() {
            GenericSvc.hideLoader();
        });
    };
    $scope.resetForm = function() {
        // Method to reset the add donor form
        $scope.donorObj = {};
    };
    $scope.fetchStates = function() {
        // Method to get the list of Indian states
        GenericSvc.showLoader('Processing form');
        GenericSvc.getStateList().then(function(res) {
            $scope.statesList = res.data.Data;
            console.warn($scope.statesList);
        }, function(err) {
            GenericSvc.showToast('Unable to get states');
        }).finally(function() {
            GenericSvc.hideLoader();
        });
    };
    $scope.findSelectedName=function(stateID){
        // Method to find selected name
        angular.forEach($scope.statesList,function(value,key){
            // console.warn("Value.ID:"+value.ID+"Value.Name:"+value.Name);
            if(value.ID==stateID){
                $scope.donorObj.stateName=value.Name;
            }
        })
    };
    $scope.fetchDistricts = function() {
        // Method to get the list of Districts from the selected state
        $scope.findSelectedName($scope.donorObj.state);
        GenericSvc.showLoader('Fetching Cities');
        GenericSvc.getDistrictList($scope.donorObj.state).then(function(res) {
            $scope.districtsList = res.data.Data;
            console.warn($scope.districtsList);
        }, function(err) {
            GenericSvc.showToast('Unable to get cities');
        }).finally(function() {
            GenericSvc.hideLoader();
        });
    };

    $scope.fetchStates();
})

.controller('InitialCtrl', function($scope) {
    $scope.markFirstRun = function() {
        // Method to mark 
        // localStorage.firstRun="false";
    }
})

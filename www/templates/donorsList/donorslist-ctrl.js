angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, $ionicFilterBar,  DonorsSvc, GenericSvc) {
    $scope.myOrder = 'weight';
    $scope.bloodList = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    $scope.fetchDonorsList = function() {
        // Method to get the list of donors
        GenericSvc.showLoader('Fetching Donors');
        DonorsSvc.getDonorsList().then(function(res) {
            $scope.fetchedDonors = res.data;
        }, function(err) {
            GenericSvc.showToast('Unable to fetch Donors list');
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            GenericSvc.hideLoader();
        });
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
    /*$scope.$on("$ionicView.enter", function(event, data) {
        // handle event
        console.warn("View entered");
        
    });*/
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
    $scope.fetchStates=function(){
        // Method to get the list of Indian states
        GenericSvc.showLoader('Processing form');
        GenericSvc.getStateList().then(function(res){
            $scope.statesList=res.data.Data;
            console.warn($scope.statesList);
        },function(err) {
            GenericSvc.showToast('Unable to get states');
        }).finally(function() {
            GenericSvc.hideLoader();
        });
    }
    $scope.fetchStates();
})

.controller('InitialCtrl', function($scope) {
    $scope.markFirstRun = function() {
        // Method to mark 
        // localStorage.firstRun="false";
    }
})

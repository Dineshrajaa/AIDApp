angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, $ionicFilterBar, DonorsSvc, GenericSvc) {

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
    $scope.bloodList=['A+','B+','AB+','O+','A-','B-','AB-','O-'];
    $scope.donorObj = {};
    $scope.donorObj.bloodGroup='A+';
    $scope.addDonor = function() {
        // Method to add donor
        GenericSvc.showLoader('Adding Donor');
        DonorsSvc.storeDonor(DonorsSvc.buildDonorObj($scope.donorObj)).then(function(res) {
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
})

.controller('InitialCtrl',function($scope){
    $scope.markFirstRun=function(){
        // Method to mark 
        localStorage.firstRun="false";
    }
})

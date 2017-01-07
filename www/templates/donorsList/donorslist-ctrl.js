angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, $ionicFilterBar, DonorsSvc,GenericSvc) {
    $scope.donorObj = {};
    $scope.fetchDonorsList = function() {
        // Method to get the list of donors
        GenericSvc.showLoader('Fetching Donors');
        DonorsSvc.getDonorsList().then(function(res) {
            console.warn(JSON.stringify(res));
            $scope.fetchedDonors = res.data;

        }, function(err) {
            console.warn(JSON.stringify(err));
        }).finally(function() {
            // Stop the ion-refresher from spinning
            console.log("Load complete");
            $scope.$broadcast('scroll.refreshComplete');
            GenericSvc.hideLoader();
        });
    };
    $scope.fetchDonorsList();
    $scope.addDonor = function() {
        // Method to add donor
        GenericSvc.showLoader('Adding Donor');
        DonorsSvc.storeDonor(DonorsSvc.buildDonorObj($scope.donorObj)).then(function(res) {
            console.warn(JSON.stringify(res));
        }, function(err) {
            console.warn(JSON.stringify(err));
        }).finally(function() {
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
});

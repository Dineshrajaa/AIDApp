angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, $ionicFilterBar,DonorsSvc) {
    $scope.donorObj = {};
    $scope.fetchDonorsList = function() {
        // Method to get the list of donors
        DonorsSvc.getDonorsList().then(function(res) {
            console.warn(JSON.stringify(res));
            $scope.fetchedDonors = res.data;
        }, function(err) {
            console.warn(JSON.stringify(err));
        });
    }
    $scope.fetchDonorsList();
    $scope.addDonor = function() {
        // Method to add donor       
        DonorsSvc.storeDonor(DonorsSvc.buildDonorObj($scope.donorObj)).then(function(res) {
            console.warn(JSON.stringify(res));
        }, function(err) {
            console.warn(JSON.stringify(err));
        });
    }
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
})

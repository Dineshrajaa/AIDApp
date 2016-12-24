angular.module('aid.controllers', ['aid.services'])

.controller('DonorListCtrl', function($scope, DonorsSvc) {
    $scope.fetchDonorsList = function() {
        DonorsSvc.getDonorsList().then(function(res) {
            console.warn(JSON.stringify(res));
            $scope.fetchedDonors=res.data;
        }, function(err) {
            console.warn(JSON.stringify(err));
        });
    }
    $scope.fetchDonorsList();
})

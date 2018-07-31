var app = angular.module('app',[])
app.controller('cntrl',['$scope','$http','getData','$timeout', function($scope,$http,getData,$timeout){
    
    //getData.update('burgerData.json', 'GET').then(function(data){
    getData.update('http://demo1395624.mockable.io/', 'GET').then(function(data){
        $scope.menuList= data.data;
        console.log($scope.menuList);
    });
    $scope.cartArray = [];
    $scope.cartTotalPrice = 0;
    $scope.searchText = "";
    $scope.notifyFlag = false;
    $scope.StarFliter="";
    
    $scope.cart = function(itemIndex){
        $scope.notifyFlag = false;
        $scope.cartArray.push($scope.menuList[itemIndex]);
        $scope.cartTotalPrice = Number($scope.cartTotalPrice) + Number($scope.menuList[itemIndex].product.price);
        console.log($scope.cartArray);
    }
    $scope.orderNotifiction = function(){
        $scope.notifyFlag = true;
        $timeout(function () {
            $scope.notifyFlag = false;
        }, 5000);
    }
    
    $scope.fnfilter = function(data){
        debugger;
        $scope.StarFliter="";
        $scope.ingredients = "";
        if(data == "5star"){
            $scope.StarFliter="5star";
        }
        else if (data== "3star"){
            $scope.StarFliter="3star";
        }
        else if(data=='Potato Onions'){
            $scope.ingredients = 'Potato';
        }
    }
    
}]);


app.factory("getData",["$http","$q", function($http, $q) {
    return {
        update: function(httpUrl, methodC, postbody) {
            var deferred = $q.defer();
            $http({
                    url: httpUrl,
                    method: methodC,
                    data: postbody
                }).success(function(response) {
                        deferred.resolve(response);// success
                }).error(function(response) { // optional
                       deferred.reject(); // failed
                    });
            return deferred.promise;
        }
    }

}]);
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function(){
	    $http.get('/contactlist').success(function(response){
	    	console.log("i got requested data");
	    	$scope.contactlist = response;	
	    	$scope.contact = "";
	    });
	};
	refresh();
    $scope.addContact = function(){
    	console.log($scope.contact);
    	$http.post('/contactlist',$scope.contact).success(function(response){
    		console.log(response);
    		refresh();
    	});
    };
    $scope.remove=function(id){
    	console.log(id);
    	$http.delete('/contactlist/' +id).success(function(responce){
    		refresh();
    	})
    }
    $scope.edit=function(id){
    	console.log(id);
    	$http.get('/contactlist/' +id).success(function(response){
    		$scope.contact=response;
    	});
    }
    $scope.update=function(){
    	console.log($scope.contact._id);
    	$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function(response){
    		refresh();
    	});
    };
    /*person1 = {
		name: 'Ashu',
		email: 'a@g.com',
		number: '234567890'
	};
	person2 = {
		name: 'Ank',
		email: 'ank@g.com',
		number: '8754234565'
	};
	person3 = {
		name: 'Pri',
		email: 'p@g.com',
		number: '123456806q'
	};

	var contactlist =[person1, person2, person3];
		$scope.contactlist= contactlist;*/

}]);

	
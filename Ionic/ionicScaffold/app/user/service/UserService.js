app.factory('UserService',['$scope','$resource',function($scope,$resource){
	return $resource(
  		'http://192.168.1.183:8080/vine/:module/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            },
            getCode: {
                method: 'POST'
            },
            checkCode: {
                method: 'POST'
            },
            check: {
                method: 'POST'
            }

        }
    );
}])

var app = angular.module('starter', ['ionic', 'oc.lazyLoad', 'ngResource', 'ngStorage'])

.run(['$ionicPlatform', '$rootScope', '$state', '$ionicPopup', '$localStorage', '$ionicHistory', function($ionicPlatform, $rootScope, $state, $ionicPopup, $localStorage, $ionicHistory) {
	
	/*
	 *
	 * 路由监听
	 * 
	 * */
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams, $localStorage) {
			
		});

	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}])

.config(['$stateProvider', '$ionicConfigProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
	function($stateProvider, $ionicConfigProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service = $provide.service;
		app.constant = $provide.constant;
		app.value = $provide.value;
		$stateProvider
			.state('tab', {
				url: '/tab',
				abstract: true,
				templateUrl: 'app/core/view/tabs.html',
				controller: 'RootCtrl'
			})
			.state('tab.dash', {
				url: '/dash',
				cache: false,
				views: {
					'': {
						templateUrl: 'app/dash/view/dash.html',
						controller: 'DashCtrl',
						resolve: loadSequence('DashArgs')
					}
				}
			})
			.state('tab.user', {
				url: '/dash',
				cache: false,
				views: {
					'': {
						templateUrl: 'app/user/view/user.html',
						controller: 'UserCtrl',
						resolve: loadSequence('UserArgs')
					}
				}
			});

		$urlRouterProvider.otherwise('/tab/dash');

		function loadSequence() {
			var _args = arguments;
			var viewArgs = repeatArgs(_args[0]);
			//先匹配模块的，没有再匹配单文件的
			if(viewArgs) {
				_args = viewArgs
			} else {
				//console.log("没有找到模块?")
			}

			function repeatArgs(name) {
				return jsRequires.ViewArgs[name];
			}

			return {
				deps: ['$ocLazyLoad', '$q',
					function($ocLL, $q) {
						var promise = $q.when(1);
						for(var i = 0, len = _args.length; i < len; i++) {
							promise = promiseThen(_args[i]);
						}
						return promise;

						function promiseThen(_arg) {
							if(typeof _arg == 'function')
								return promise.then(_arg);
							else
								return promise.then(function() {
									var nowLoad = requiredData(_arg);
									if(!nowLoad)
										return console.log('找不到文件 [' + _arg + ']');
									return $ocLL.load(nowLoad);
								});
						}

						function requiredData(name) {
							if(jsRequires.modules)
								for(var m in jsRequires.modules)
									if(jsRequires.modules[m].name && jsRequires.modules[m].name === name)
										return jsRequires.modules[m];
							return jsRequires.scripts && jsRequires.scripts[name];
						}
					}
				]
			};
		}
	}
]).controller('RootCtrl', ['$scope', '$state', function($scope, $state) {
	$(".yxm-tab li").off("click").on("click",function(){
		var _this = $(this);
		_this.addClass("active").siblings().removeClass("active");
		$state.go(_this.attr("name"));
	})
}]);
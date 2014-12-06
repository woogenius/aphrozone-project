'use strict';

angular.module('aphroZone', ['ngRoute', 'aphroZone.controllers', 'aphroZone.filters', 'aphroZone.directives']).config(['$routeProvider', function ($routeProvider) {

		$routeProvider.when('/', {templateUrl: 'partial/login.html', controller: 'LoginPageCtrl'});
		$routeProvider.when('/main', {templateUrl: 'partial/main.html', controller: 'MainPageCtrl'});

		// member
		$routeProvider.when('/member', {templateUrl: 'partial/member/main.html'});
		$routeProvider.when('/member/join', {templateUrl: 'partial/member/join.html', controller: 'MemberJoinCtrl'});
		$routeProvider.when('/member/info', {templateUrl: 'partial/member/info.html', controller: 'MemberInfoCtrl', directive: 'checklistModel'});
		$routeProvider.when('/member/possible', {templateUrl: 'partial/member/possible.html', controller: 'MemberBuyCtrl'});
		$routeProvider.when('/member/sms', {templateUrl: 'partial/member/sms.html', controller: 'MemberSmsCtrl'});
		$routeProvider.when('/member/detail/:mno', {templateUrl: 'partial/member/detail.html', controller: 'MemberDetailCtrl'});
		$routeProvider.when('/member/detail/:mno/line', {templateUrl: 'partial/member/line.html', controller: 'MemberDetailCtrl'});
		$routeProvider.when('/member/detail/:mno/grade', {templateUrl: 'partial/member/grade.html', controller: 'MemberDetailCtrl'});

		// saleman
		$routeProvider.when('/sales', {templateUrl: 'partial/salesman/main.html'});
		$routeProvider.when('/sales/join', {templateUrl: 'partial/salesman/join.html', controller: 'SalesJoinCtrl'});
		$routeProvider.when('/sales/info', {templateUrl: 'partial/salesman/info.html', controller: 'SalesInfoCtrl'});
		$routeProvider.when('/sales/possible', {templateUrl: 'partial/salesman/possible.html'});
		$routeProvider.when('/sales/sms', {templateUrl: 'partial/salesman/sms.html'});
		$routeProvider.when('/sales/incentive', {templateUrl: 'partial/salesman/incentive.html'});
		$routeProvider.when('/sales/bom', {templateUrl: 'partial/salesman/bom.html', controller: 'SalesBomCtrl'});
		$routeProvider.when('/sales/approval', {templateUrl: 'partial/salesman/approval.html', controller: 'SalesApprovalCtrl'});
		$routeProvider.when('/sales/demotion', {templateUrl: 'partial/salesman/demotion.html', controller: 'SalesDemotionCtrl'});

    	// product
    	$routeProvider.when('/product', {templateUrl: 'partial/product/main.html'});
		$routeProvider.when('/product/list', {templateUrl: 'partial/product/list.html', controller: 'ProductListCtrl'});
		$routeProvider.when('/product/sell', {templateUrl: 'partial/product/sell.html', controller: 'ProductSellCtrl'});

		// stat
		$routeProvider.when('/stats/location', {templateUrl: 'partial/stats/location.html', controller: 'StatsLocationCtrl'});
		$routeProvider.when('/stats/product', {templateUrl: 'partial/stats/product.html', controller: 'StatsProductCtrl'});
		$routeProvider.when('/stats/age', {templateUrl: 'partial/stats/age.html', controller: 'StatsAgeCtrl'});
		
    	$routeProvider.otherwise({redirectTo: '/'});
	}]);


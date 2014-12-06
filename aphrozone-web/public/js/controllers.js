'use strict';

angular.module('aphroZone.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.go = function(path){
          $location.url(path);
        }
    }])

    .controller('MemberInfoCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
      $http.get('/member/info').success(function(data) {
        $scope.memberInfos = data;
        $scope.currentPage = 0;
        $scope.pageSize = 20;
      });

      $scope.setSelected = function() {
        $location.url('/member/detail/'+this.memberInfo.mno);
        console.log($scope.selected);
      };

      $scope.phonenoList = [];
      $scope.message = "-APHRO ZONE-";

      $scope.isCheckAll = false;

      $scope.checkAll = function (isCheckAll) {
        $("input[type='checkbox']").each(function () {
          $(this).prop('checked', isCheckAll);
        });
      };

      $scope.sendMessage = function () {
        for (var i = 0; i < $scope.phonenoList.length; i++) {
          $http({
            method: 'POST',
            url: '/sendMessage',
            data: "phoneno="+$scope.phonenoList[i]+"&message="+$scope.message,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        };
        alert("메세지가"+$scope.phonenoList.length+"건 발송되었습니다.");
      }


    }])

    .controller('MemberBuyCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/member/buy').success(function(data) {
        $scope.memberBuys = data;
        $scope.currentPage = 0;
        $scope.pageSize = 20;
      })
    }])

    .controller('MemberSmsCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/messageList').success(function(data) {
        $scope.smsList = data;
      })
    }])

    .controller('MainPageCtrl', ['$scope', '$http', function ($scope, $http) {

    }])

    .controller('StatsLocationCtrl', ['$scope', '$http', function ($scope, $http) { 
      $http.get('/stats/location').success(function(data) {
        $scope.datas = data;
      });
    }])

    .controller('StatsAgeCtrl', ['$scope', '$http', function ($scope, $http) { 
      $http.get('/stats/age').success(function(data) {
        $scope.datas = data;
      });
    }])

    .controller('StatsProductCtrl', ['$scope', '$http', function ($scope, $http) { 
      $http.get('/stats/product').success(function(data) {
        $scope.datas = data;
      });
    }])


    .controller('LoginPageCtrl', ['$scope', '$location', function ($scope, $location) {
      $('div.navbar').hide();
      $scope.submit = function() {
        if ($scope.id=="admin" & $scope.pw=="admin") {
          $('div.navbar').show();
          $location.url("/main");
        } else{
          $('div.alert').show();
        };
      }
    }])

    .controller('MemberJoinCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
      $scope.submit = function () {
        var data = $('form').serialize();
        console.log(data);
        $http({
          method: 'POST',
          url: '/member/join',
          data: data,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then (function (res) {
          console.log(res);
          alert("회원가입이 완료되었습니다.");
          $location.url('/member/info');
        });
      }
    }])

    .controller('MemberDetailCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
      var mno = $routeParams.mno;
      $scope.mno = mno;
      $scope.recommendline = [];
      $http.get('/member/detail/'+mno).success(function(data) {
        $scope.data = data[0];
        console.log(data);
      });

      $http.get('/member/detail/'+mno+'/usualline').success(function(data) {
        $scope.usualline = data;
        $http.get('/member/detail/getline/'+data[0].pname).success(function(data) {
          $scope.recommendline.push(data[0]);
        });
        $http.get('/member/detail/getline/'+data[1].pname).success(function(data) {
          $scope.recommendline.push(data[0]);
        });
        $http.get('/member/detail/getline/'+data[2].pname).success(function(data) {
          $scope.recommendline.push(data[0]);
        });
      });

      $http.get('/member/detail/'+mno+'/rescentline').success(function(data) {
        $scope.rescentline = data;
        console.log(data);
      });
    }])

    .controller('SalesJoinCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/member/info').success(function(data) {
        $scope.memberInfos = data;
        $scope.currentPage = 0;
        $scope.pageSize = 20;
      });
    }])

    .controller('SalesInfoCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/sales/info').success(function(data) {
        $scope.salesInfos = data;
      });
    }])

    .controller('SalesApprovalCtrl', ['$scope', '$http', function ($scope, $http) {

    }])

    .controller('SalesBomCtrl', ['$scope', '$http', function ($scope, $http) {
    $(document).ready(function() {
        $('.tree').treegrid({
                    expanderExpandedClass: 'glyphicon glyphicon-minus',
                    expanderCollapsedClass: 'glyphicon glyphicon-plus'
                });
    });
    }])

    .controller('SalesDemotionCtrl', ['$scope', '$http', function ($scope, $http) {

    }])


    .controller('ProductListCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/product/list').success(function(data) {
        $scope.products = data;
      })
    }])

    .controller('ProductSellCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/product/list').success(function(data) {
        $scope.products = data;
      })

      $scope.sellProduct = function () {
        console.log(sell);
      }


    }])

    .run( function($rootScope, $location) {
    $rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(a){  
      $('ul.nav>li').removeClass('active');
      if (a!='/') {
        $("ul.nav>li#"+a.split('/')[1]).addClass('active');
      };
    })
});

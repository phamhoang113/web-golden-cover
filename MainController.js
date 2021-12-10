var app = angular.module("myApp", []);


app.controller('MainController', function ($scope, $http) {
    var accessToken = "";
    var user_id="";
    $scope.login=false;
    $scope.userName = "";
    $scope.passWord = "";
    $scope.name = "HĐ";
    $scope.re=false;
    $scope.accessKey=false;
    $scope.displayMain = 'none';
    $scope.displayDetail = 'none';
    $scope.displayRegister='none';
    $scope.displayMainPage = 'none';
    $scope.displayLogin = 'block';
    $scope.displayInfor = 'none';
    $scope.displayCart = 'none';
    $scope.displayLoading = 'none';
    $scope.recommends=[];
    $scope.page=1;
    $scope.pages=[];
    $scope.quantityCart=0;
    var list_products=[];
    $scope.total=0;
    var category="";
    $scope.listCart=[];
    init();
    //init function
    function init() {
        $scope.userName = "";
        $scope.passWord = "";
        $scope.displayMain = 'none';
        $scope.displayDetail = 'none';
        $scope.displayRegister='none';
        $scope.displayMainPage = 'none';
        $scope.displayLogin = 'block';
        $scope.displayInfor = 'none';
        $scope.displayCart = 'none';
        $scope.displayLoading = 'none';
        $scope.login=false;
        $scope.page=1;
        $scope.pages=[];
        $scope.recommends=[];
        $scope.accessKey=false;
        $scope.quantityCart=0;
        list_products=[];
        $scope.total=0;
        category="";
        $scope.listCart=[];
        $scope.recommends=[];
        $scope.re=false;
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    //login function
    $scope.Login = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8000/api/login/',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "email": $scope.userName,
                "password": $scope.passWord
            }
        }).then(function success(response) {
            // this function will be called when the request is success
            accessToken = "Bearer " + response.data.tokens.access;
            var decoded = parseJwt(response.data.tokens.access);
            user_id=decoded.user_id;

            $http({
                method: 'GET',
                url: 'http://localhost:8000/api/mainpage/?page='+$scope.page,
                headers: {
                    "accept": "application/json",
                    "Authorization": accessToken
                }
            }).then(function success(response) {
                // this function will be called when the request is success
                $scope.products = response.data.list_product;
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.products[i].discount = $scope.products[i].original_price - $scope.products[i].price;
                }
            //     $scope.recommends=response.data.recommend_product;
            // $scope.recommends.length=5;
            // for (var i = 0; i < $scope.recommends.length; i++) {
            //     $scope.recommends[i].discount = $scope.recommends[i].original_price - $scope.recommends[i].price;
            // }
                $scope.pages.push("<<");
                $scope.pages.push(1);
                $scope.pages.push(2);
                $scope.pages.push(3);
                $scope.pages.push(4);
                $scope.pages.push(5);
                $scope.pages.push(6);
                $scope.pages.push(7);
                $scope.pages.push(8);
                $scope.pages.push(9);
                $scope.pages.push(10);
                $scope.pages.push(">>");

            }, function error(response) {
                // this function will be called when the request returned error status
                alert("fail");
            });
        }, function error(response) {
            // this function will be called when the request returned error status
            alert("Incorrect username or password!!!!!!");
        });
        showLoading(3);
        $scope.accessKey=true;
        $scope.displayMain = 'block';
        $scope.displayDetail = 'none';
        $scope.displayRegister='none';
        $scope.displayMainPage = 'block';
        $scope.displayLogin = 'none';
        $scope.displayInfor = 'none';
        $scope.displayCart = 'none';
    }
    $scope.detail = function (id) {
        showLoading(1);
        for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.products[i].id == id) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/product/',
                    headers: {
                        "accept": "application/json",
                        "Authorization": accessToken
                    },
                    params: {"product_id":id}
                }).then(function success(response) {
                    // this function will be called when the request is success
                    
                    $scope.product_detail=response.data;
                    if($scope.product_detail.information[0].images.length >3){
                        var buff=[];
                        for(var i=0;i<3;i++){
                            buff.push($scope.product_detail.information[0].images[i])
                        }
                        $scope.product_detail.information[0].images=buff;
                    }
                    $scope.image_main=$scope.product_detail.information[0].images[0].small_url;
                    $scope.list_rating=[];
                    if($scope.product_detail.rating_average>0&&$scope.product_detail.rating_average<1){
                        if($scope.product_detail.rating_average>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>1&&$scope.product_detail.rating_average<2){
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-1>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>2&&$scope.product_detail.rating_average<3){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-2>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>3&&$scope.product_detail.rating_average<4){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-3>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>4&&$scope.product_detail.rating_average<5){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-4>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                    }
                    else{
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                    }
                }, function error(response) {
                    // this function will be called when the request returned error status
                    alert("fail");
                });
                $scope.quantity = 1;
                $scope.list_rating = [];
                var index = 0;
                while (index < $scope.products[i].rating_average) {
                    $scope.list_rating.push(1);
                    index += 1;
                }
                $scope.displayDetail = 'block';
                $scope.displayMain = 'none';

            }
        }
    }


    $scope.detailRe = function (id) {
        showLoading(1);
        for (var i = 0; i < $scope.recommends.length; i++) {
            if ($scope.recommends[i].id == id) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/product/',
                    headers: {
                        "accept": "application/json",
                        "Authorization": accessToken
                    },
                    params: {"product_id":id}
                }).then(function success(response) {
                    // this function will be called when the request is success
                    
                    $scope.product_detail=response.data;
                    if($scope.product_detail.information[0].images.length >3){
                        var buff=[];
                        for(var i=0;i<3;i++){
                            buff.push($scope.product_detail.information[0].images[i])
                        }
                        $scope.product_detail.information[0].images=buff;
                    }
                    $scope.image_main=$scope.product_detail.information[0].images[0].small_url;
                    $scope.list_rating=[];
                    if($scope.product_detail.rating_average>0&&$scope.product_detail.rating_average<1){
                        if($scope.product_detail.rating_average>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>1&&$scope.product_detail.rating_average<2){
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-1>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>2&&$scope.product_detail.rating_average<3){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-2>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>3&&$scope.product_detail.rating_average<4){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-3>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                        $scope.list_rating.push(0);
                    }
                    else if($scope.product_detail.rating_average>4&&$scope.product_detail.rating_average<5){
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        if($scope.product_detail.rating_average-4>=0.5){
                            $scope.list_rating.push(0.5);
                        }
                        else{
                            $scope.list_rating.push(0);
                        }
                    }
                    else{
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                        $scope.list_rating.push(1);
                    }
                }, function error(response) {
                    // this function will be called when the request returned error status
                    alert("fail");
                });
                $scope.quantity = 1;
                $scope.displayDetail = 'block';
                $scope.displayMain = 'none';

            }
        }
    }


    $scope.minus = function () {
        if ($scope.quantity > 1) {
            $scope.quantity -= 1;
        }
    }
    $scope.plus = function () {
        if ($scope.quantity < 10) {
            $scope.quantity += 1;
        }
    }

    $scope.changeImage = function (image) {
        $scope.image_main = image;
    }
    $scope.gotoCart=function(){
        $scope.listCart=[];
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/cart/',
            headers: {
                "accept": "application/json",
                "Authorization": accessToken
            }
        }).then(function success(response) {
            var res=response.data;
            $scope.total=response.data.total_price;
            for(var i=0;i<res.products.length;i++){
                var q=res.products[i].quantity;
                var _id=res.products[i].id;
                $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/product/',
                    headers: {
                        "accept": "application/json",
                        "Authorization": accessToken
                    },
                    params: {"product_id":res.products[i].id}
                }).then(function success(resp) {
                    $scope.listCart.push({
                        "id":_id,
                        "image":resp.data.thumbnail_url,
                        "name":resp.data.name,
                        "quantity":q,
                        "price":resp.data.price,
                        "total":q*resp.data.price
                    });
                 }, function error(resp) {
                    // this function will be called when the request returned error status
                    alert("fail");
                });
            }
        }, function error(response) {
            // this function will be called when the request returned error status
            alert("fail");
        });
        showLoading(2);
        $scope.displayMain = 'none';
        $scope.displayDetail = 'none';
        $scope.displayRegister='none';
        $scope.displayMainPage = 'none';
        $scope.displayLogin = 'none';
        $scope.displayInfor = 'none';
        $scope.displayCart = 'block';

    }
    $scope.changePage=function (page) {
        if(page=="<<"){
            if($scope.page>1){
                $scope.page-=1;
            }
        }
        else if(page==">>"){
            if($scope.page<10){
                $scope.page+=1;
            }
        }
        else{
            $scope.page=page;
        }
        loadPage();
    }
    function loadPage() {
        showLoading(1);
        $scope.re=true;
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/mainpage/?page='+$scope.page,
            headers: {
                "accept": "application/json",
                "Authorization": accessToken
            }
        }).then(function success(response) {
            // this function will be called when the request is success
            $scope.products = response.data.list_product;
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].discount = $scope.products[i].original_price - $scope.products[i].price;
            }
            $scope.recommends=response.data.recommend_product;
            $scope.recommends.length=5;
        }, function error(response) {
            // this function will be called when the request returned error status
            alert("fail");
        });
        $scope.displayMain = 'block';
        $scope.displayDetail = 'none';
        $scope.displayMainPage = 'block';
        $scope.displayRegister = 'none';
        $scope.displayLogin = 'none';

    }
    $scope.gotoInfor=function(){
        $scope.displayMain = 'none';
        $scope.displayDetail = 'none';
        $scope.displayRegister='none';
        $scope.displayMainPage = 'none';
        $scope.displayLogin = 'none';
        $scope.displayInfor = 'block';
        $scope.displayCart = 'none';
    }
    $scope.back=function(){
        if($scope.accessKey){
            $scope.displayMain = 'block';
            $scope.displayDetail = 'none';
            $scope.displayRegister='none';
            $scope.displayMainPage = 'block';
            $scope.displayLogin = 'none';
            $scope.displayInfor = 'none';
            $scope.displayCart = 'none';
        }
        else{
            $scope.displayRegister='none';
            $scope.displayMainPage = 'none';
            $scope.displayLogin = 'block';
            $scope.displayInfor = 'none';
            $scope.displayCart = 'none';
        }
    }

    $scope.gotoRegister=function(){
        $scope.displayRegister='block';
        $scope.displayMainPage = 'none';
        $scope.displayLogin = 'none';
    }
    $scope.addtoCart=function(id,quantity,type){
        showLoading(2);
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/product/',
            headers: {
                "accept": "application/json",
                "Authorization": accessToken
            },
            params: {"product_id":id}
        }).then(function success(response) {
            // this function will be called when the request is success
            var p=response.data;
            var exist=false;
            for(var i=0;i<list_products.length;i++){
                if(list_products[i].id==id){
                    exist=true;
                    list_products[i].quantity+=quantity;
                    $scope.total+=quantity*p.price;
                    break;
                }
            }
            if(!exist){
                list_products.push({"id":id,"quantity":quantity})
                $scope.total+=quantity*p.price;
            }
            category=[p.information[0].categories[p.information[0].categories.length-1]];
            $http({
                method: 'POST',
                url: 'http://localhost:8000/api/cart/',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
                data: {
                        "command": "modify",
                        "products": list_products,
                        "total_price": $scope.total,
                        "categories": category,
                        "user_id": user_id
                }
            }).then(function success(response) {
                $scope.quantityCart=list_products.length;
            }, function error(response) {
                // this function will be called when the request returned error status
                alert("fail!!!!!!");
            });
        }, function error(response) {
            // this function will be called when the request returned error status
            alert("fail");
        });
        if(type==1)
            loadPage();
    }
    $scope.singOut=function(){
        init();
    }
    $scope.signUp=function(){
        if($scope.passRegister!=$scope.retrypassRegister){
            $scope.passRegister="";
            $scope.retrypassRegister="";
            alert("Nhập lại mật khẩu không đúng");
        }
        else if($scope.passRegister==""){
            alert("Vui lòng nhập mật khẩu!!!");
        }
        else{
            $http({method: 'POST',
            url: 'http://localhost:8000/api/register/',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "email": $scope.emailRegister,
                "username":$scope.userRegister,
                "password": $scope.passRegister
            }
        }).then(function success(response) {
                // this function will be called when the request is success
                $scope.displayRegister='none';
                $scope.displayMainPage = 'none';
                $scope.displayLogin = 'block';
                alert("Đăng kí thành công");
            }, function error(response) {
                // this function will be called when the request returned error status
                alert("Đăng kí thất bại");
            });
        }
    }
    $scope.removeItem=function(item){
        var lst=[];
        for(var i=0;i<list_products.length;i++){
            if(list_products[i].id==item.id){
                $scope.total-=item.total;
            }
            else{
                lst.push(list_products[i]);
            }
        }
        list_products=lst;
        $http({
            method: 'POST',
            url: 'http://localhost:8000/api/cart/',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": accessToken
            },
            data: {
                    "command": "modify",
                    "products": list_products,
                    "total_price": $scope.total,
                    "categories": category,
                    "user_id": user_id
            }
        }).then(function success(response) {
            $scope.quantityCart=list_products.length;
        }, function error(response) {
            // this function will be called when the request returned error status
            alert("fail!!!!!!");
        });
        
        wa();
        
    }
    function wa(){
        $scope.displayLoading="block";
        setTimeout(function(){  $scope.displayLoading="none";$scope.gotoCart(); }, 3000);
    }
    function showLoading(t){   
        $scope.displayLoading="block";
        setTimeout(function(){  $scope.displayLoading="none"; }, t*1000);

    }
});





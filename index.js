var app = angular.module('app', []);

app.controller('loadController', ['$scope', '$http', function ($scope, $http) {
    $scope.a = [];
    $scope.bookmarks = 0;
    $scope.bookmark_lg_array = [];
    
    // HTTP Get REST Api
    $scope.loadAPI = function() {
        $http.get('https://capillary.0x10.info/api/books?type=json&query=list_books').then(function(data){
            $scope.book_list = data.data;
            $scope.selectedBook = $scope.book_list.books[0];
            $scope.bookCount = $scope.book_list.books.length;
        });
    };
    
    // Bookmarking an book
    $scope.bookmark_lg = function(index_bookmark_lg){
        if($scope.bookmark_lg_array[index_bookmark_lg] === undefined){
            $scope.bookmark_lg_array[index_bookmark_lg] = true;
            $scope.bookmarks += 1;
        } else {
            $scope.bookmark_lg_array[index_bookmark_lg] = !$scope.bookmark_lg_array[index_bookmark_lg];
            if($scope.bookmark_lg_array[index_bookmark_lg] === false){
                $scope.bookmarks -= 1;
            } else {
                $scope.bookmarks += 1;
            }
        }
    }
    
    // Book collapsible for Small Devices
    $scope.bookDescription = function(index){
        if($scope.a[index] === undefined){
            $scope.a[index] = true;
        } else {
            $scope.a[index] = !$scope.a[index];
        }
    }
    
    // Calling API
    $scope.loadAPI();
    
    // Changing Book description on Hover
    $scope.thumbnailHover = function(bookId) {
        $scope.bookId = bookId;
        $scope.book_list.books.forEach(function(a) {
            if(a.id === bookId)
                $scope.selectedBook = a;
        })
    }
}]);
var urlGet = '/api/company';
var urlPut = '/api/company/put';

app.controller('controller', ['$scope', '$http', 'validation', 'notify', function ($scope, $http, validation, notify) {
    $scope.data = {};
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: "GET"
        }).then(function success(response) {
            notify.spinerHide();
            $scope.data = response.data;
            if ($scope.data.Logo !== null)
                $("#img-logo").attr("src", $scope.data.Logo);
            if ($scope.data.Image !== null)
                $("#img-gallery").attr("src", $scope.data.Image);
            if ($scope.data.Favicon !== null)
                $("#img-favicon").attr("src", $scope.data.Favicon);
            $("#Logo").val($scope.data.Logo);
            $("#Gallery").val($scope.data.Image);
            $("#Favicon").val($scope.data.Favicon);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();

    $scope.Put = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            $scope.data.Logo = $("#Logo").val();
            $scope.data.Image = $("#Gallery").val();
            $scope.data.Favicon = $("#Favicon").val();
            $http({
                url: urlPut,
                method: "POST",
                data: $scope.data
            }).then(function success(response) {
                notify.spinerHide();
                $scope.data.CompanyId = response.data;
                notify.success("Cập nhật thành công");
            }, function error(response) {
                notify.spinerHide();
                notify.error(response.data.Message);
            });
        }
    };
}]);
var urlGetCruises = '/api/cruise/get-all';
var urlGet = '/api/cabinprice/get';
var urlDetail = '/api/cabinprice/detail';
var urlPut = '/api/cabinprice/put';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _cruiseId: -1
    };
    $scope.currentTab = 1;
    $scope.CruiseTourTypeId = '';
    $scope.data = {};

    $scope.gridOptions = {
        paginationPageSizes: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
        paginationPageSize: 100,
        useExternalPagination: true,
        exporterCsvFilename: 'file.csv',
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'file.xlsx',
        exporterExcelSheetName: 'Sheet1',
        enableFiltering: false,
        useExternalFiltering: false,
        columnDefs: [],
        rowHeight: 32,
        i18n: 'vi',
        showGridFooter: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi2 = gridApi;
            $scope.gridApi2.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.filters._pageNumber = newPage;
                $scope.filters._pageSize = pageSize;
                $scope.Get();
            });
        },
        exporterMenuCsv: true,
        enableGridMenu: true
    };
    $scope.gridOptions.columnDefs = [
        {
            displayName: "Tên cabin",
            name: 'CabinName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Tàu",
            name: 'CruiseName',
            width: '*',
            minWidth: 150,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "SL người lớn",
            name: 'MaxPeople',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự",
            name: 'Index',
            width: 120,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Trạng thái cập nhật",
            name: 'Status',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateUpdate('CabinId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.GetCruises = function () {
        $http({
            url: urlGetCruises,
            method: 'GET'
        }).then(function success(response) {
            $scope.cruises = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetCruises();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.cabins;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _cabinId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data;
            $scope.dataDetail = data.cabinDetail;
            $scope.dataPrice = data.cabinPriceDetail;
            $scope.countPerson = data.countPerson;
            $scope.setDataDetail(data);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.setDataDetail = function (data) {
        
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.Put = function () {
        notify.spinerShow();
        $http({
            url: urlPut,
            method: "POST",
            data: $scope.data
        }).then(function success(response) {
            notify.spinerHide();
            $scope.closeWindow();
            notify.success("Cập nhật thành công");
            $scope.Get();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
}]);
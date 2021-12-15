var urlGet = '/api/booktour/get';
var urlDetail = '/api/booktour/detail';
var urlDelete = '/api/booktour/delete';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
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
            displayName: "Mã",
            name: 'JourneyCode',
            width: 120,
            pinnedLeft: true
        },
        {
            displayName: "Tên tour",
            name: 'TourName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Tên khách",
            name: 'FullName',
            width: '*',
            minWidth: 120
        },
        {
            displayName: "Người lớn",
            name: 'Adult',
            width: 100
        },
        {
            displayName: "Trẻ em",
            name: 'Child',
            width: 100
        },
        {
            displayName: "Sơ sinh",
            name: 'Infant',
            width: 100
        },
        {
            displayName: "Tổng tiền",
            name: 'TotalPrice',
            cellFilter: 'currency: "":"0"',
            width: 100
        },
        {
            displayName: "Ngày đặt",
            name: 'BookDate',
            cellFilter: 'date: "dd-MM-yyyy HH:mm"',
            width: 150
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateActionMethodView('TourBookId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.booktours;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showDetail = function (_id) {
        $scope.isAdd = false;
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _tourBookId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            $scope.data = response.data;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _tourSellId: $scope.menuIdChoose
            }
        }).then(function success(response) {
            notify.spinerHide();
            notify.success("Xóa thành công");
            $scope.Get();
            UIkit.modal("#modalConfirm").tryhide();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
}]);
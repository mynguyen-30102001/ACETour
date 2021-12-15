var urlGetContact = '/api/require/get';
var urlDeleteContact = '/api/require/delete';
var urlDetailContact = '/api/require/detail';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.filterMenu = {
        _menuParent1: '',
        _parentMenuId: ''
    };


    $scope.data = {};
    $scope.currentTab = 1;
    $scope.isAdd = true;
    $scope.menuForArea = [];
    $scope.menuForDestination = [];

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
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
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
            displayName: "Mã Liên Hệ",
            name: 'RequireId',
            width: 120,
            pinnedLeft: true
        },
        {
            displayName: "Họ Tên",
            name: 'FullName',
            width: 200,
            minWidth: 100
        },

        {
            displayName: "Số điện thoại",
            name: 'Phone',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Địa chỉ",
            name: 'Address',
            width: 200,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Giới tính",
            name: 'Gender',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },

        {
            displayName: "Email",
            name: 'Email',
            width: "*",
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#", 
            cellTemplate: template.templateActionMethodView('RequireId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];

    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGetContact,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.contact;
            $scope.gridOptions.totalItems = data.totalRecord;

        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };

    $scope.Get();

    $scope.showDetail = function (_id) {
        notify.spinerShow();
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerHide();

        $http({
            url: urlDetailContact,
            method: 'GET',
            params: {
                id: _id
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
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDeleteContact,
            method: 'DELETE',
            params: { id: $scope.menuIdChoose }
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

    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };

    $scope.showRelatedPost = function () {
        UIkit.modal("#modalRelatePost").show();
    };

}]);
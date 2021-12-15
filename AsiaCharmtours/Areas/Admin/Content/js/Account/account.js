var urlGetRole = '/api/account/get-role';
var urlGet = '/api/account/get';
var urlPost = '/api/account/post';
var urlDetail = '/api/account/detail';
var urlPut = '/api/account/put';
var urlDelete = '/api/account/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', 'helper', '$timeout', function ($scope, $http, template, validation, notify, helper, $timeout) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.checkAllScreen = false;
    $scope.checkAllAction = false;
    $scope.data = {};
    $scope.isAdd = true;
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
            displayName: "Tên tài khoản",
            name: 'UserName',
            width: 200,
            pinnedLeft: true
        },
        {
            displayName: "Họ tên",
            name: 'PropertyName',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Email",
            name: 'Email',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Đăng nhập gần nhất",
            name: 'LastLoginDate',
            cellFilter: 'date: "dd/MM/yyyy HH:mm"',
            width: 180,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Trạng thái",
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
            cellTemplate: template.templateActionMethod('UserName'),
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
            $scope.gridOptions.data = data.accounts;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.GetRole = function () {
        $http({
            url: urlGetRole,
            method: 'GET'
        }).then(function success(response) {
            $scope.roles = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetRole();
    $scope.showAdd = function () {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = true;
        $scope.data = {
            UserName: '',
            PropertyName: '',
            Password: '',
            RePassword: '',
            Email: '',
            RoleId: '',
            Status: true,
            Screens: [],
            Paths: []
        };
        helper.changeSwitchery($('#switch_status'), true);
        $scope.checkAllScreen = true;
        $scope.checkAllAction = true;
        $scope.changeAllScreen(true);
        $scope.changeAllAction(true);
    };

    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = false;
        $scope.checkAllScreen = false;
        $scope.checkAllAction = false;
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _userName: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.account;
            $scope.data.Password = "";
            $scope.data.RePassword = "";
            var screens = data.screens;
            var paths = data.paths;
            $scope.roles.screens.forEach(x => {
                if (screens.findIndex(y => y.ScreenId == x.ScreenId) >= 0)
                    x.Checked = true;
                else
                    x.Checked = false;
            });
            $scope.roles.paths.forEach(x => {
                if (paths.findIndex(y => y.PathId == x.PathId) >= 0)
                    x.Checked = true;
                else
                    x.Checked = false;
            });
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            if ($scope.data.Password !== $scope.data.RePassword) {
                alert('Mật khẩu nhập lại không khớp');
                return;
            }
            notify.spinerShow();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.Screens = [];
            $scope.roles.screens.forEach(x => {
                if (x.Checked) {
                    $scope.data.Screens.push(x.ScreenId);
                }
            });
            $scope.data.Paths = [];
            $scope.roles.paths.forEach(x => {
                if (x.Checked) {
                    $scope.data.Paths.push(x.PathId);
                }
            });
            $http({
                url: urlPost,
                method: "POST",
                data: $scope.data
            }).then(function success(response) {
                notify.spinerHide();
                $scope.closeWindow();
                notify.success("Thêm mới thành công");
                $scope.Get();
            }, function error(response) {
                notify.spinerHide();
                notify.error(response.data.Message);
            });
        }
    };
    $scope.Put = function () {
        if (validation.checkRequired()) {
            if ($scope.data.Password !== $scope.data.RePassword) {
                alert('Mật khẩu nhập lại không khớp');
                return;
            }
            notify.spinerShow();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.Screens = [];
            $scope.roles.screens.forEach(x => {
                if (x.Checked) {
                    $scope.data.Screens.push(x.ScreenId);
                }
            });
            $scope.data.Paths = [];
            $scope.roles.paths.forEach(x => {
                if (x.Checked) {
                    $scope.data.Paths.push(x.PathId);
                }
            });
            $http({
                url: urlPut,
                method: "POST",
                data: $scope.data
            }).then(function success(response) {
                notify.spinerHide();
                $scope.closeWindow();
                notify.success("Thêm mới thành công");
                $scope.Get();
            }, function error(response) {
                notify.spinerHide();
                notify.error(response.data.Message);
            });
        }
    }
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
                _userName: $scope.menuIdChoose
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
    $scope.changeAllScreen = function (value) {
        $scope.roles.screens.forEach(x => {
            x.Checked = value;
        });
    };
    $scope.changeAllAction = function (value) {
        $scope.roles.paths.forEach(x => {
            x.Checked = value;
        });
    };
}]);
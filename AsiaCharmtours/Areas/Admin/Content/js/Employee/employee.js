var urlGetAllMenu = '/api/menu/get-all';
var urlGet = '/api/employee/get';
var urlPost = '/api/employee/post';
var urlDetail = '/api/employee/detail';
var urlPut = '/api/employee/put';
var urlDelete = '/api/employee/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', 'helper', function ($scope, $http, template, validation, notify, helper) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100
    };
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
        rowHeight: 50,
        i18n: 'fr',
        showGridFooter: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.filters.pageNumber = newPage;
                $scope.filters.pageSize = pageSize;
                $scope.Get();
            });
        },
        exporterMenuCsv: true,
        enableGridMenu: true
    };
    $scope.gridOptions.columnDefs = [
        {
            displayName: "Tên NV",
            name: 'FullName',
            width: '*',
            minWidth: 100,
            pinnedLeft: true
        },
        {
            displayName: "Chức vụ",
            name: 'Position',
            width: 150,
            headerCellClass: 'text-center-grid'
        },

        {
            displayName: "Hình ảnh",
            name: "Image",
            width: 200,
            cellTemplate: template.templateImage('Image', 'FullName'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Email",
            name: 'Email',
            width: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Phone",
            name: 'Phone',
            width: 150,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự",
            name: 'Index',
            width: 100,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Trạng thái",
            name: 'Status',
            width: 100,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 150,
            field: "#",
            cellTemplate: template.templateActionMethod('EmployeeId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.GetAllMenu = function () {
        $http({
            url: urlGetAllMenu,
            method: 'GET'
        }).then(function success(response) {
            $scope.menus = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetAllMenu();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.employee;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();

    $scope.showAdd = function () {
        $scope.isAdd = true;
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.data = {
            FullName: '', 
            Phone: '',
            Index: 0
        };
        //CKEDITOR.instances.Description.setData("");
        CKEDITOR.instances.Description.setData("");
        helper.changeSwitchery($('#switch_status'), true);
        helper.changeRadio($('#customSelectMenu'), true);
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
    };
    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = false;
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _employeeId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.employee;
            $("#Logo").val($scope.data.Image);
            $("#img-logo").attr("src", $scope.data.Image);
            //CKEDITOR.instances.Description.setData($scope.data.Description);
            CKEDITOR.instances.Description.setData($scope.data.Description);
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
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
    $scope.addSliderTab = function () {
        $scope.data.W_SliderTab.push({
            Image: $("#Gallery").val()
        });
    };
    $scope.removeSliderTab = function (index) {
        $scope.data.W_SliderTab.splice(index, 1);
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            var dataPost = JSON.parse(JSON.stringify($scope.data));
            dataPost.Image = $("#Logo").val();
            dataPost.Status = $('#switch_status').is(':checked');
            dataPost.Description = CKEDITOR.instances.Description.getData();
            $http({
                url: urlPost,
                method: "POST",
                data: dataPost
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
            notify.spinerShow();
            $scope.data.Image = $("#Logo").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.Description = CKEDITOR.instances.Description.getData();
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
    };
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _employeeId: $scope.menuIdChoose
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
var urlGetAllMenu = '/api/menu/get-all-menu-article';
var urlGet = '/api/partner/get';
var urlPost = '/api/partner/post';
var urlDetail = '/api/partner/detail';
var urlPut = '/api/partner/put';
var urlDelete = '/api/partner/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', function ($scope, $http, template, validation, notify) {
    $scope.filters = {
        pageNumber: 1,
        pageSize: 100,
    };
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
            displayName: "Tiêu đề",
            name: 'Title',
            width: '*',
            minWidth: 200,
            pinnedLeft: true
        },
        {
            displayName: "Hình ảnh",
            name: "Image",
            pinnedLeft: true,
            width: '*',
            minWidth: 200,
            cellTemplate: template.templateImage('Image', 'Title'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Đường Link",
            name: 'Link',
            width: 250,
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự",
            name: 'Index',
            width: 120,
            cellClass: 'line-height-grid text-center-grid',
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
            cellTemplate: template.templateActionMethod('PartnerId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'line-height-grid text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];

    $scope.Get = function () {
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {

            var data = response.data;
            $scope.gridOptions.data = data.partners;
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
        helper.changeSwitchery($('#switch_status'), true);
        $scope.data = {
            Title: '',
            Link: '',
            Index: 0
        };
        CKEDITOR.instances.Description.setData("");
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
    };

    $scope.Post = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            var dataPost = JSON.parse(JSON.stringify($scope.data))
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

    $scope.showDetail = function (_id) {
        debugger
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = false;
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _partnerId: _id
            }
        }).then(function success(response) {
            
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.partenr;
            $("#Logo").val($scope.data.Image);
            $("#img-logo").attr("src", $scope.data.Image);
            CKEDITOR.instances.Description.setData($scope.data.Description);
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
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

    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };

    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _partnerId: $scope.menuIdChoose
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
    $scope.showRelatedPost = function () {
        UIkit.modal("#modalRelatePost").show();
    };
    $scope.Get();
}]);
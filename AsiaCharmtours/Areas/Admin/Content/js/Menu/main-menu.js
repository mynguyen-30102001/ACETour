var urlGetMenuType = '/api/menu/get-menutype';
var urlGet = '/api/menu/get-main';
var urlPost = '/api/menu/post-main';
var urlDetail = '/api/menu/detail';
var urlPut = '/api/menu/put';
var urlDelete = '/api/menu/delete';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.data = {
        MenuParentId: '',
        MenuTypeId: '',
        Index: 0
    };
    $scope.currentTab = 1;
    $scope.menuTypes = [];
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
            displayName: "Tiêu đề",
            name: 'MenuName',
            width: '*',
            minWidth: 200,
            pinnedLeft: true
        },
        {
            displayName: "Kiểu hiển thị",
            name: 'MenuTypeName',
            width: 300,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự hiển thị",
            name: 'Index',
            width: 200,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Hiển thị",
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
            cellTemplate: template.templateActionMethod('MenuId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    // lấy danh sách dữ liệu
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.menus = data.menus;
            $scope.gridOptions.data = data.menus;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    // lấy danh sách kiểu hiển thị
    $scope.GetMenuType = function () {
        $http({
            url: urlGetMenuType,
            method: 'GET'
        }).then(function (response) {
            $scope.menuTypes = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetMenuType();

    $scope.showDetailMenuTab = function (tab) {
        $(".fake-btn-type1").removeClass('checked');
        $(".fake-btn-type1-" + tab._key).addClass('checked');
        $scope.currentTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabToEditor(tab.Content);
        }, 100);
    };
    $scope.saveTourTab = function () {
        var tab = $scope.data.FakeMenuTab.find(x => x._key === $scope.currentTab);
        tab.Content = CKEDITOR.instances.Description.getData();
    };

    $scope.bindingContentTabToEditor = function (content) {
        CKEDITOR.instances.Description.setData(content);
    };

    $scope.showAdd = function () {
        $scope.currentTab = 1;
        $scope.isAdd = true;
        $scope.data = {
            MenuParentId: '',
            MenuTypeId: '',
            Index: 0,
            FakeMenuTab: [{
                _key: 1,
                Content: ''
            }, {
                _key: 2,
                Content: ''
            },
            {
                _key: 3,
                Content: ''
            }, {
                _key: 4,
                Content: ''
            }],
        };

        CKEDITOR.instances.Description.setData("");
        CKEDITOR.instances.Content.setData("");

        $timeout(function () {
            $scope.showDetailMenuTab($scope.data.FakeMenuTab[0]);
        }, 200);

        $("#Logo").val("/FileDefault/img-default.gif");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
        $("#Logo2").val("/FileDefault/img-default.gif");
        $("#img-logo2").attr("src", "/FileDefault/img-default.gif");
        $("#Logo3").val("/FileDefault/img-default.gif");
        $("#img-logo3").attr("src", "/FileDefault/img-default.gif");
        $("#kUI_window").data("kendoWindow").maximize().open();
        helper.changeSwitchery($('#switch_status'), true);
        helper.changeSwitchery($('#switch_menutop'), false);
        helper.changeSwitchery($('#switch_menubottom'), false);
        helper.changeSwitchery($('#switch_highlight'), true);
        helper.changeSwitchery($('#switch_MayLike'), true);
    };
    // hiển thị chi tiết bản ghi
    $scope.showDetail = function (_id) {
       
        $scope.isAdd = false;
        notify.spinerShow();
        $("#kUI_window").data("kendoWindow").maximize().open();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _menuId: _id
            }
        }).then(function success(response) {
            debugger
            notify.spinerHide();
            $scope.data = response.data;
            //CKEDITOR.instances.Description.setData($scope.data.Description);

            $scope.data.FakeMenuTab = [];
            $scope.data.FakeMenuTab.push({
                _key: 1,
                Content: $scope.data.Description
            });
            $scope.data.FakeMenuTab.push({
                _key: 2,
                Content: $scope.data.Overview
            });
            $scope.data.FakeMenuTab.push({
                _key: 3,
                Content: $scope.data.Note
            });
            $scope.data.FakeMenuTab.push({
                _key: 4,
                Content: $scope.data.Introduct
            });

            CKEDITOR.instances.Content.setData($scope.data.Content);
            $("#Logo").val($scope.data.Background);
            $("#img-logo").attr("src", $scope.data.Background);
            $("#Logo2").val($scope.data.Photo);
            $("#img-logo2").attr("src", $scope.data.Photo);
            $("#Logo3").val($scope.data.Image2);
            $("#img-logo3").attr("src", $scope.data.Image2);
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
            helper.changeSwitchery($('#switch_menutop'), $scope.data.ShowMenuTop);
            helper.changeSwitchery($('#switch_menubottom'), $scope.data.ShowMenuBottom);
            helper.changeSwitchery($('#switch_highlight'), $scope.data.Highlight);
            helper.changeSwitchery($('#switch_MayLike'), $scope.data.MayLike);

            $timeout(function () {
                $scope.showDetailMenuTab($scope.data.FakeMenuTab[0]);
            }, 200);

        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    // xác nhận xóa bản ghi
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.autoConvertAlias = function () {
        $scope.data.MenuAlias = helper.ConvertToUnSign($scope.data.MenuName);
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            debugger
            notify.spinerShow();
            $scope.data.Background = $("#Logo").val();
            $scope.data.Photo = $("#Logo2").val();
            $scope.data.Image2 = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.ShowMenuTop = $('#switch_menutop').is(':checked');
            $scope.data.ShowMenuBottom = $('#switch_menubottom').is(':checked');
            $scope.data.Highlight = $('#switch_highlight').is(':checked');
            $scope.data.MayLike = $('#switch_MayLike').is(':checked');
            //$scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.Description = $scope.data.FakeMenuTab[0].Content;
            $scope.data.Overview = $scope.data.FakeMenuTab[1].Content;
            $scope.data.Note = $scope.data.FakeMenuTab[2].Content;
            $scope.data.Introduct = $scope.data.FakeMenuTab[3].Content;
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
            notify.spinerShow();
            $scope.data.Background = $("#Logo").val();
            $scope.data.Photo = $("#Logo2").val();
            $scope.data.Image2 = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.ShowMenuTop = $('#switch_menutop').is(':checked');
            $scope.data.ShowMenuBottom = $('#switch_menubottom').is(':checked');
            $scope.data.Highlight = $('#switch_highlight').is(':checked');
            $scope.data.MayLike = $('#switch_MayLike').is(':checked');
            //$scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.Description = $scope.data.FakeMenuTab[0].Content;
            $scope.data.Overview = $scope.data.FakeMenuTab[1].Content;
            $scope.data.Note = $scope.data.FakeMenuTab[2].Content;
            $scope.data.Introduct = $scope.data.FakeMenuTab[3].Content;
            $scope.data.Content = CKEDITOR.instances.Content.getData();
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
        }
    };
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _menuId: $scope.menuIdChoose
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
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
}]);
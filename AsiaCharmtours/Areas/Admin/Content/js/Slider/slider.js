var urlGetAllMenu = '/api/menu/get-all';
var urlGet = '/api/slider/get';
var urlPost = '/api/slider/post';
var urlDetail = '/api/slider/detail';
var urlPut = '/api/slider/put';
var urlDelete = '/api/slider/delete';

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
        i18n: 'vi',
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
            pinnedLeft: true,
            autoHeight: true,
            cellClass: 'line-height-grid'
        },
        {
            displayName: "Hình ảnh",
            name: "name",
            width: 200,
            cellTemplate: template.templateImage('Image', 'Title'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Đường Link",
            name: 'Link',
            width: 200,
            cellClass: 'line-height-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Chuyên mục",
            name: 'ViewAll',
            width: 200,
            cellClass: 'line-height-grid',
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
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateActionMethod('SliderId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'line-height-grid text-center-grid',
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
            $scope.gridOptions.data = data.sliders;
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
            Title: '',
            Link: '',
            Index: 0,
            W_SliderMenu: [],
            W_SliderTab: []
        };
        for (var i = 0; i < $scope.menus.length; i++) {
            $scope.data.W_SliderMenu.push({
                MenuId: $scope.menus[i].MenuId,
                MenuName: $scope.menus[i].MenuName,
                Index: 0,
                Checked: false
            });
        }
        CKEDITOR.instances.Description.setData("");
        helper.changeRadio($('#customSelectMenu'), true);
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
    };
    $scope.showDetail = function (_id) {
        $scope.isAdd = false;
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _sliderId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            $scope.data = response.data;
            CKEDITOR.instances.Description.setData($scope.data.Description);
            $("#Logo").val($scope.data.Image);
            $("#img-logo").attr("src", $scope.data.Image);
            var newSliderMenus = [];
            for (var i = 0; i < $scope.menus.length; i++) {
                var sliderMenu = {
                    MenuId: $scope.menus[i].MenuId,
                    MenuName: $scope.menus[i].MenuName,
                    Index: 0,
                    Checked: false
                };
                var indexExists = $scope.data.W_SliderMenu.findIndex(x => x.MenuId === sliderMenu.MenuId);
                if (indexExists >= 0) {
                    sliderMenu.Checked = true;
                    sliderMenu.Index = $scope.data.W_SliderMenu[indexExists].Index;
                }
                newSliderMenus.push(sliderMenu);
            }
            if ($scope.data.ViewAll)
                helper.changeRadio($('#autoParentMenu'), true);
            else
                helper.changeRadio($('#customSelectMenu'), true);
            $scope.data.W_SliderMenu = newSliderMenus.sort(helper.sortBy('Checked'));
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
            var dataPost = JSON.parse(JSON.stringify($scope.data))
            dataPost.Image = $("#Logo").val();
            dataPost.Description = CKEDITOR.instances.Description.getData();
            dataPost.ViewAll = $('#autoParentMenu').is(':checked');
            if (dataPost.ViewAll) {
                dataPost.W_SliderMenu = [];
            }
            else
                dataPost.W_SliderMenu = dataPost.W_SliderMenu.filter(x => x.Checked);
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
            var dataPost = JSON.parse(JSON.stringify($scope.data))
            dataPost.Image = $("#Logo").val();
            dataPost.Description = CKEDITOR.instances.Description.getData();
            dataPost.ViewAll = $('#autoParentMenu').is(':checked');
            if (dataPost.ViewAll) {
                dataPost.W_SliderMenu = [];
            }
            else
                dataPost.W_SliderMenu = dataPost.W_SliderMenu.filter(x => x.Checked);
            $http({
                url: urlPut,
                method: "POST",
                data: dataPost
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
                _sliderId: $scope.menuIdChoose
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
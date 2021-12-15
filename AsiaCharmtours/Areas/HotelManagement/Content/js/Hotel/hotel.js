var urlGetMenuHotel = '/api/menu/get-all-menu-hotel';
var urlGet = '/api/hotel/get';
var urlPost = '/api/hotel/post';
var urlDetail = '/api/hotel/detail';
var urlPut = '/api/hotel/put';
var urlDelete = '/api/hotel/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', 'helper', '$timeout', function ($scope, $http, template, validation, notify, helper, $timeout) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.data = {};
    $scope.isAdd = true;
    $scope.currentTab = 1;

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
            displayName: "Mã khách sạn",
            name: 'HotelCode',
            width: 180,
            pinnedLeft: true
        },
        {
            displayName: "Tên khách sạn",
            name: 'HotelName',
            width: '*',
            minWidth: 200,
            pinnedLeft: true
        },
        {
            displayName: "Thứ tự",
            name: 'Index',
            width: 120,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateActionMethod('HotelId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.autoConvertAlias = function () {
        $scope.data.HotelAlias = helper.ConvertToUnSign($scope.data.HotelName);
    };
    $scope.GetMenus = function () {
        $http({
            url: urlGetMenuHotel,
            method: 'GET'
        }).then(function success(response) {
            $scope.menus = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetMenus();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.hotels;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showAdd = function () {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.data = {
            MainMenuId: '',
            HotelCode: '',
            HotelName: '',
            Image: '',
            FrameLocation: '',
            Description: '',
            ShortDescription: '',
            Index: 0,
            Star: 4,
            Facility: '',
            Note: '',
            Services: '',
            Activities: '',
            MetaTitle: '',
            MetaDescription: '',
            W_HotelGallery: [],
            W_HotelMenu: [{
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }],
            FakeTab: [{
                _key: 1,
                Content: ''
            }, {
                _key: 2,
                Content: ''
            }, {
                _key: 3,
                Content: ''
            }, {
                _key: 4,
                Content: ''
            }, {
                _key: 5,
                Content: ''
            }, {
                _key: 6,
                Content: ''
            }
            ]
        };
        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
        }, 200);
        $scope.isAdd = true;
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
    };
    $scope.saveTab = function () {
        var tab = $scope.data.FakeTab.find(x => x._key === $scope.currentTab);
        tab.Content = CKEDITOR.instances.Description.getData();
    };
    $scope.showDetailTab = function (tab) {
        $(".fake-btn-type1").removeClass('checked');
        $(".fake-btn-type1-" + tab._key).addClass('checked');
        $scope.currentTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabToEditor(tab.Content);
        }, 100);
    };
    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.isAdd = false;
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _hotelId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            $scope.data = response.data;
            $scope.setDataDetail();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            var dataPost = $scope.getDataPost();
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
            var dataPost = $scope.getDataPost();
            $http({
                url: urlPut,
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
                _hotelId: $scope.menuIdChoose
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
    $scope.addGallery = function () {
        $scope.data.W_HotelGallery.push({
            Image: $("#Gallery").val()
        });
    };
    $scope.removeGallery = function (index) {
        $scope.data.W_HotelGallery.splice(index, 1);
    };
    $scope.setDataDetail = function () {
        $("#Logo").val($scope.data.Image);
        $("#img-logo").attr("src", $scope.data.Image);
        $scope.data.FakeTab = [];
        $scope.data.FakeTab.push({
            _key: 1,
            Content: $scope.data.ShortDescription
        });
        $scope.data.FakeTab.push({
            _key: 2,
            Content: $scope.data.Description
        });
        $scope.data.FakeTab.push({
            _key: 3,
            Content: $scope.data.Facility
        });
        $scope.data.FakeTab.push({
            _key: 4,
            Content: $scope.data.Services
        });
        $scope.data.FakeTab.push({
            _key: 5,
            Content: $scope.data.Activities
        });
        $scope.data.FakeTab.push({
            _key: 6,
            Content: $scope.data.Note
        });
        var W_HotelMenu = [{
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }];
        if ($scope.data.W_HotelMenu.length > 0) {
            W_HotelMenu[0] = $scope.data.W_HotelMenu[0];
        }
        if ($scope.data.W_HotelMenu.length > 1) {
            W_HotelMenu[1] = $scope.data.W_HotelMenu[1];
        }
        if ($scope.data.W_HotelMenu.length > 2) {
            W_HotelMenu[2] = $scope.data.W_HotelMenu[2];
        }
        $scope.data.W_HotelMenu = W_HotelMenu;

        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
        }, 200);
    };
    $scope.getDataPost = function () {
        var dataPost = JSON.parse(JSON.stringify($scope.data));
        dataPost.W_HotelMenu = dataPost.W_HotelMenu.filter(x => x.MenuId != '');
        dataPost.Image = $("#Logo").val();
        dataPost.ShortDescription = dataPost.FakeTab[0].Content;
        dataPost.Description = dataPost.FakeTab[1].Content;
        dataPost.Facility = dataPost.FakeTab[2].Content;
        dataPost.Services = dataPost.FakeTab[3].Content;
        dataPost.Activities = dataPost.FakeTab[4].Content;
        dataPost.Note = dataPost.FakeTab[5].Content;
        dataPost.FakeTab = [];
        return dataPost;
    };
    $scope.bindingContentTabToEditor = function (content) {
        CKEDITOR.instances.Description.setData(content);
    };
}]);
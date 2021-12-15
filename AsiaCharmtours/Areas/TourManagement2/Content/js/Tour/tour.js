var urlGetMenuTourByLevel = '/api/menu/get-menu-tour-by-level';
var urlGetMenuTour = '/api/menu/get-all-menu-tour';
var urlGetMenuTheme = '/api/tour/get-menu-theme';
var urlGetTheme = '/api/tour/get-theme';
var urlGet = '/api/tour/get';
var urlPost = '/api/tour/post';
var urlDetail = '/api/tour/detail';
var urlPut = '/api/tour/put';
var urlDelete = '/api/tour/delete';

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
    $scope.currentConditionTab = 1;
    $scope.isAdd = true;
    //$scope.menuForArea = [];
    //$scope.menuForDestination = [];
    $scope.menuThemes = [];

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
            displayName: "Tên tour",
            name: 'TourName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Chuyên mục",
            name: 'MenuName',
            width: '*',
            minWidth: 150
        },
        {
            displayName: "Điểm đến",
            name: 'Destination',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thời gian (ngày)",
            name: 'NumberDay',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thứ tự hiển thị",
            name: 'Index',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Ngày tạo",
            name: 'DateCreate',
            cellFilter: 'date: "dd/MM/yyyy HH:mm"',
            width: 150,
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
            cellTemplate: template.templateActionMethod('TourId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.autoConvertAlias = function () {
        $scope.data.TourAlias = helper.ConvertToUnSign($scope.data.TourName);
    };
    $scope.GetMenus = function () {
        $http({
            url: urlGetMenuTour,
            method: 'GET'
        }).then(function success(response) {
            $scope.menus = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetMenus();
    $scope.GetThemes = function () {
        $http({
            url: urlGetTheme,
            method: 'GET'
        }).then(function success(response) {
            $scope.themes = response.data;

        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetThemes();
    $scope.GetMenuThemes = function () {
        $http({
            url: urlGetMenuTheme,
            method: 'GET'
        }).then(function success(response) {
            $scope.menuThemes = response.data;
            //console.log($scope.themes)
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetMenuThemes();

    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.tours;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showAdd = function () {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.currentTab = 1;
        $scope.data = {
            //ThemeId: '',
            TourName: '',
            TourAlias: '',
            NumberDay: 1,
            Destination: '',
            PromotionTitle: '',
            MetaTitle: '',
            MetaDescription: '',
            MainMenuId: '',
            Index: 0,
            T2_TourMenu: [{
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }],
            //SR_ThemeMenu: [],
            T2_TourGallery: [],
            FakeTourTab: [{
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
            }],
            FakeTourCondition: [{
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
            }, {
                _key: 7,
                Content: ''
            }]
        };
        $scope.isAdd = true;
        helper.changeSwitchery($('#switch_status'), true);
        helper.changeSwitchery($('#switch_hot'), false);
        helper.changeSwitchery($('#switch_MayLike'), false);
        CKEDITOR.instances.Description.setData("");
        CKEDITOR.instances.Condition.setData("");
        $timeout(function () {
            $scope.showDetailTourTab($scope.data.FakeTourTab[0]);
            $scope.showDetailTourConditionTab($scope.data.FakeTourCondition[0]);
        }, 200);
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
                _tourId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.tourDetail;
            //data.menuForDestination.forEach(x => {
            //    var indexExistMenu = $scope.data.T2_TourMenu.findIndex(y => y.MenuId === x.MenuId);
            //    if (indexExistMenu >= 0) {
            //        x.Checked = true;
            //    }
            //    else {
            //        x.Checked = false;
            //    }
            //});
            //data.menuThemes.forEach(z => {
            //    var indexExistMenu2 = $scope.data.SR_ThemeMenu.findIndex(u => u.MenuId === z.MenuId);
            //    if (indexExistMenu2 >= 0) {
            //        z.Checked = true;
            //    }
            //    else {
            //        z.Checked = false;
            //    }
            //});

            $scope.filterMenu._menuParent1 = data._menuParent1;
            $scope.filterMenu._parentMenuId = data._parentMenuId;
            //$scope.menuForDestination = data.menuForDestination;
            //$scope.menuForArea = data.menuForArea;
            //$scope.menuThemes = data.menuThemes;
            $scope.setDataDetail();

        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.addGallery = function () {
        $scope.data.T2_TourGallery.push({
            Image: $("#Gallery").val()
        });
    };
    $scope.removeGallery = function (index) {
        $scope.data.T2_TourGallery.splice(index, 1);
    };
    $scope.showDetailTourTab = function (tab) {
        $(".fake-btn-type1").removeClass('checked');
        $(".fake-btn-type1-" + tab._key).addClass('checked');
        $scope.currentTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabToEditor(tab.Content);
        }, 100);
    };
    $scope.showDetailTourConditionTab = function (tab) {
        $(".fake-btn-type2").removeClass('checked');
        $(".fake-btn-type2-" + tab._key).addClass('checked');
        $scope.currentConditionTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabConditionToEditor(tab.Content);
        }, 100);
    };
    $scope.bindingContentTabToEditor = function (content) {
        CKEDITOR.instances.Description.setData(content);
    };
    $scope.bindingContentTabConditionToEditor = function (content) {
        CKEDITOR.instances.Condition.setData(content);
    };
    $scope.saveTourTab = function () {
        var tab = $scope.data.FakeTourTab.find(x => x._key === $scope.currentTab);
        tab.Content = CKEDITOR.instances.Description.getData();
    };
    $scope.saveTourConditionTab = function () {
        var tab = $scope.data.FakeTourCondition.find(x => x._key === $scope.currentConditionTab);
        tab.Content = CKEDITOR.instances.Condition.getData();
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.setDataDetail = function () {
        helper.changeSwitchery($('#switch_status'), $scope.data.Status);
        helper.changeSwitchery($('#switch_hot'), $scope.data.Hot);
        helper.changeSwitchery($('#switch_MayLike'), $scope.data.Like);
        $("#Logo").val($scope.data.Image);
        $("#img-logo").attr("src", $scope.data.Image);
        $scope.data.FakeTourTab = [];
        $scope.data.FakeTourCondition = [];
        $scope.data.FakeTourTab.push({
            _key: 1,
            Content: $scope.data.Overview
        });
        $scope.data.FakeTourTab.push({
            _key: 2,
            Content: $scope.data.Highlights
        });
        $scope.data.FakeTourTab.push({
            _key: 3,
            Content: $scope.data.Description
        });
        $scope.data.FakeTourTab.push({
            _key: 4,
            Content: $scope.data.Note
        });
        $scope.data.FakeTourTab.push({
            _key: 5,
            Content: $scope.data.PromotionContent
        });

        $scope.data.FakeTourCondition.push({
            _key: 1,
            Content: $scope.data.Meals
        });
        $scope.data.FakeTourCondition.push({
            _key: 2,
            Content: $scope.data.Transportation
        });
        $scope.data.FakeTourCondition.push({
            _key: 3,
            Content: $scope.data.Accommodation
        });
        $scope.data.FakeTourCondition.push({
            _key: 4,
            Content: $scope.data.PriceIncludes
        });
        $scope.data.FakeTourCondition.push({
            _key: 5,
            Content: $scope.data.PriceExcludes
        });
        $scope.data.FakeTourCondition.push({
            _key: 6,
            Content: $scope.data.Cancellation
        });
        $scope.data.FakeTourCondition.push({
            _key: 7,
            Content: $scope.data.Policy
        });

        var SR_ThemeMenu = [{
            ThemeId: '',
            Index: 0
        }, {
            ThemeId: '',
            Index: 0
        }, {
            ThemeId: '',
            Index: 0
        }];
        if ($scope.data.SR_ThemeMenu.length > 0) {
            SR_ThemeMenu[0] = $scope.data.SR_ThemeMenu[0];
        }
        if ($scope.data.SR_ThemeMenu.length > 1) {
            SR_ThemeMenu[1] = $scope.data.SR_ThemeMenu[1];
        }
        if ($scope.data.SR_ThemeMenu.length > 2) {
            SR_ThemeMenu[2] = $scope.data.SR_ThemeMenu[2];
        }
        $scope.data.SR_ThemeMenu = SR_ThemeMenu;

        var T2_TourMenu = [{
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }];
        if ($scope.data.T2_TourMenu.length > 0) {
            T2_TourMenu[0] = $scope.data.T2_TourMenu[0];
        }
        if ($scope.data.T2_TourMenu.length > 1) {
            T2_TourMenu[1] = $scope.data.T2_TourMenu[1];
        }
        if ($scope.data.T2_TourMenu.length > 2) {
            T2_TourMenu[2] = $scope.data.T2_TourMenu[2];
        }
        $scope.data.T2_TourMenu = T2_TourMenu;
        $timeout(function () {
            $scope.showDetailTourTab($scope.data.FakeTourTab[0]);
            $scope.showDetailTourConditionTab($scope.data.FakeTourCondition[0]);
        }, 200);
    };
    $scope.getDataPost = function () {
        debugger
        var dataPost = JSON.parse(JSON.stringify($scope.data));
        dataPost.Hot = $('#switch_hot').is(':checked');
        dataPost.Status = $('#switch_status').is(':checked');
        dataPost.Like = $('#switch_MayLike').is(':checked');
        dataPost.T2_TourMenu = dataPost.T2_TourMenu.filter(x => x.MenuId != '');
        //dataPost.MainMenuId = $scope.filterMenu._menuParent1;
        dataPost.Image = $("#Logo").val();
        //overview
        dataPost.Overview = dataPost.FakeTourTab[0].Content;
        dataPost.Highlights = dataPost.FakeTourTab[1].Content;
        dataPost.Description = dataPost.FakeTourTab[2].Content;
        dataPost.Note = dataPost.FakeTourTab[3].Content;
        dataPost.PromotionContent = dataPost.FakeTourTab[4].Content;
        // condition
        dataPost.Meals = dataPost.FakeTourCondition[0].Content;
        dataPost.Transportation = dataPost.FakeTourCondition[1].Content;
        dataPost.Accommodation = dataPost.FakeTourCondition[2].Content;
        dataPost.PriceIncludes = dataPost.FakeTourCondition[3].Content;
        dataPost.PriceExcludes = dataPost.FakeTourCondition[4].Content;
        dataPost.Cancellation = dataPost.FakeTourCondition[5].Content;
        dataPost.Policy = dataPost.FakeTourCondition[6].Content;
        dataPost.FakeTourCondition = [];
        dataPost.FakeTourTab = [];
        //var menuForDestination = JSON.parse(JSON.stringify($scope.menuForDestination));
        //if (menuForDestination == null)
        //    menuForDestination = [];
        //menuForDestination = menuForDestination.filter(x => x.Checked);
        //dataPost.T2_TourMenu = menuForDestination;

        var menuThemes = JSON.parse(JSON.stringify($scope.menuThemes));
        if (menuThemes == null)
            menuThemes = [];
        menuThemes = menuThemes.filter(x => x.Checked);
        dataPost.SR_ThemeMenu = menuThemes;
        return dataPost;
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
            method: 'POST',
            params: {
                _tourId: $scope.menuIdChoose
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

    $scope.GetMenuLevelTwo = function () {

        if ($scope.filterMenu._menuParent1 == '') {
            $scope.filterMenu._parentMenuId = '';
            //$scope.menuForDestination = [];
            return;
        }
        notify.spinerShow();
        $http({
            url: urlGetMenuTourByLevel,
            method: 'GET',
            params: {
                _parentMenuId: $scope.filterMenu._menuParent1,
                _level: 1
            }
        }).then(function success(response) {
            debugger
            notify.spinerHide();
            var data = response.data;
            //$scope.menuForArea = data.menuResult;
            //$scope.menuThemes = data.menuTheme;
            //$scope.menuThemes.forEach(x => {
            //    var indexExistMenu = $scope.data.SR_ThemeMenu.findIndex(y => y.MenuId === x.MenuId);
            //    if (indexExistMenu >= 0) {
            //        x.Checked = true;
            //    }
            //    else {
            //        x.Checked = false;
            //    }
            //});
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    //$scope.GetMenuByLevel = function () {

    //    if ($scope.filterMenu._parentMenuId == '') {
    //        $scope.menuForDestination = [];
    //        return;
    //    }
    //    notify.spinerShow();
    //    $http({
    //        url: urlGetMenuTourByLevel,
    //        method: 'GET',
    //        params: {
    //            _parentMenuId: $scope.filterMenu._parentMenuId,
    //            _level: 3
    //        }
    //    }).then(function success(response) {
    //        notify.spinerHide();
    //        $scope.menuForDestination = response.data.menuResult;
    //        $scope.menuForDestination.forEach(x => {
    //            var indexExistMenu = $scope.data.T2_TourMenu.findIndex(y => y.MenuId === x.MenuId);
    //            if (indexExistMenu >= 0) {
    //                x.Checked = true;
    //            }
    //            else {
    //                x.Checked = false;
    //            }
    //        });
    //    }, function error(response) {
    //        notify.spinerHide();
    //        notify.error(response.data.Message);
    //    });
    //};

}]);
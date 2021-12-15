var urlGetMenuTour = '/api/menu/get-all-menu-cruise';
var urlGet = '/api/cruise/get';
var urlPost = '/api/cruise/post';
var urlDetail = '/api/cruise/detail';
var urlPut = '/api/cruise/put';
var urlDelete = '/api/cruise/delete';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.data = {};
    $scope.currentTab = 1;
    $scope.currentConditionTab = 1;
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
            displayName: "Tên tàu",
            name: 'CruiseName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Điểm đến",
            name: 'Destination',
            width: '*',
            minWidth: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Best Seller",
            name: 'Highlight',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Số lượng cabin",
            name: 'NumberCabin',
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
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateActionMethod('CruiseId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.autoConvertAlias = function () {
        $scope.data.CruiseAlias = helper.ConvertToUnSign($scope.data.CruiseName);
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
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.cruises;
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
            CruiseName: '',
            CruiseAlias: '',
            NumberCabin: 1,
            Star: 1,
            Destination: '',
            PromotionTitle: '',
            MetaTitle: '',
            MetaDescription: '',
            MainMenuId: '',
            Index: 0,
            CR_CruiseMenu: [{
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }, {
                MenuId: '',
                Index: 0
            }],
            CR_CruiseGallery: [],
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
            }],
            FakeCondition: [{
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
            }, {
                _key: 8,
                Content: ''
            }, {
                _key: 9,
                Content: ''
            }]
        };
        $scope.isAdd = true;
        helper.changeSwitchery($('#switch_status'), false);
        helper.changeSwitchery($('#switch_bestcruise'), false);
        helper.changeSwitchery($('#switch_bestsellers'), false);
        helper.changeSwitchery($('#switch_topcruise'), false);


        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
            $scope.showDetailConditionTab($scope.data.FakeCondition[0]);
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
                _cruiseId: _id
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
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.addGallery = function () {
        $scope.data.CR_CruiseGallery.push({
            Image: $("#Gallery").val()
        });
    };
    $scope.removeGallery = function (index) {
        $scope.data.CR_CruiseGallery.splice(index, 1);
    };
    $scope.showDetailTab = function (tab) {
        $(".fake-btn-type1").removeClass('checked');
        $(".fake-btn-type1-" + tab._key).addClass('checked');
        $scope.currentTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabToEditor(tab.Content);
        }, 100);
    };
    $scope.showDetailConditionTab = function (tab) {
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
    $scope.saveTab = function () {
        var tab = $scope.data.FakeTab.find(x => x._key === $scope.currentTab);
        tab.Content = CKEDITOR.instances.Description.getData();
    };
    $scope.saveConditionTab = function () {
        var tab = $scope.data.FakeCondition.find(x => x._key === $scope.currentConditionTab);
        tab.Content = CKEDITOR.instances.Condition.getData();
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.setDataDetail = function () {
        helper.changeSwitchery($('#switch_status'), $scope.data.Highlight);
        helper.changeSwitchery($('#switch_bestcruise'), $scope.data.BestCruise);
        helper.changeSwitchery($('#switch_bestsellers'), $scope.data.BestSeller);
        helper.changeSwitchery($('#switch_topcruise'), $scope.data.TopCruise);

        $("#Logo").val($scope.data.Image);
        $("#img-logo").attr("src", $scope.data.Image);
        $scope.data.FakeTab = [];
        $scope.data.FakeCondition = [];
        $scope.data.FakeTab.push({
            _key: 1,
            Content: $scope.data.Overview
        });
        $scope.data.FakeTab.push({
            _key: 2,
            Content: $scope.data.ShortDescription
        });
        $scope.data.FakeTab.push({
            _key: 3,
            Content: $scope.data.Description
        });
        $scope.data.FakeTab.push({
            _key: 4,
            Content: $scope.data.Note
        });
        $scope.data.FakeTab.push({
            _key: 5,
            Content: $scope.data.PromotionContent
        });

        $scope.data.FakeCondition.push({
            _key: 1,
            Content: $scope.data.Meals
        });
        $scope.data.FakeCondition.push({
            _key: 2,
            Content: $scope.data.Transportation
        });
        $scope.data.FakeCondition.push({
            _key: 3,
            Content: $scope.data.Accommodation
        });
        $scope.data.FakeCondition.push({
            _key: 4,
            Content: $scope.data.PriceIncludes
        });
        $scope.data.FakeCondition.push({
            _key: 5,
            Content: $scope.data.PriceExcludes
        });
        $scope.data.FakeCondition.push({
            _key: 6,
            Content: $scope.data.Cancellation
        });
        $scope.data.FakeCondition.push({
            _key: 7,
            Content: $scope.data.CancellationBadWeather
        });
        $scope.data.FakeCondition.push({
            _key: 8,
            Content: $scope.data.Policy
        });
        $scope.data.FakeCondition.push({
            _key: 9,
            Content: $scope.data.Facilities
        });

        var CR_CruiseMenu = [{
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }, {
            MenuId: '',
            Index: 0
        }];
        if ($scope.data.CR_CruiseMenu.length > 0) {
            CR_CruiseMenu[0] = $scope.data.CR_CruiseMenu[0];
        }
        if ($scope.data.CR_CruiseMenu.length > 1) {
            CR_CruiseMenu[1] = $scope.data.CR_CruiseMenu[1];
        }
        if ($scope.data.CR_CruiseMenu.length > 2) {
            CR_CruiseMenu[2] = $scope.data.CR_CruiseMenu[2];
        }
        $scope.data.CR_CruiseMenu = CR_CruiseMenu;
        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
            $scope.showDetailConditionTab($scope.data.FakeCondition[0]);
        }, 200);
    };
    $scope.getDataPost = function () {
        var dataPost = JSON.parse(JSON.stringify($scope.data));
        dataPost.Highlight = $('#switch_status').is(':checked');
        dataPost.BestCruise = $('#switch_bestcruise').is(':checked');
        dataPost.BestSeller = $('#switch_bestsellers').is(':checked');
        dataPost.TopCruise = $('#switch_topcruise').is(':checked');

        dataPost.CR_CruiseMenu = dataPost.CR_CruiseMenu.filter(x => x.MenuId !== '');
        dataPost.Image = $("#Logo").val();
        //overview
        dataPost.Overview = dataPost.FakeTab[0].Content;
        dataPost.ShortDescription = dataPost.FakeTab[1].Content;
        dataPost.Description = dataPost.FakeTab[2].Content;
        dataPost.Note = dataPost.FakeTab[3].Content;
        dataPost.PromotionContent = dataPost.FakeTab[4].Content;
        // condition
        dataPost.Meals = dataPost.FakeCondition[0].Content;
        dataPost.Transportation = dataPost.FakeCondition[1].Content;
        dataPost.Accommodation = dataPost.FakeCondition[2].Content;
        dataPost.PriceIncludes = dataPost.FakeCondition[3].Content;
        dataPost.PriceExcludes = dataPost.FakeCondition[4].Content;
        dataPost.Cancellation = dataPost.FakeCondition[5].Content;
        dataPost.CancellationBadWeather = dataPost.FakeCondition[6].Content;
        dataPost.Policy = dataPost.FakeCondition[7].Content;
        dataPost.Facilities = dataPost.FakeCondition[8].Content;
        dataPost.FakeCondition = [];
        dataPost.FakeTab = [];
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
            method: 'GET',
            params: {
                _cruiseId: $scope.menuIdChoose
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
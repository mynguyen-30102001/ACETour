var urlGetCruises = '/api/cruise/get-all';
var urlGet = '/api/cabin/get';
var urlPost = '/api/cabin/post';
var urlDetail = '/api/cabin/detail';
var urlPut = '/api/cabin/put';
var urlDelete = '/api/cabin/delete';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _cruiseId: -1
    };
    $scope.data = {};
    $scope.currentTab = 1;
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
            displayName: "Tên cabin",
            name: 'CabinName',
            width: '*',
            minWidth: 200
        },
        {
            displayName: "Tàu",
            name: 'CruiseName',
            width: '*',
            minWidth: 150,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Highlight",
            name: 'Highlight',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Diện tích (m2)",
            name: 'Acreage',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Giường",
            name: 'Bed',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
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
            cellTemplate: template.templateActionMethod('CabinId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.GetCruises = function () {
        $http({
            url: urlGetCruises,
            method: 'GET'
        }).then(function success(response) {
            $scope.cruises = response.data;
        }, function error(response) {
            notify.error(response.data.Message);
        });
    };
    $scope.GetCruises();
    $scope.Get = function () {
        notify.spinerShow();
        $http({
            url: urlGet,
            method: 'GET',
            params: $scope.filters
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptions.data = data.cabins;
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
            CruiseId: '',
            CabinName: '',
            Acreage: 0,
            Bed: '',
            Balcony: '',
            MaxPeople: 1,
            Description: '',
            Conditions: '',
            Image: '',
            Extrabed: '',
            Amenities: '',
            Highlight: true,
            Index: 0,
            CR_CabinGallery: [],
            FakeTab: [{
                _key: 1,
                Content: ''
            }, {
                _key: 2,
                Content: ''
            }, {
                _key: 3,
                Content: ''
            }]
        };
        $scope.isAdd = true;
        helper.changeSwitchery($('#switch_status'), true);
        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
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
                _cabinId: _id
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
        $scope.data.CR_CabinGallery.push({
            Image: $("#Gallery").val()
        });
    };
    $scope.removeGallery = function (index) {
        $scope.data.CR_CabinGallery.splice(index, 1);
    };
    $scope.showDetailTab = function (tab) {
        $(".fake-btn-type1").removeClass('checked');
        $(".fake-btn-type1-" + tab._key).addClass('checked');
        $scope.currentTab = tab._key;
        $timeout(function () {
            $scope.bindingContentTabToEditor(tab.Content);
        }, 100);
    };
    $scope.bindingContentTabToEditor = function (content) {
        CKEDITOR.instances.Description.setData(content);
    };
    $scope.saveTab = function () {
        var tab = $scope.data.FakeTab.find(x => x._key === $scope.currentTab);
        tab.Content = CKEDITOR.instances.Description.getData();
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.setDataDetail = function () {
        helper.changeSwitchery($('#switch_status'), $scope.data.Highlight);
        $("#Logo").val($scope.data.Image);
        $("#img-logo").attr("src", $scope.data.Image);
        $scope.data.FakeTab = [];
        $scope.data.FakeTab.push({
            _key: 1,
            Content: $scope.data.Amenities
        });
        $scope.data.FakeTab.push({
            _key: 2,
            Content: $scope.data.Description
        });
        $scope.data.FakeTab.push({
            _key: 3,
            Content: $scope.data.Conditions
        });
        $timeout(function () {
            $scope.showDetailTab($scope.data.FakeTab[0]);
        }, 200);
    };
    $scope.getDataPost = function () {
        var dataPost = JSON.parse(JSON.stringify($scope.data));
        dataPost.Highlight = $('#switch_status').is(':checked');
        dataPost.Image = $("#Logo").val();
        //overview
        dataPost.Amenities = dataPost.FakeTab[0].Content;
        dataPost.Description = dataPost.FakeTab[1].Content;
        dataPost.Conditions = dataPost.FakeTab[2].Content;
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
                _cabinId: $scope.menuIdChoose
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
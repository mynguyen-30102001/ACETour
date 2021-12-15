var urlGet = '/api/journey/get';
var urlDetail = '/api/journey/detail';
var urlPut = '/api/journey/put';

app.controller('controller', ['$scope', '$http', 'template', '$timeout', 'helper', 'validation', 'notify', function ($scope, $http, template, $timeout, helper, validation, notify) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: ''
    };
    $scope.currentTab = 1;
    $scope.currentSortTab = 1;
    $scope.data = {};

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
            displayName: "Tên tour",
            name: 'TourName',
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
            displayName: "Thời gian (ngày)",
            name: 'NumberDay',
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
            displayName: "Trang thái cập nhật",
            name: 'StatusJourney',
            width: 150,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Thao tác",
            name: "#",
            width: 120,
            field: "#",
            cellTemplate: template.templateUpdate('TourId'),
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
            $scope.gridOptions.data = data.journeys;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.showDetail = function (_id) {
        $("#kUI_window").data("kendoWindow").maximize().open();
        notify.spinerShow();
        $http({
            url: urlDetail,
            method: 'GET',
            params: {
                _tourId: _id
            }
        }).then(function success(response) {
            notify.spinerHide();
            $scope.data = response.data;
            var i = 0;
            if ($scope.data.T2_TourShortJourney.length > 0) {
                for (i = 0; i < $scope.data.T2_TourShortJourney.length; i++) {
                    $scope.data.T2_TourShortJourney[i]._key = i;
                }
                $scope.showDetailSortTourTab($scope.data.T2_TourShortJourney[0]);
            }
            if ($scope.data.T2_TourJourney.length > 0) {
                for (i = 0; i < $scope.data.T2_TourJourney.length; i++) {
                    $scope.data.T2_TourJourney[i]._key = i;
                }
                $scope.showDetailTourTab($scope.data.T2_TourJourney[0]);
            }
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.Put = function () {
        notify.spinerShow();
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
    };

    // sortJourney
    $scope.addSortTourTab = function () {
        var id = 0;
        for (var i = 0; i < $scope.data.T2_TourShortJourney.length; i++) {
            if (id < $scope.data.T2_TourShortJourney[i]._key)
                id = $scope.data.T2_TourShortJourney[i]._key;
        }
        var newTab = {
            _key: id + 1,
            MoveHour: $("#newTitleSortTourTab").val(),
            Description: 'Nội dung',
            Index: 0
        };
        $scope.data.T2_TourShortJourney.push(newTab);
        $("#newTitleSortTourTab").val("");
        if ($scope.data.T2_TourShortJourney.length == 1) {
            $scope.showDetailSortTourTab($scope.data.T2_TourShortJourney[0]);
        }
    };
    $scope.showDetailSortTourTab = function (tab) {
        $(".tour-tab-header2").removeClass('uk-active');
        $("#tour-tab-header2-" + tab._key).addClass('uk-active');
        $scope.currentSortTab = tab._key;
        $scope.bindingContentSortTabToEditor(tab.Description);
    };
    $scope.bindingContentSortTabToEditor = function (content) {
        $timeout(function () {
            CKEDITOR.instances.ShortJourney.setData(content);
        }, 100);
    };
    $scope.saveSortTourTab = function () {
        var tab = $scope.data.T2_TourShortJourney.find(x => x._key === $scope.currentSortTab);
        if (tab != null)
            tab.Description = CKEDITOR.instances.ShortJourney.getData();
    };
    $scope.removeSortTourTab = function (index) {
        if ($scope.data.T2_TourShortJourney.length > 1) {
            if (confirm("Bạn có chắc chắn muốn xóa tab này không?")) {
                $scope.data.T2_TourShortJourney.splice(index, 1);
                $scope.showDetailSortTourTab($scope.data.T2_TourShortJourney[0]);
            }
        }
    };
    // journey detail
    $scope.addTourTab = function () {
        var id = 0;
        for (var i = 0; i < $scope.data.T2_TourJourney.length; i++) {
            if (id < $scope.data.T2_TourJourney[i]._key)
                id = $scope.data.T2_TourJourney[i]._key;
        }
        var newTab = {
            _key: id + 1,
            Title: $("#newTitleTourTab").val(),
            Content: 'Nội dung',
            Index: 0
        };
        $scope.data.T2_TourJourney.push(newTab);
        $("#newTitleTourTab").val("");
        if ($scope.data.T2_TourJourney.length == 1) {
            $scope.showDetailTourTab($scope.data.T2_TourJourney[0]);
        }
    };
    $scope.showDetailTourTab = function (tab) {
        $(".tour-tab-header").removeClass('uk-active');
        $("#tour-tab-header-" + tab._key).addClass('uk-active');
        $scope.currentTab = tab._key;
        $scope.bindingContentTabToEditor(tab.Content);
    };
    $scope.bindingContentTabToEditor = function (content) {
        $timeout(function () {
            CKEDITOR.instances.Journey.setData(content);
        }, 100);
    };
    $scope.saveTourTab = function () {
        var tab = $scope.data.T2_TourJourney.find(x => x._key === $scope.currentTab);
        if (tab != null)
            tab.Content = CKEDITOR.instances.Journey.getData();
    };
    $scope.removeTourTab = function (index) {
        if ($scope.data.T2_TourJourney.length > 1) {
            if (confirm("Bạn có chắc chắn muốn xóa tab này không?")) {
                $scope.data.T2_TourJourney.splice(index, 1);
                $scope.showDetailTourTab($scope.data.T2_TourJourney[0]);
            }
        }
    };
}]);
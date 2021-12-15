var urlGetMenuTourByLevel = '/api/menu/get-menu-article-by-level';
var urlGetAllMenu = '/api/menu/get-all-menu-article';
var urlGet = '/api/article/get';
var urlGetTour = '/api/article/get-tour';
var urlPost = '/api/article/post';
var urlDetail = '/api/article/detail';
var urlPut = '/api/article/put';
var urlDelete = '/api/article/delete';

app.controller('controller', ['$scope', '$http', 'template', 'validation', 'notify', 'helper', '$timeout', function ($scope, $http, template, validation, notify, helper, $timeout) {
    $scope.filters = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _menuId: -1
    };
    $scope.filtersRelatedPost = {
        _pageNumber: 1,
        _pageSize: 100,
        _keySearch: '',
        _menuId: -1
    };
    $scope.filterMenu = {
        _menuParent1: '',
        _parentMenuId: ''
    };
    $scope.data = {};
    $scope.menus = [];
    $scope.menuForDomain = [];
    $scope.isAdd = true;
    $scope.replaceOldData = false; // kiểm tra nếu tồn tại bài liên quan cũ thì cài đặt đã chọn trong bảng chọn bài viết (Có ảnh hưởng event selected)
    $scope.relatedPost = [];

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
            displayName: "Tiêu đề",
            name: 'Title',
            width: '*',
            minWidth: 200,
            pinnedLeft: true
        },
        {
            displayName: "Chuyên mục",
            name: 'MenuName',
            width: 200,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Người viết",
            name: 'UserCreate',
            width: 150,
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Ngày cập nhật",
            name: 'DateUpdate',
            cellFilter: 'date: "dd/MM/yyyy"',
            width: 180,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        },
        {
            displayName: "Ngày đăng",
            name: 'DateCreate',
            cellFilter: 'date: "dd/MM/yyyy"',
            width: 180,
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
            cellTemplate: template.templateActionMethod('ArticleId'),
            enableFiltering: false,
            enableSorting: false,
            cellClass: 'text-center-grid',
            headerCellClass: 'text-center-grid'
        }
    ];
    $scope.gridOptionsRelatedPost = {
        paginationPageSizes: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
        paginationPageSize: 100,
        useExternalPagination: true,
        enableFiltering: false,
        useExternalFiltering: false,
        columnDefs: [],
        rowHeight: 32,
        i18n: 'vi',
        showGridFooter: false,
        enableFullRowSelection: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (!$scope.replaceOldData) {
                    var indexExists = $scope.relatedPost.findIndex(x => x.TourId == row.entity.TourId);
                    if (indexExists < 0)
                        $scope.relatedPost.push(row.entity);
                    else
                        $scope.relatedPost.splice(indexExists, 1);
                }

            });
            $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                if (!$scope.replaceOldData) {
                    for (var i = 0; i < rows.length; i++) {
                        var indexExists = $scope.relatedPost.findIndex(x => x.TourId == rows[i].entity.TourId);
                        if (indexExists < 0)
                            $scope.relatedPost.push(rows[i].entity);
                        else
                            $scope.relatedPost.splice(indexExists, 1);
                    }
                }
            });
            $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.filtersRelatedPost._pageNumber = newPage;
                $scope.filtersRelatedPost._pageSize = pageSize;
                $scope.GetRelatedPost();
            });
        }
    };
    $scope.gridOptionsRelatedPost.columnDefs = [
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
            $scope.gridOptions.data = data.articles;
            $scope.gridOptions.totalItems = data.totalRecord;
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.Get();
    $scope.GetRelatedPost = function () {
        notify.spinerShow();
        $http({
            url: urlGetTour,
            method: 'GET',
            params: $scope.filtersRelatedPost
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            $scope.gridOptionsRelatedPost.data = data.tours;
            $scope.gridOptionsRelatedPost.totalItems = data.totalRecord;
            $scope.checkRelatedPostExist();
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.GetRelatedPost();
    $scope.GetAllMenu = function () {
        $http({
            url: urlGetAllMenu,
            method: 'GET'
        }).then(function success(response) {
            $scope.menus = response.data;
        }, function error(response) {
            //notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.GetAllMenu();
    $scope.showAdd = function () {
        $("#kUI_window").data("kendoWindow").maximize().open();
        $scope.data = {
            MainMenuId: '',
            Index: 0,
            W_ArticalMenu: [
                {
                    SubMenu1: -1,
                    IndexSubMenu1: 0,
                    SubMenu2: -1,
                    IndexSubMenu2: 0,
                    SubMenu3: -1,
                    IndexSubMenu3: 0
                }
            ],
            Title: '',
            Alias: '',
            Description: '',
            Content: '',
            SelectRelatedPost: false,
            MetaTitle: '',
            MetaDescription: ''
        };
        helper.changeSwitchery($('#switch_status'), true);
        helper.changeSwitchery($('#switch_destination'), false);
        helper.changeSwitchery($('#switch_travel'), false);

        helper.changeRadio($('#relatepost'), true);
        $scope.relatedPost = [];
        CKEDITOR.instances.Description.setData('');
        CKEDITOR.instances.Content.setData('');
        $scope.isAdd = true;
        $("#Logo").val("");
        $("#img-logo").attr("src", "/FileDefault/img-default.gif");
        $("#Logo3").val("/FileDefault/img-default.gif");
        $("#img-logo3").attr("src", "/FileDefault/img-default.gif");
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
                _articleId: _id
            }
        }).then(function success(response) {
            debugger
            notify.spinerHide();
            var data = response.data;
            $scope.data = data.article;
            $scope.relatedPost = data.relatedPosts;
          
            $scope.filterMenu._menuParent1 = data._menuParent1;
            $scope.filterMenu._parentMenuId = data._parentMenuId;
            //$scope.menuForArea = data.menuForArea;
            //$scope.menuDestination = data.menuDestination;
            //data.menuForDestination.forEach(x => {
            //    var indexExistMenu = $scope.data.W_ThemesMenu.findIndex(y => y.MenuId === x.MenuId);
            //    if (indexExistMenu >= 0) {
            //        x.Checked = true;
            //    }
            //    else {
            //        x.Checked = false;
            //    }
            //});
            //$scope.menuForDestination = data.menuForDestination;
            $("#Logo").val($scope.data.Avatar);
            $("#img-logo").attr("src", $scope.data.Avatar);
            $("#Logo3").val($scope.data.Icon);
            $("#img-logo3").attr("src", $scope.data.Icon);
            CKEDITOR.instances.Description.setData($scope.data.Description);
            CKEDITOR.instances.Content.setData($scope.data.Content);
            helper.changeSwitchery($('#switch_status'), $scope.data.Status);
            helper.changeSwitchery($('#switch_destination'), $scope.data.Destination);
            helper.changeSwitchery($('#switch_travel'), $scope.data.Travel);
          

            if ($scope.data.SelectRelatedPost)
                helper.changeRadio($('#relatepost2'), true);
            else
                helper.changeRadio($('#relatepost'), true);
        }, function error(response) {
            notify.spinerHide();
            notify.error(response.data.Message);
        });
    };
    $scope.autoConvertAlias = function () {
        $scope.data.Alias = helper.ConvertToUnSign($scope.data.Title);
    };
    $scope.Post = function () {
        if (validation.checkRequired()) {
            notify.spinerShow();
            $scope.data.Avatar = $("#Logo").val();
            $scope.data.Icon = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.Destination = $('#switch_destination').is(':checked');
            $scope.data.Travel = $('#switch_travel').is(':checked');
            $scope.data.SelectRelatedPost = $('#relatepost2').is(':checked');
            $scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.W_ArticleRelatedPost = [];
            if ($scope.data.SelectRelatedPost) {
                for (var i = 0; i < $scope.relatedPost.length; i++)
                    $scope.data.W_ArticleRelatedPost.push({
                        ArticleRelatedId: $scope.relatedPost[i].TourId
                    });
            }
            //var menuForDestination = JSON.parse(JSON.stringify($scope.menuForDestination));
            //if (menuForDestination == null)
            //    menuForDestination = [];
            //menuForDestination = menuForDestination.filter(x => x.Checked);
            //$scope.data.W_ThemesMenu = menuForDestination;

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
            debugger
            notify.spinerShow();
            $scope.data.Avatar = $("#Logo").val();
            $scope.data.Icon = $("#Logo3").val();
            $scope.data.Status = $('#switch_status').is(':checked');
            $scope.data.Destination = $('#switch_destination').is(':checked');
            $scope.data.Travel = $('#switch_travel').is(':checked');
            $scope.data.SelectRelatedPost = $('#relatepost2').is(':checked');
            $scope.data.Description = CKEDITOR.instances.Description.getData();
            $scope.data.Content = CKEDITOR.instances.Content.getData();
            $scope.data.W_ArticleRelatedPost = [];
            if ($scope.data.SelectRelatedPost) {
                for (var i = 0; i < $scope.relatedPost.length; i++)
                    $scope.data.W_ArticleRelatedPost.push({
                        ArticleRelatedId: $scope.relatedPost[i].TourId
                    });
            }
            //var menuForDestination = JSON.parse(JSON.stringify($scope.menuForDestination));
            //if (menuForDestination == null)
            //    menuForDestination = [];
            //menuForDestination = menuForDestination.filter(x => x.Checked);
            //$scope.data.W_ThemesMenu = menuForDestination;
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
    $scope.confirmDelete = function (_id) {
        $scope.menuIdChoose = _id;
        UIkit.modal("#modalConfirm").show();
    };
    $scope.showRelatedPost = function () {
        $scope.checkRelatedPostExist();
        UIkit.modal("#modalRelatePost").show();
    };
    // kiểm tra bài viết liên quan đã chọn
    $scope.checkRelatedPostExist = function () {
        $timeout(function () {
            $scope.replaceOldData = true;
            $scope.gridApi.selection.clearSelectedRows();
            if ($scope.relatedPost.length > 0) {
                for (var i = 0; i < $scope.relatedPost.length; i++) {
                    var index = $scope.gridOptionsRelatedPost.data.findIndex(x => x.TourId == $scope.relatedPost[i].TourId);
                    if (index >= 0)
                        $scope.gridApi.selection.selectRow($scope.gridOptionsRelatedPost.data[index])
                }
            }
            $scope.replaceOldData = false;
        }, 100);
    };
    $scope.closeWindow = function () {
        $("#kUI_window").data("kendoWindow").close();
    };
    $scope.removeRelatedPost = function (index) {
        $scope.relatedPost.splice(index, 1);
    };
    $scope.Delete = function () {
        notify.spinerShow();
        $http({
            url: urlDelete,
            method: 'GET',
            params: {
                _articleId: $scope.menuIdChoose
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
            //$scope.menuForDestination = [];
            return;
        }
        notify.spinerShow();
        $http({
            url: urlGetMenuTourByLevel,
            method: 'GET',
            params: {
                _parentMenuId: $scope.filterMenu._menuParent1,
                _level: 2
            }
        }).then(function success(response) {
            notify.spinerHide();
            var data = response.data;
            //$scope.menuForArea = data.menuResult;   
            //$scope.menuDestination = data.menuDestination;   
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
    //        $scope.menuForDestination = response.data.menuDestination;
    //        $scope.menuForDestination.forEach(x => {
    //            var indexExistMenu = $scope.data.W_ThemesMenu.findIndex(y => y.MenuId === x.MenuId);
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
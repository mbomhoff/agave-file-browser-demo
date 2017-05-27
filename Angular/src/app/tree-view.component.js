// Register `phoneList` component, along with its associated controller and template
angular.
  module('agaveFileBrowserDemo').
  component('treeView', {
    template:
        '<tree-node>' +
        '</tree-node>',
    controller: function TreeViewController() {
      this.root = "mbomhoff"
    }
  });

angular.
  module('agaveFileBrowserDemo').
  component('treeNode', {
    template:
        '<ul>' +
          '<li ng-repeat="child in $ctrl.children">' +
            '<span>{{child.name}}</span>' +
          '</li>' +
        '</ul>',
    controller: function TreeNodeController($scope, $http) {
      let url = "https://agave.iplantc.org/files/v2/listings/";
      $http.get(url)
          .then( function(response) {
              $scope.children = [
                {
                  name: 'test1'
                }, {
                  name: 'test2'
                }, {
                  name: 'test3'
                }
              ];
           },
           function(error) {
              console.log('GET error: ', error);
           });
    }
  });
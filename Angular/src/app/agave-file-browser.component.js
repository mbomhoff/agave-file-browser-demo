// Register `phoneList` component, along with its associated controller and template
angular.
  module('agaveFileBrowserDemo').
  component('agaveFileBrowser', {
    template:
        '<h1>Agave File Browser Demo</h1>' +
        '<tree-view></tree-view>',
    controller: function AgaveFileBrowserController() {

    }
  });
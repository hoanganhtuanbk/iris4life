(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .service('PostsService', function (CoreService, Post, gettextCatalog) {
      this.getPosts = function () {
        return Post.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getPost = function (id) {
        return Post.findById({
          id: id
        }).$promise;
      };

      this.upsertPost = function (post) {
        return Post.upsert(post).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Post saved'),
              gettextCatalog.getString('Your post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving post '),
              gettextCatalog.getString('This post could no be saved: ') + err
            );
          }
        );
      };

      this.deletePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Post.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Post deleted'),
                gettextCatalog.getString('Your post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting post'),
                gettextCatalog.getString('Your post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title'),
              required: true
            }
          },
          {
            key: 'description',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Description'),
            }
          },
          {
            key: 'content',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Content'),
              required: true
            }
          },
          {
            key: 'history',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('History'),
              required: true
            }
          },
          {
            key: 'image',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Image')
            }
          },
          {
            key: 'backers',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Backers')
            }
          },
          {
            key: 'video',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Video')
            }
          },
          {
            key: 'moneyRate',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('moneyRate')
            }
          },
          {
            key: 'volumterRate',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('volumterRate')
            }
          },
          {
            key: 'startDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Start Date'),
              required: true
            }
          },

          {
            key: 'endDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('End Date'),
              required: true
            }
          }
        ];
      };

    });

})();

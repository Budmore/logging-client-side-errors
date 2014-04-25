'use strict';

angular.module('errorLabs', ['sentryClient'])

.controller('SentryCtrl', function($scope, $window, $exceptionHandler, serviceExample) {
	$scope.clientName = 'Sentry';

	/**
	 *	@name getList
	 *	@description Promise handle error with $exceptionHandler.
	 */
	$scope.getList = function() {
		serviceExample.getList().then(function() {
			// empty success
		}, function(reason) {
			$exceptionHandler(reason);
		});
	};

	/**
	 *	@name showModal
	 *	@description Undefined method.
	 */
	$scope.showModal = function(modal) {
		$scope.item = modal.open();
	};

	/**
	 *	@name sendFeedback
	 *	@description Send feedback message to Sentry.
	 */
	$scope.sendFeedback = function(message) {
		$window.Raven.captureMessage(message, {tags: { key: 'feedback' }});
		$scope.message = '';
	};

})

.service('serviceExample', function($q){

	/**
	 *	@name getList
	 *	@description Hardcode reject service.
	 */
	this.getList = function() {
		var dfd = $q.defer();

		// Hardcode reject
		dfd.reject('Hardcode error');

		return dfd.promise;
	};

});

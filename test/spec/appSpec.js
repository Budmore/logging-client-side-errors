'use strict';

describe('errorLabs controller', function () {
	var $q, scope, modal, exceptionHandler, serviceExample;

	// load the module
	beforeEach(module('errorLabs'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function($injector, $controller, $rootScope) {
		$q = $injector.get('$q');
		serviceExample = $injector.get('serviceExample');
		exceptionHandler = jasmine.createSpy('$exceptionHandler');
		modal = jasmine.createSpy('modal');
		scope = $rootScope.$new();

		$controller('SentryCtrl', {
			$scope: scope,
			$exceptionHandler: exceptionHandler,
			serviceExample: serviceExample
		});
	}));

	it('should clientName be defined', function() {
		expect(scope.clientName).toBe('Sentry');
	});

	it('should not getList - error handle', function() {
		var failedReason = {};
		var dfd = $q.defer();
		spyOn(serviceExample, 'getList').andReturn(dfd.promise);

		scope.getList();
		dfd.reject(failedReason);
		scope.$digest();

		expect(serviceExample.getList).toHaveBeenCalled();
		expect(exceptionHandler).toHaveBeenCalledWith(failedReason);

	});

	it('should showModal()', function() {
		var mocked = {test:''};
		scope.showModal(mocked);

		expect(scope.item).toBe(mocked.test);
	});

});


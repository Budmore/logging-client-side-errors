/**
 *	@name sentryClient
 *	@description Logging Client Side Errors with Raven-js to the Sentry.
 *
 *	@author Jakub Mach @Budmore
 *	@version v1.3
 *	@date 21 April 2014
 *
 *	http://raven-js.readthedocs.org/en/latest
 */

angular.module('sentryClient', []).factory('$exceptionHandler', ['$window', '$log',
	function ($window, $log) {
		'use strict';

		return function (exception, cause) {

			if ($window.Raven) {
				// Default error handler - display error in the console
				$log.error.apply($log, arguments);

				var href = $window.location.href;
				var viewport = $window.innerWidth + 'x' + $window.innerHeight;

				$window.Raven.captureException( exception, {
					tags: {
						Viewport: viewport,
						Href: href,
					},
					extra: {
						Href: href,
						Cause: cause,
						Status: exception.status,
						Data: exception.config
					}
				});

			} else {
				// Default error handler
				$log.error.apply($log, arguments);
			}
		};
	}
]);

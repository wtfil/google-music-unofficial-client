import {createRoutes} from 'react-router';

export default function createRoutesWithHooks(rawRoutes) {
	const routes = createRoutes(rawRoutes);
	return store => {
		function mix(routes) {
			return routes && routes.map(route => ({
				...route,
				onEnter: route.component && route.component.onEnter && function (props, _, cb) {
					route.component.onEnter(store.dispatch, props)
						.then(() => cb(null))
						.catch(cb);
				},
				childRoutes: mix(route.childRoutes)
			}));
		}
		return mix(routes);
	};
}

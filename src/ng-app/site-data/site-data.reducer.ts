import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import {AppState} from '../app.state';
import {SiteData} from './site-data.model';
import * as siteData from './site-data.actions';
import { initialRoutes } from '../app.routes';
//from server-side php (index.php, single.php) 
//TODO: shard this into just initialSiteData
declare var walInitialState: any;
const initialState: SiteData = {
	title: walInitialState.site_data.title,
	iconUrl: walInitialState.site_data.iconUrl,
	routes: initialRoutes,
	animationData: {
		pageTransitionActive: false,
		blockingAnimations: 0
	},
	pathToIndex: walInitialState.site_data.pathToIndex
	
	
}

export function reducer(state = initialState, action: siteData.Actions): SiteData {
	switch(action.type) {
		case siteData.ActionTypes.ADD_ROUTES: {
			return Object.assign({}, state, {
				routes: [...state.routes, ...action.payload]
			});
		}
		case siteData.ActionTypes.ADD_ANIMATION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations + 1,
					pageTransitionActive: state.animationData.pageTransitionActive
				}
			})
		}
		case siteData.ActionTypes.REMOVE_ANIMATION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations - 1,
					pageTransitionActive: state.animationData.pageTransitionActive
				}
			})
		}
		case siteData.ActionTypes.SET_TRANSITION: {
			return Object.assign({}, state, {
				animationData: {
					blockingAnimations: state.animationData.blockingAnimations,
					pageTransitionActive: action.payload
				}
			})
		}
		default: {
    		return state;
		}
	}

}


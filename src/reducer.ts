import { DashboardType } from './Dashboard/types';
import dashboardReducer from './Dashboard/reducer';
import { DashboardActions } from './Dashboard/actions';

type InitialStateType = {
  dashboard: DashboardType
}

const mainReducer = ({ dashboard }: InitialStateType, action: DashboardActions) =>  ({
  dashboard: dashboardReducer(dashboard, action)
})

export default mainReducer;
import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../../components/containers/AsyncComponent/AsyncComponent';
import { themeClientUrls } from '../../config/clientUrls';

import { fetchPatientOrdersEpic } from './ducks/fetch-patient-orders.duck';
import { fetchPatientOrdersDetailEpic } from './ducks/fetch-patient-orders-detail.duck';
import { fetchPatientOrdersCreateEpic } from './ducks/fetch-patient-orders-create.duck';
import { fetchListOrdersEpic } from './ducks/fetch-list-orders.duck';

import patientsOrders from './ducks/fetch-patient-orders.duck';
import ordersDetail from './ducks/fetch-patient-orders-detail.duck';
import ordersCreate from './ducks/fetch-patient-orders-create.duck';
import listOrders from './ducks/fetch-list-orders.duck';

const epics = combineEpics(fetchPatientOrdersEpic, fetchPatientOrdersDetailEpic, fetchPatientOrdersCreateEpic, fetchListOrdersEpic);
const Orders = asyncComponent(() => import(/* webpackChunkName: "orders" */ './Orders').then(module => module.default));

const reducers = {
  patientsOrders,
  ordersDetail,
  ordersCreate,
  listOrders,
};

const sidebarConfig = { key: 'orders', pathToTransition: '/orders', name: 'Orders', isVisible: true };

const routers = [
  { key: 'orders', component: Orders, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.ORDERS}` },
  { key: 'ordersCreate', component: Orders, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.ORDERS}/create` },
  { key: 'ordersDetail', component: Orders, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.ORDERS}/:sourceId` },
];

export default {
  component: Orders,
  epics, reducers, sidebarConfig, routers,
}


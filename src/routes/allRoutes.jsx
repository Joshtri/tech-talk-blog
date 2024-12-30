// src/routes/allRoutes.js

import publicRoutes from './publicRoutes';
import toolsRoutes from './toolsRoutes';
import videoRoutes from './videoRoutes';

const allRoutes = [
  ...publicRoutes,
  ...toolsRoutes,
  ...videoRoutes,
];

export default allRoutes;

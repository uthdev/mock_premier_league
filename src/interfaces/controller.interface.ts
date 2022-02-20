import { Router } from 'express';

interface Controller {
  path?: string;
  router?: Router;
  service?: any;
}

export default Controller;

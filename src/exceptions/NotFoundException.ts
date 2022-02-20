import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super(404, `${resource} not found`);
  }
}

export default NotFoundException;

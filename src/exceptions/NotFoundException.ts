import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super(404, `${resource} with id ${id} not found`);
  }
}

export default NotFoundException;

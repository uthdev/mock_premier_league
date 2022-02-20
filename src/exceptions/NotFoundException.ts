import HttpException from './HttpException';

class NotFoundException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(resource: string, id: string) {
    super(404, `${resource} not found`);
  }
}

export default NotFoundException;

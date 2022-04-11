import HttpException from './HttpException';

class ResourceAlreadyExistsException extends HttpException {
  constructor(resource: string, name: string) {
    super(409, `${resource} ${name} already exists`);
  }
}

export default ResourceAlreadyExistsException;

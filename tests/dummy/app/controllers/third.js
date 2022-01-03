import Controller from '@ember/controller';

export default class extends Controller {
  queryParams = ['warn'];
  warn = false;
}

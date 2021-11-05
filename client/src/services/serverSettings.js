class ServerSettings {
  constructor() {
    this.api = 'http://localhost:3001/';
  }

  getApi = () => {
    return this.api;
  }
}

export default ServerSettings;
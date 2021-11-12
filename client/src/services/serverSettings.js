const api_url = process.env.API_PORT;

class ServerSettings {
  constructor() {
    this.api = 'http://localhost:3001/';
  }

  getApi = () => {
    return this.api;
  }
}

export default ServerSettings;
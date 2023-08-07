import axios from "axios";

export default class FennelAPIService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "https://api.fennellabs.com/v1/",
    });
  }

  async register(username, password, email) {
    return this.apiClient
      .post("/auth/register/", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      });
  }

  async login(username, password) {
    return this.apiClient
      .post("/auth/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        return response.data;
      });
  }

  async logout() {
    return this.apiClient.post("/auth/logout/");
  }

  async createAPIGroup(api_group_name, authToken) {
    return this.apiClient
      .post(
        "/group/create/",
        {
          api_group_name: api_group_name,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async addUserToAPIGroup(username, api_group_name, authToken) {
    return this.apiClient
      .post(
        "/group/add_user/",
        {
          username: username,
          api_group_name: api_group_name,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async createAccount(api_key, api_secret, authToken) {
    return this.apiClient
      .post(
        "/fennel/create_self_custodial_account/",
        {
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async reconstructSelfCustodialAccount(user_shard, api_key, api_secret, authToken) {
    return this.apiClient
      .post(
        "/fennel/reconstruct_self_custodial_account/",
        {
          user_shard: user_shard,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async getAddress(mnemonic, authToken, api_key, api_secret) {
    return this.apiClient
      .post(
        "/fennel/get_self_custodial_account_address/",
        {
          mnemonic: mnemonic,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async downloadAccountAsJson(user_shard, api_key, api_secret, auth_token) {
    return this.apiClient
      .post(
        "/fennel/download_self_custodial_account_as_json/",
        {
          user_shard: user_shard,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async getAccountsBillableCount(api_group_name, auth_token) {
    return this.apiClient
      .post(
        "/group/get_accounts_billable_count/",
        {
          api_group_name: api_group_name,
        },
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  async getAPIGroupRequestCount(api_group_name, auth_token) {
    return this.apiClient
      .post(
        "/group/get_api_group_requests_count/",
        {
          api_group_name: api_group_name,
        },
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }
}

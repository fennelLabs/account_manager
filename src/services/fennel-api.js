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
        return {
          success: true,
          token: response.data.token,
        };
      });
  }

  async login(username, password) {
    return this.apiClient
      .post("/auth/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        return {
          success: true,
          token: response.data.token,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async logout() {
    return this.apiClient
      .post("/auth/logout/")
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async changePassword(old_password, new_password, authToken) {
    return this.apiClient

      .post(
        "/auth/change_password/",
        {
          old_password: old_password,
          new_password: new_password,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async resetPassword(email) {
    return this.apiClient
      .post("/auth/reset_password/", {
        email: email,
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async resetPasswordConfirm(token, new_password) {
    return this.apiClient
      .post("/auth/reset_password_confirm/", {
        token: token,
        new_password: new_password,
      })
      .then((_) => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async createAPIGroup(api_group_name, email, authToken) {
    return this.apiClient
      .post(
        "/group/create/",
        {
          api_group_name: api_group_name,
          email: email,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then((response) => {
        return {
          success: true,
          api_group_name: response.data.api_group_name,
          api_key: response.data.api_key,
          api_secret: response.data.api_secret,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async addUserToAPIGroup(
    username,
    api_group_name,
    api_key,
    api_secret,
    authToken
  ) {
    return this.apiClient
      .post(
        "/group/add_user/",
        {
          username: username,
          api_group_name: api_group_name,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async removeUserFromAPIGroup(
    username,
    api_group_name,
    api_key,
    api_secret,
    authToken
  ) {
    return this.apiClient
      .post(
        "/group/remove_user/",
        {
          username: username,
          api_group_name: api_group_name,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async addAdminToAPIGroup(
    username,
    api_group_name,
    api_key,
    api_secret,
    authToken
  ) {
    return this.apiClient

      .post(
        "/group/add_admin/",
        {
          username: username,
          api_group_name: api_group_name,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async removeAdminFromAPIGroup(
    username,
    api_group_name,
    api_key,
    api_secret,
    authToken
  ) {
    return this.apiClient
      .post(
        "/group/remove_admin/",
        {
          username: username,
          api_group_name: api_group_name,
          api_key: api_key,
          api_secret: api_secret,
        },
        {
          headers: {
            Authorization: "Token " + authToken,
          },
        }
      )
      .then(() => {
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async createAccount(api_key, api_secret, authToken) {
    return this.apiClient
      .post(
        "/onetrust/create_self_custodial_account/",
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
        return {
          success: true,
          user_shard: response.data.user_shard,
          recovery_shard: response.data.recovery_shard,
          address: response.data.address,
          public_key: response.data.public_key,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async reconstructSelfCustodialAccount(
    user_shard,
    api_key,
    api_secret,
    authToken
  ) {
    return this.apiClient
      .post(
        "/onetrust/reconstruct_self_custodial_account/",
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
        return {
          success: true,
          mnemonic: response.data.mnemonic,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }

  async downloadAccountAsJson(user_shard, api_key, api_secret, auth_token) {
    return this.apiClient
      .post(
        "/onetrust/download_self_custodial_account_as_json/",
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
        return {
          success: true,
          json: response.data.json,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
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
        return {
          success: true,
          count: response.data.count,
        };
      })
      .catch((error) => {
        return {
          success: false,
          error: error.response.data.error,
        };
      });
  }
}

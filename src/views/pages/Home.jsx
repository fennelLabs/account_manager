import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Stack from "react-bootstrap/Stack";

import { useServices } from "../../contexts/ServiceContext";

import RegisterForm from "../components/RegisterForm";

export default function Home() {
  const services = useServices();

  const [key, setKey] = useState("register");
  const [usageAccountsError, setUsageAccountsError] = useState("");
  const [usageRequestsError, setUsageRequestsError] = useState("");

  const [accountMessage, setAccountMessage] = useState("");
  const [apiGroupName, setApiGroupName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [userShard, setUserShard] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [address, setAddress] = useState("");
  const [json, setJson] = useState("");

  const [accounts, setAccounts] = useState(0);
  const [requests, setRequests] = useState(0);

  const updateUsage = () => {
    if (authToken === "") {
      return;
    }
    if (apiGroupName === "") {
      return;
    }
    services.fennelAPI
      .getAccountsBillableCount(apiGroupName, authToken)
      .then((response) => {
        setAccounts(response.count);
        setUsageAccountsError("");
      })
      .catch(() => {
        setUsageAccountsError("Couldn't get accounts for this API group.");
      });
    services.fennelAPI
      .getAPIGroupRequestCount(apiGroupName, authToken)
      .then((response) => {
        setRequests(response.count);
        setUsageRequestsError("");
      })
      .catch(() => {
        setUsageRequestsError("Couldn't get requests for this API group.");
      });
  };

  const onSubmitRegister = async (username, password, email) => {
    await services.fennelAPI
      .register(username, password, email)
      .then((response) => {
        setAuthToken(response.token);
        setKey("settings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function createNewAccount() {
    services.fennelAPI
      .createAccount(apiKey, apiSecret, authToken)
      .then((response) => {
        setUserShard(response.user_shard);
        setAccountMessage(
          "Account created successfully. Your share of the key is saved safely on your device, and only on your device. You can ONLY recover your wallet with that share."
        );
      })
      .catch((error) => {
        console.log(error);
        setAccountMessage("Account creation failed.");
      });
  }

  const createAPIGroup = () => {
    services.fennelAPI
      .createAPIGroup(apiGroupName, authToken)
      .then((response) => {
        setApiKey(response.api_key);
        setApiSecret(response.api_secret);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function reconstructSelfCustodialAccount() {
    services.fennelAPI
      .reconstructSelfCustodialAccount(userShard, apiKey, apiSecret, authToken)
      .then((response) => {
        setMnemonic(response.mnemonic);
      })
      .catch((error) => {
        console.log(error);
        setMnemonic("Couldn't get mnemonic.");
      });
  }

  function getAddress() {
    console.log(mnemonic);
    services.fennelAPI
      .getAddress(mnemonic, authToken, apiKey, apiSecret)
      .then((response) => {
        setAddress(response.address);
      })
      .catch((error) => {
        console.log(error);
        setAddress("Couldn't get address.");
      });
  }

  function downloadAccountAsJson() {
    services.fennelAPI
      .downloadAccountAsJson(userShard, apiKey, apiSecret, authToken)
      .then((response) => {
        setJson(response.json);
      })
      .catch((error) => {
        console.log(error);
        setJson("Couldn't get JSON.");
      });
  }

  const changeApiGroupName = (event) => {
    setApiGroupName(event.target.value);
  };

  const changeApiKey = (event) => {
    setApiKey(event.target.value);
  };

  const changeApiSecret = (event) => {
    setApiSecret(event.target.value);
  };

  return (
    <div>
      <h1>Fennel Network - Demonstration Application</h1>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="tabs"
        className="mb-3"
      >
        <Tab eventKey="register" title="Register">
          <h2>Registration</h2>
          <RegisterForm onSubmit={onSubmitRegister} />
        </Tab>
        <Tab eventKey="account" title="Account">
          <h2>Account</h2>
          <Stack direction="horizontal" gap={3}>
            <div>
              <ButtonGroup vertical>
                <Button onClick={createNewAccount}>Create Account</Button>
                <Button onClick={reconstructSelfCustodialAccount}>
                  Get Mnemonic
                </Button>
                <Button onClick={getAddress}>Get Address</Button>
                <Button onClick={downloadAccountAsJson}>Download JSON</Button>
              </ButtonGroup>
            </div>
            <div>
              <Stack gap={3}>
                <div>{accountMessage}</div>
                <div>{mnemonic}</div>
                <div>{address}</div>
                <div>{json}</div>
              </Stack>
            </div>
          </Stack>
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <h1>Settings</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="api_group_name">API Group Name</Form.Label>
              <Form.Control
                type="text"
                name="api_group_name"
                onChange={changeApiGroupName}
                value={apiGroupName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="api_key">API Key</Form.Label>
              <Form.Control
                type="text"
                name="api_key"
                onChange={changeApiKey}
                value={apiKey}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="api_secret">API Secret</Form.Label>
              <Form.Control
                type="text"
                name="api_secret"
                onChange={changeApiSecret}
                value={apiSecret}
              />
            </Form.Group>
            <Button onClick={createAPIGroup}>Create API Group</Button>
          </Form>
        </Tab>
        <Tab eventKey="usage" title="Usage">
          <h1>Usage</h1>
          {usageAccountsError}
          {usageRequestsError}
          <div>Accounts: {accounts}</div>
          <div>Requests: {requests}</div>
          <Button onClick={updateUsage}>Update Usage</Button>
        </Tab>
      </Tabs>
    </div>
  );
}

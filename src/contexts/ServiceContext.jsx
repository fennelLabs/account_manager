import React from "react";

import FennelAPIService from "../services/fennel-api";

const services = {
    fennelAPI: new FennelAPIService(),
};

const ServiceContext = React.createContext(services);

export const useServices = () => React.useContext(ServiceContext);

export const ServiceContextProvider = ({ children }) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
}
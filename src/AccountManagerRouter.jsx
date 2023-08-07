import React from "react";
import { Route, Routes } from "react-router-dom";

import PageContainer from "./views/components/PageContainer";

import Home from "./views/pages/Home";

export default function AccountManagerRouter() {
  return (
    <div>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PageContainer>
    </div>
  );
}

import React from "react";

function PageContainer(props) {
  return (
    <main className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
      {props.children}
    </main>
  );
}

export default PageContainer;

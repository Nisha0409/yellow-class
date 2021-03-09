import React from "react";

import styled from "styled-components";

const Loading = styled.div`
&& {
  color: blue;
}
`

export const Loader = () => {
  return (
    <Loading>
      <div className="loading">
      </div>
    </Loading>
  );
};

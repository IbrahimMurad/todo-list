import React from "react";
import styled, { css } from "styled-components";

const StyledCheckCircle = styled.div<{ $checked?: boolean }>`
  min-width: 1.5rem;
  min-height: 1.5rem;
  display: block;
  cursor: pointer;
  border: ${({ $checked }) =>
    $checked ? "none" : "2px solid var(--outline-primary)"};
  border-radius: 50%;
  position: relative;

  ${(props) =>
    props.$checked &&
    css`
      background-image: var(--check-background);
    `}

  &&:hover {
    ${({ $checked }) =>
      !$checked &&
      css`
        border: 2px solid transparent;
        background: linear-gradient(
              var(--primary-background),
              var(--primary-background)
            )
            padding-box,
          var(--check-background) border-box;
      `}
  }

  &&::before {
    ${(props) =>
      props.$checked &&
      css`
        content: "";
        position: absolute;
        top: 0.32rem;
        left: 0.3rem;
        width: 1rem;
        height: 1rem;
        background-color: transparent;
        background-image: url("/_next/static/media/icon-check.5b02c047.svg");
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 50%;
      `}
  }
`;

export default function CheckCircle({
  completed,
}: {
  completed: boolean;
}): React.ReactElement {
  return <StyledCheckCircle $checked={completed}></StyledCheckCircle>;
}

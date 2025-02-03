import React from "react";
import styled, { css } from "styled-components";
import CheckIcon from "@/app/images/icon-check.svg";
import Image from "next/image";

const StyledCheckCircle = styled.button<{ $checked?: boolean }>`
  min-width: 1.5rem;
  min-height: 1.5rem;
  display: block;
  cursor: pointer;
  border: ${({ $checked }) =>
    $checked ? "none" : "2px solid var(--outline-primary)"};
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

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
`;

export default function CheckCircle({
  completed,
  onClick,
}: {
  completed: boolean;
  onClick?: () => void;
}): React.ReactElement {
  return (
    <StyledCheckCircle $checked={completed} onClick={onClick}>
      <Image
        src={CheckIcon}
        alt="Check Icon"
        width="16"
        height="16"
        className={`${!completed && "hidden"}`}
      />
    </StyledCheckCircle>
  );
}

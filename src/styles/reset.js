import { css } from 'styled-components';

const resetStyle = css`
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    -moz-tab-size: 4;
    tab-size: 4;
    --ck-border-radius: 0.8rem;
  }

  html,
  body {
    height: 100%;
  }

  img,
  video,
  svg {
    display: block;
    max-width: 100%;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  strong {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }

  .ck-editor__editable_inline {
    min-height: 26rem;
  }
`;

export default resetStyle;

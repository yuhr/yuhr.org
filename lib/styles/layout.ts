import css from "styled-jsx/css"
export default css`
  .skip-with-style {
    display: block;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
  main {
    text-align: justify;
    margin: 4rem;
    -webkit-hyphens: auto;
    hyphens: auto;
    word-break: keep-all;
    line-break: strict;
    word-wrap: break-word;
    overflow-wrap: break-word;
    user-select: text;
  }
  code {
    font-family: Code;
    -webkit-hyphens: none;
    hyphens: none;
  }
  p {
    margin: 1rem 0;
    font-feature-settings: "liga", "dlig";
  }
  section {
    margin: 2rem auto;
  }
  figure {
    margin: 4rem auto;
  }
  header {
    font-weight: 500;
    text-rendering: geometricPrecision;
    font-kerning: none;
    text-align: center;
    margin: 6rem;
    & section {
      & h1 {
        & > * {
          display: block;
          margin: 0.5rem 0;
          line-height: 1em;
          letter-spacing: 0.25em;
        }
        & strong {
          font-size: 2.5rem;
          font-weight: 500;
          transform: scale(1, 0.9);
        }
        & small {
          font-size: 1rem;
          font-weight: 400;
          text-transform: uppercase;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    header,
    main {
      margin: 4rem 1rem;
    }
    header {
      letter-spacing: 0.125em;
    }
  }
`
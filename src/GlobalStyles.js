import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --c-dark: #292826;
        --c-green: #0a7029;
        --c-yellow: #fede00;
        --c-lemon: #c8df52;
        --c-light: #dbe8d8;
        --c-max-1: #f00;
        --c-max-2: #c00;
        --c-min-1: #00f;
        --c-min-2: #00c;
    }
    * {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`
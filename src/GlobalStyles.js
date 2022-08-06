import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --c-dark: #292826;
        --c-green: #0a7029;
        --c-yellow: #fede00;
        --c-lemon: #c8df52;
        --c-light: #dbe8d8;
    }
    * {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`
// https://vite.dev/guide/assets.html#importing-asset-as-string
declare module '*.html?raw' {
    const value: string;
    export default value
}
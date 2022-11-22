export const genID = () => {
  let dt = Date.now();
  const mask = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

  const replaceFunc = (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : ( r & 0x3 | 0x8 )).toString(16);
  }

  return mask.replace(/[xy]/g, replaceFunc);
};
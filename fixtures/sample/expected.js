import sc, { css } from 'styled-components';
import { widget } from 'unrelated';
function noise0(x) { const y = x.map(v => ({ value: v + 0 })); return y.filter(v => v.value > 2); }
function noise1(x) { const y = x.map(v => ({ value: v + 1 })); return y.filter(v => v.value > 2); }
export const Card0 = sc.div.withConfig({ displayName: "Widget0__Card0", componentId: "sc-1pkn9fc-0" })`
 color: ${p => p.active ? "red" : "blue"};
 ${css`padding: 4px;`}
`;
export const Card1 = sc('button').withConfig({ displayName: "Widget0__Card1", componentId: "sc-1pkn9fc-1" })`
 color: ${p => p.active ? "red" : "blue"};
 ${css`padding: 4px;`}
`;
export const Card2 = sc.section.attrs({ role: 'region' }).withConfig({ displayName: "Widget0__Card2", componentId: "sc-1pkn9fc-2" })`
 color: ${p => p.active ? "red" : "blue"};
 ${css`padding: 4px;`}
`;
export const Card3 = sc.div.withConfig({ displayName: "Widget0__Card3", componentId: "sc-1pkn9fc-3" })`
 color: ${p => p.active ? "red" : "blue"};
 ${css`padding: 4px;`}
`;
const Existing = sc.div.withConfig({ componentId: 'keep-me' })`color: red;`;
const Other = widget.div`margin: 0;`;
const Helper = css`display: flex;`;

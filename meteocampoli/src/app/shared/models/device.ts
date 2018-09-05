// src/model/device.ts
//il punto di domanda (?) indica che la proprietà sarà facoltativa. Sarebbe preferibile evitarlo
// in un contesto reale ma, ai fini didattici, se ipotizziamo di non gestire tutte le proprietà di un device,
// come in questo scenario,
// è preferibile utilizzare questo approccio per evitare errori del compiler.
export interface Device {
  id?: number;
  label?: string;
  os?: string;
  price?: number;
  memory?: number;
  rate?: number;
  desc?: string;
}

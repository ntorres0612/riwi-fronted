export type TrackingInfo = {
  status: 'EN_CAMINO' | 'PENDIENTE' | 'ENTREGADO';
  eta: string;
  carrier: string;
};

export type ChatResponse = {
  answer: string | TrackingInfo;
  source: 'rules' | 'llm' | 'fallback';
  meta?: { durationMs: number };
};
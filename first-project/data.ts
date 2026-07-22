export type CarPart = {
  id: string;
  name: string;
  utility: string;
  accentColor: string;
  visualCode: string;
  modelKind: 'engine' | 'caliper' | 'spoiler';
};

export const CAR_PARTS: CarPart[] = [
  {
    id: '1',
    name: 'Engine',
    visualCode: 'V8',
    accentColor: '#8A2D3B',
    modelKind: 'engine',
    utility:
      'The heart of the car, the engine converts fuel into motion. In sports cars, engines are optimized for high power output and responsiveness, often featuring technologies like turbocharging or high-revving capabilities.',
  },
  {
    id: '2',
    name: 'Brake Caliper',
    visualCode: 'ABS',
    accentColor: '#1F6F68',
    modelKind: 'caliper',
    utility:
      'A critical component of the braking system. High-performance calipers, often larger and made from advanced materials, provide superior stopping power and heat dissipation required for high-speed driving.',
  },
  {
    id: '3',
    name: 'Spoiler',
    visualCode: 'AERO',
    accentColor: '#A2632C',
    modelKind: 'spoiler',
    utility:
      'An aerodynamic device whose purpose is to "spoil" unfavorable air movement across the body of a vehicle in motion. On sports cars, it increases downforce, improving stability at high speeds.',
  },
];

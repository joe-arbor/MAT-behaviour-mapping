import './coloursShowcase.scss';

type ColorRow = { token: string; value: string };

function ColorTable({
  title,
  rows,
}: {
  title: string;
  rows: ColorRow[];
}) {
  return (
    <section className="colours-showcase__section">
      <h2 className="colours-showcase__heading">{title}</h2>
      <table className="colours-showcase__table">
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ token, value }) => (
            <tr key={token}>
              <td>
                <div className="colours-showcase__swatch-cell">
                  <div
                    className="colours-showcase__swatch"
                    style={{ backgroundColor: `var(${token})` }}
                  />
                </div>
              </td>
              <td className="colours-showcase__token">{token}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ColoursShowcase() {
  const grey: ColorRow[] = [
    { token: '--color-grey-050', value: '#f8f8f8' },
    { token: '--color-grey-100', value: '#efefef' },
    { token: '--color-grey-200', value: '#dfdfdf' },
    { token: '--color-grey-300', value: '#d1d1d1' },
    { token: '--color-grey-400', value: '#b3b3b3' },
    { token: '--color-grey-500', value: '#7e7e7e' },
    { token: '--color-grey-600', value: '#595959' },
    { token: '--color-grey-700', value: '#474747' },
    { token: '--color-grey-800', value: '#3b3b3b' },
    { token: '--color-grey-900', value: '#2f2f2f' },
  ];

  const mono: ColorRow[] = [
    { token: '--color-mono-black', value: '#202020' },
    { token: '--color-mono-white', value: '#ffffff' },
  ];

  const brand: ColorRow[] = [
    { token: '--color-brand-050', value: '#f0faf3' },
    { token: '--color-brand-100', value: '#ceefd5' },
    { token: '--color-brand-200', value: '#a7e1b3' },
    { token: '--color-brand-300', value: '#7ed28e' },
    { token: '--color-brand-400', value: '#5ec171' },
    { token: '--color-brand-500', value: '#3cad51' },
    { token: '--color-brand-600', value: '#0e8a0e' },
    { token: '--color-brand-700', value: '#0b800b' },
    { token: '--color-brand-800', value: '#005700' },
    { token: '--color-brand-900', value: '#024002' },
  ];

  const semanticInfo: ColorRow[] = [
    { token: '--color-semantic-info-050', value: '#f5fbff' },
    { token: '--color-semantic-info-100', value: '#c7e3f4' },
    { token: '--color-semantic-info-300', value: '#6db5e3' },
    { token: '--color-semantic-info-500', value: '#2c8bca' },
    { token: '--color-semantic-info-600', value: '#1c77b4' },
    { token: '--color-semantic-info-700', value: '#024f83' },
    { token: '--color-semantic-info-800', value: '#053a61' },
    { token: '--color-semantic-info-900', value: '#021a2b' },
  ];

  const semanticCaution: ColorRow[] = [
    { token: '--color-semantic-caution-050', value: '#fffdf5' },
    { token: '--color-semantic-caution-100', value: '#fff3d0' },
    { token: '--color-semantic-caution-300', value: '#ffd45b' },
    { token: '--color-semantic-caution-500', value: '#edae06' },
    { token: '--color-semantic-caution-600', value: '#c18900' },
    { token: '--color-semantic-caution-700', value: '#7d5400' },
    { token: '--color-semantic-caution-800', value: '#613f00' },
  ];

  const semanticSuccess: ColorRow[] = [
    { token: '--color-semantic-success-050', value: '#f5fff8' },
    { token: '--color-semantic-success-100', value: '#d7f9e0' },
    { token: '--color-semantic-success-300', value: '#66cd84' },
    { token: '--color-semantic-success-500', value: '#16a33d' },
    { token: '--color-semantic-success-600', value: '#078427' },
    { token: '--color-semantic-success-700', value: '#026319' },
    { token: '--color-semantic-success-800', value: '#003508' },
  ];

  const semanticWarning: ColorRow[] = [
    { token: '--color-semantic-warning-050', value: '#fffaf5' },
    { token: '--color-semantic-warning-100', value: '#ffe8d0' },
    { token: '--color-semantic-warning-300', value: '#ffa24a' },
    { token: '--color-semantic-warning-500', value: '#e4720d' },
    { token: '--color-semantic-warning-600', value: '#b85605' },
    { token: '--color-semantic-warning-700', value: '#a74102' },
    { token: '--color-semantic-warning-800', value: '#611f00' },
    { token: '--color-semantic-warning-900', value: '#451600' },
  ];

  const semanticDestructive: ColorRow[] = [
    { token: '--color-semantic-destructive-050', value: '#fff5f5' },
    { token: '--color-semantic-destructive-100', value: '#ffe2e2' },
    { token: '--color-semantic-destructive-300', value: '#e86565' },
    { token: '--color-semantic-destructive-500', value: '#c93232' },
    { token: '--color-semantic-destructive-600', value: '#a62323' },
    { token: '--color-semantic-destructive-700', value: '#920a0a' },
    { token: '--color-semantic-destructive-800', value: '#610202' },
    { token: '--color-semantic-destructive-900', value: '#360000' },
  ];

  const chart: ColorRow[] = [
    { token: '--color-chart-colours-red-1', value: '#fa6969' },
    { token: '--color-chart-colours-red-2', value: '#ff8b8b' },
    { token: '--color-chart-colours-blue-1', value: '#50b4f4' },
    { token: '--color-chart-colours-blue-2', value: '#7acbff' },
    { token: '--color-chart-colours-teal-1', value: '#6eeae2' },
    { token: '--color-chart-colours-teal-2', value: '#93f8f2' },
    { token: '--color-chart-colours-green-1', value: '#70cc12' },
    { token: '--color-chart-colours-green-2', value: '#009d00' },
    { token: '--color-chart-colours-green-3', value: '#aaea0f' },
    { token: '--color-chart-colours-green-4', value: '#005f00' },
    { token: '--color-chart-colours-orange-1', value: '#ffb62c' },
    { token: '--color-chart-colours-orange-2', value: '#f8c867' },
    { token: '--color-chart-colours-purple-1', value: '#ba9eea' },
    { token: '--color-chart-colours-purple-2', value: '#cbaffb' },
    { token: '--color-chart-colours-yellow-1', value: '#ffd950' },
    { token: '--color-chart-colours-yellow-2', value: '#ffe790' },
  ];

  const extended: ColorRow[] = [
    { token: '--color-extended-colours-blue-050', value: '#e1eef5' },
    { token: '--color-extended-colours-blue-100', value: '#c6e1ef' },
    { token: '--color-extended-colours-blue-500', value: '#50b4f4' },
    { token: '--color-extended-colours-blue-800', value: '#003d69' },
    { token: '--color-extended-colours-teal-050', value: '#e4f4f3' },
    { token: '--color-extended-colours-teal-100', value: '#cbefed' },
    { token: '--color-extended-colours-teal-500', value: '#6eeae2' },
    { token: '--color-extended-colours-teal-800', value: '#0a685b' },
    { token: '--color-extended-colours-green-050', value: '#d7ebd2' },
    { token: '--color-extended-colours-green-100', value: '#c6e8be' },
    { token: '--color-extended-colours-green-500', value: '#009d00' },
    { token: '--color-extended-colours-green-800', value: '#002a00' },
    { token: '--color-extended-colours-orange-050', value: '#f7eed8' },
    { token: '--color-extended-colours-orange-100', value: '#efe0bc' },
    { token: '--color-extended-colours-orange-500', value: '#ffb62c' },
    { token: '--color-extended-colours-orange-800', value: '#7e3e00' },
    { token: '--color-extended-colours-purple-050', value: '#eeebf4' },
    { token: '--color-extended-colours-purple-100', value: '#e2dcef' },
    { token: '--color-extended-colours-purple-500', value: '#ba9eea' },
    { token: '--color-extended-colours-purple-800', value: '#472b61' },
    { token: '--color-extended-colours-salmon-050', value: '#f6e5e1' },
    { token: '--color-extended-colours-salmon-100', value: '#f4d8d1' },
    { token: '--color-extended-colours-salmon-500', value: '#fa6969' },
    { token: '--color-extended-colours-salmon-800', value: '#7a0100' },
    { token: '--color-extended-colours-yellow-050', value: '#f7f2dd' },
    { token: '--color-extended-colours-yellow-100', value: '#ede6c7' },
    { token: '--color-extended-colours-yellow-500', value: '#ffd950' },
    { token: '--color-extended-colours-yellow-800', value: '#7e5a00' },
  ];

  return (
    <div className="colours-showcase">
      <ColorTable title="Grey" rows={grey} />
      <ColorTable title="Mono" rows={mono} />
      <ColorTable title="Brand" rows={brand} />
      <ColorTable title="Semantic — Info" rows={semanticInfo} />
      <ColorTable title="Semantic — Caution" rows={semanticCaution} />
      <ColorTable title="Semantic — Success" rows={semanticSuccess} />
      <ColorTable title="Semantic — Warning" rows={semanticWarning} />
      <ColorTable title="Semantic — Destructive" rows={semanticDestructive} />
      <ColorTable title="Chart colours" rows={chart} />
      <ColorTable title="Extended colours" rows={extended} />
    </div>
  );
}

import { h } from 'preact';

export const Legend = ({ items, colors }) => {
  return (
    <div className="chart-legend chart-legend--inline justify-content-start">
      <ul className="chart-legend__list">
        {items.map((item, i) => (
          <li className="chart-legend__item">
            <span
              className="chart-legend__icon"
              style={{
                background: colors[i]
              }}
            ></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PercentBarChart = ({ labels, datasets, colors }) => {
  const data = datasets[0].data.map((value, i) => ({
    label: labels[i],
    value
  }));

  const total = data.reduce((num, { value }) => (num += value), 0);
  const getPercentage = (value, total) => (value / total) * 100;

  const sortedData = data.sort((a, b) => a.value - b.value);
  const sortedLabels = data.map(data => data.label);

  return (
    <div>
      <div className="percent-bar">
        {sortedData.map((data, i) => {
          const percent = getPercentage(data.value, total);
          const width = percent.toFixed(2);
          const label = Math.floor(percent);
          return (
            <div
              key={i}
              className="percent-bar__item"
              style={{
                width: width + '%'
              }}
            >
              <div
                className="percent-bar__fill"
                style={{
                  background: colors[i]
                }}
              ></div>
              <span className="percent-bar__label">{label}%</span>
            </div>
          );
        })}
      </div>
      <Legend items={sortedLabels} colors={colors} />
    </div>
  );
};

export default PercentBarChart;

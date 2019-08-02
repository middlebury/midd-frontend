import { h, render } from 'preact';
import PercentBarChart from './components/percent-bar-chart';

const colors = [
  '#0d395f',
  '#1f9f8b',
  '#c26533',
  '#8f9a17',
  '#f4b824',
  '#763649',
  '#D3B885',
  '#907036'
];

let Chart = window.Chart;

function renderPercentBarChart(el, config) {
  el.classList.add('chart--singlebar', 'chart--axis');
  render(<PercentBarChart {...config} colors={colors} />, el);
}

class MiddChart {
  constructor(el, config) {
    this.el = el;
    this.config = config;

    this.isGroupChart = config.datasets.length > 1;
    this.isCircleChart = config.type === 'pie' || config.type === 'doughnut';

    if (config.type === 'percentBar') {
      return renderPercentBarChart(el, config);
    }

    this.init();
  }

  setDefaultGlobals() {
    // Chart.defaults.global.elements.line.tension = 0;

    Chart.defaults.global.defaultFontColor = '#222';
    Chart.defaults.global.defaultFontFamily =
      'whitney ssm a, whitney ssm b, arial, verdana, sans-serif';
    Chart.defaults.global.defaultFontSize = 14;

    Chart.defaults.doughnut.cutoutPercentage = 80;
  }

  getBaseOptions() {
    const {
      title,
      type,
      valuePrefix = '',
      valueSuffix = '',
      max,
      min,
      xLabel,
      yLabel
    } = this.config;

    const maxBarThickness = this.isGroupChart ? 16 : 32;
    const isHorizontalBars = type === 'horizontalBar';
    const isAxisChart = isHorizontalBars || type === 'bar' || type === 'line';

    const prefixTick = value => `${valuePrefix}${value}${valueSuffix}`;

    const xTickCallback = isHorizontalBars ? prefixTick : f => f;
    const yTickCallback = !isHorizontalBars ? prefixTick : f => f;

    let options = {
      plugins: {
        deferred: {
          yOffset: '25%', // defer until 50% of the canvas height are inside the viewport
          delay: 200 // delay of 500 ms after the canvas is considered inside the viewport
        }
      },
      maintainAspectRatio: true,
      legend: {
        display: false, // remove legend since we're trying to use html legend
        // display: groupedChart || !isBars,
        position: 'bottom',
        labels: {
          fontSize: 14,
          fontColor: '#222'
        }
      },
      tooltips: {
        displayColors: false,
        backgroundColor: '#fff',
        titleFontColor: '#222',
        titleFontSize: 16,
        bodyFontColor: '#222',
        bodyFontSize: 14,
        yPadding: 8,
        xPadding: 8,
        caretSize: 0,
        cornerRadius: 0,
        borderWidth: 1,
        borderColor: '#ccc'
      },
      elements: {
        point: {
          radius: 4
        },
        line: {
          borderWidth: 1,
          tension: 0,
          fill: false
        }
      }
    };

    if (title !== '') {
      options.title = {
        display: true,
        text: title,
        fontSize: 14,
        fontColor: '#222',
        fontStyle: '500',
        fontFamily: 'whitney ssm a, whitney ssm b, arial, sans-serif',
        padding: 24
      };
    }

    if (isAxisChart) {
      options.scales = {
        xAxes: [
          {
            scaleLabel: {
              display: !!xLabel,
              labelString: xLabel
            },
            maxBarThickness,
            ticks: {
              suggestedMax: max,
              suggestedMin: min,
              beginAtZero: !min,
              callback: xTickCallback
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: !!yLabel,
              labelString: yLabel
            },
            maxBarThickness,
            ticks: {
              suggestedMax: max,
              suggestedMin: min,
              beginAtZero: !min,
              callback: yTickCallback
            }
          }
        ]
      };
    }

    return options;
  }

  getItemColor(i) {
    if (this.isCircleChart) {
      return colors;
    } else {
      return colors[i];
    }
  }

  init() {
    this.setDefaultGlobals();
    this.draw();
  }

  draw() {
    this.el.classList.add('chart--loaded');

    const { labels, datasets, type } = this.config;

    this.el.classList.add('chart', `chart--${type}`);

    if (type === 'bar' || type === 'horizontalBar' || type === 'line') {
      this.el.classList.add('chart--axis');
    }

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '500px';
    this.canvas.style.height = '400px';

    this.el.appendChild(this.canvas);

    const options = this.getBaseOptions();

    this.chart = new Chart(this.canvas, {
      type,
      data: {
        datasets: datasets.map((d, i) => {
          const color = this.getItemColor(i);
          return {
            ...d,
            borderColor: type === 'line' ? color : 'white',
            backgroundColor: color
          };
        }),
        labels
      },
      options
    });

    this.addLegend();
  }

  addLegend() {
    // do not show single dataset legend label
    if (!this.isGroupChart && !this.isCircleChart) {
      return;
    }

    // add html legend
    const legend = this.chart.generateLegend();
    const legendtag = document.createElement('div');
    legendtag.innerHTML = legend;

    // add classes for better styling
    legendtag.classList.add('chart-legend');
    legendtag.querySelector('ul').classList.add('chart-legend__list');
    legendtag.querySelectorAll('li').forEach(li => {
      li.classList.add('chart-legend__item');
      li.querySelector('span').classList.add('chart-legend__icon');
    });

    this.el.appendChild(legendtag);
  }
}

function parseJsonData(data) {
  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    console.error('problem parsing json:', data);
  }

  return result;
}

function parseConfig(el) {
  let { datasets, labels, chart: type, ...rest } = el.dataset;

  return {
    ...rest,
    datasets: parseJsonData(datasets),
    labels: parseJsonData(labels),
    type
  };
}

const els = document.querySelectorAll('[data-chart]');
els.forEach(el => new MiddChart(el, parseConfig(el)));

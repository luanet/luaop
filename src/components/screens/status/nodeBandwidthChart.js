import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import filesize from 'filesize';
import withData from '@utils/withData';
import getNodeStats from '@api/node';
import Box from '@toolbox/box';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import styles from './status.css';

// matching units returned by 'ipfs stats bw' in CLI
const bwUnits = {
  standard: 'iec',
  base: 2,
  bits: false,
};

const chartsize = filesize.partial({ round: 1, exponent: 2, ...bwUnits });
const tootltipSize = filesize.partial({ round: 0, output: 'array', ...bwUnits });

const defaultSettings = {
  defaultFontFamily: "'Inter UI', system-ui, sans-serif",
  responsive: true,
  tooltips: {
    mode: 'x',
    position: 'nearest',
    enabled: false,
  },
  hover: { mode: 'index' },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        minUnit: 'second',
      },
    }],
    yAxes: [{
      stacked: true,
      ticks: {
        callback: v => `${chartsize(v)} /s`,
        suggestedMax: 200000,
        maxTicksLimit: 5,
      },
    }],
  },
  legend: {
    reverse: true,
    display: true,
    position: 'bottom',
  },
};

const Tooltip = ({
  t, bw, show, pos,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="sans-serif absolute bg-white pa2 br3"
      style={{
        top: `${pos.top + window.scrollY}px`,
        left: `${pos.left}px`,
        transform: 'translateY(calc(-100% - 20px))',
        filter: 'drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.2))',
      }}
    >
      <div
        className="absolute"
        style={{
          bottom: '-14px',
          left: '0',
          width: '0',
          height: '0',
          borderTop: '20px solid white',
          borderRight: '20px solid transparent',
        }}
      />
      <div className="dt">
        <div className="dt-row">
          <span className="dtc f7 charcoal tr">
            {t('In').toLowerCase()}
            :
          </span>
          <span className="f4 ml1 charcoal-muted">
            {bw.in[0]}
          </span>
          <span className="f7 charcoal-muted">
            {bw.in[1]}
            /s
          </span>
        </div>
        <div className="dt-row">
          <span className="dtc f7 charcoal tr">
            {t('Out').toLowerCase()}
            :
          </span>
          <span className="f4 ml1 charcoal-muted">
            {bw.out[0]}
          </span>
          <span className="f7 charcoal-muted">
            {bw.out[1]}
            /s
          </span>
        </div>
      </div>
    </div>
  );
};

class NodeBandwidthChart extends React.Component {
  // getTooltip adds the tooltip element to the DOM if it doesn't
  // exist yet and returns the element.
  getTooltip = (t) => {
    let tooltip = document.getElementById('node_bw_chart');

    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'node_bw_chart';
      document.body.appendChild(tooltip);
    }

    ReactDOM.render(<Tooltip t={t} show={false} />, tooltip);
    return tooltip;
  }

  // generates tooltip data.
  data = () => {
    const { t, chartData } = this.props;

    return function (canvas) {
      const ctx = canvas.getContext('2d');

      const width = canvas.width;
      const height = canvas.height;
      const gradientIn = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      gradientIn.addColorStop(0, '#70c5cd');
      gradientIn.addColorStop(1, '#c6f1f3');

      const gradientOut = ctx.createLinearGradient(width / 2, 0, width / 2, height / 2);
      gradientOut.addColorStop(0, '#f19237');
      gradientOut.addColorStop(1, '#f9d1a6');

      return {
        datasets: [
          {
            label: t('Out'),
            data: chartData.data.out,
            borderColor: gradientOut,
            backgroundColor: gradientOut,
            pointRadius: 2,
            cubicInterpolationMode: 'monotone',
          },
          {
            label: t('In'),
            data: chartData.data.in,
            borderColor: gradientIn,
            backgroundColor: gradientIn,
            pointRadius: 2,
            cubicInterpolationMode: 'monotone',
          },
        ],
      };
    };
  }

  componentDidMount() {
    const { chartData } = this.props;
    this.tooltip = document.createElement('div');
    this.tooltip.id = 'node_bw_chart';
    document.body.appendChild(this.tooltip);

    setInterval(() => {
      chartData.loadData();
    }, 2500);
  }

  componentDidUpdate() {
    ReactDOM.render(<Tooltip show={false} />, this.tooltip);
  }

  render() {
    const { t, animatedPoints, chartData } = this.props;

    if (chartData.data.in.length === 0) {
      return null;
    }

    const tooltip = this.tooltip;

    const options = {
      ...defaultSettings,
      tooltips: {
        ...defaultSettings.tooltips,
        custom: (model) => {
          const data = { show: true };

          if (model.opacity === 0) {
            data.show = false;
          } else {
            data.bw = {
              out: tootltipSize(Math.abs(model.dataPoints[0].yLabel)),
              in: tootltipSize(Math.abs(model.dataPoints[1].yLabel)),
            };

            const rect = this._chart.canvas.getBoundingClientRect();
            data.pos = {
              left: rect.left + model.caretX,
              top: rect.top + model.caretY,
            };
          }

          // I know this isn't a very React-y way of doing this, but there was a simple issue:
          // re-rendering the tooltip was also re-rendering the chart which then lost its focus
          // state causing the Tooltip to stick and not disappear.
          ReactDOM.render(<Tooltip t={t} {...data} />, tooltip);
        },
      },
      animation: {
        // Only animate the 500 points
        duration: chartData.data.in.length <= animatedPoints ? 1000 : 0,
      },
    };

    return (
      <Box className="newsFeed-box">
        <BoxHeader>
          <h1>{t('Node Bandwidth')}</h1>
        </BoxHeader>
        <BoxContent className={styles.container}>
          <Line data={this.data()} options={options} />
        </BoxContent>
      </Box>
    );
  }
}

export default compose(
  withData({
    chartData: {
      apiUtil: () => getNodeStats(),
      defaultData: { in: [], out: [] },
      autoload: true,
      transformResponse: (res, old) => {
        if (old.in.length >= 100) {
          old.in.shift();
          old.out.shift();
        }

        return {
          in: [...old.in, ...[{ x: Date.now(), y: res.RateIn }]],
          out: [...old.out, ...[{ x: Date.now(), y: -res.RateOut }]],
        };
      },
    },
  }),
  withTranslation('status'),
)(NodeBandwidthChart);

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Box from '@toolbox/box';
import BoxRow from '@toolbox/box/row';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import BoxTabs from '@toolbox/tabs';
import BoxEmptyState from '@toolbox/box/emptyState';
import Icon from '@toolbox/icon';
import { config, bwChartCfg, stgChartCfg, upTimeChartCfg, } from './chart.js';
import styles from './statistic.css';

const Statistic = (props) => {
  const {
    chartData,
    t,
  } = props;
  const tabs = [
    {
      value: 'bandwidth',
      name: t('Bandwidth'),
      cfg: bwChartCfg
    },
    {
      value: 'storage',
      name: t('Storage'),
      cfg: stgChartCfg
    },
    {
      value: 'uptime',
      name: t('Uptime'),
      cfg: upTimeChartCfg
    },
  ];

  const [source, setSource] = useState(tabs[0]);
  let egress = new Array(12).fill(0);
  let ingress = new Array(12).fill(0);
  let storage = new Array(12).fill(0);
  let uptime = new Array(12).fill(0);

  useEffect(() => {
    for (const data of chartData.data) {
      egress[data.month - 1] = data.egress;
      ingress[data.month - 1] = data.ingress;
      storage[data.month - 1] = data.storage;
      uptime[data.month - 1] = data.uptime;
    }

    tabs[0].cfg.series = [{
      name: 'Egress',
      data: egress,
    },
    {
      name: 'Ingress',
      data: ingress,
    }];

    tabs[1].cfg.series = [{
      name: 'Storage',
      data: storage,
    }];

    tabs[2].cfg.series = [{
      name: 'Uptime',
      data: uptime,
    }];

    document.querySelector('#apexchart').innerHTML = '';
    const chart = new ApexCharts(document.querySelector('#apexchart'), tabs[0].cfg);
    chart.render();
  }, [chartData.data]);

  useEffect(() => {
    document.querySelector('#apexchart').innerHTML = '';
    const chart = new ApexCharts(document.querySelector('#apexchart'), source.cfg);
    chart.render();
  }, [source]);

  const changeSource = (tab) => {
    setSource(tab);
  };

  return (
    <Box className="newsFeed-box">
      <BoxHeader>
        <h1>{t('Node Statistics')}</h1>
        <BoxTabs
          tabs={tabs}
          active={source.value}
          onClick={changeSource}
          className={`box-tabs ${styles.tabs}`}
        />
      </BoxHeader>
      <BoxContent className={styles.container}>
        <div id="apexchart" />
      </BoxContent>
    </Box>
  );
};

export default Statistic;

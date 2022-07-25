/* eslint-disable max-lines */
export const config = {
  colors: {
    primary: '#696cff',
    secondary: '#8592a3',
    success: '#71dd37',
    info: '#03c3ec',
    warning: '#ffab00',
    danger: '#ff3e1d',
    dark: '#233446',
    black: '#000',
    white: '#fff',
    body: '#f4f5fb',
    headingColor: '#566a7f',
    axisColor: '#a1acb8',
    borderColor: '#eceef1',
  },
};

export const bwChartCfg = {
  series: [
    {
      name: 'Egress',
      data: ['18GB', 7, 15, 29, 18, 12, 9, 20, 25, 20, 13, 30],
    },
    {
      name: 'Ingress',
      data: [-13, -18, -9, -14, -5, -17, -15, -5, -10, -24, -29, -20],
    },
  ],
  chart: {
    height: 400,
    stacked: true,
    type: 'bar',
    toolbar: { show: true },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '35%',
      borderRadius: 10,
      startingShape: 'rounded',
      endingShape: 'rounded',
    },
  },
  colors: [config.colors.primary, config.colors.info],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 6,
    lineCap: 'round',
    colors: [config.colors.white],
  },
  legend: {
    show: true,
    horizontalAlign: 'left',
    position: 'top',
    markers: {
      height: 8,
      width: 8,
      radius: 12,
      offsetX: -3,
    },
    labels: {
      colors: config.colors.axisColor,
    },
    itemMargin: {
      horizontal: 10,
    },
  },
  grid: {
    borderColor: config.colors.borderColor,
    padding: {
      top: 0,
      bottom: -8,
      left: 20,
      right: 20,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: 'GB',
    },
    labels: {
      show: true,
      align: 'right',
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
};

export const stgChartCfg = {
  series: [],
  chart: {
    height: 400,
    parentHeightOffset: 0,
    parentWidthOffset: 0,
    toolbar: {
      show: false,
    },
    type: 'area',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  legend: {
    show: false,
  },
  markers: {
    size: 6,
    colors: 'transparent',
    strokeColors: 'transparent',
    strokeWidth: 4,
    discrete: [
      {
        fillColor: config.colors.white,
        seriesIndex: 0,
        dataPointIndex: 7,
        strokeColor: config.colors.primary,
        strokeWidth: 2,
        size: 6,
        radius: 8,
      },
    ],
    hover: {
      size: 7,
    },
  },
  colors: [config.colors.primary],
  fill: {
    type: 'gradient',
    gradient: {
      shade: config.colors.primary,
      shadeIntensity: 0.6,
      opacityFrom: 0.5,
      opacityTo: 0.25,
      stops: [0, 95, 100],
    },
  },
  grid: {
    borderColor: config.colors.borderColor,
    strokeDashArray: 3,
    padding: {
      top: -20,
      bottom: -8,
      left: -10,
      right: 8,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: 'GB',
    },
    labels: {
      show: true,
      align: 'right',
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
};

export const upTimeChartCfg = {
  series: [],
  chart: {
    height: 400,
    parentHeightOffset: 0,
    parentWidthOffset: 0,
    toolbar: {
      show: false,
    },
    type: 'area',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  legend: {
    show: false,
  },
  markers: {
    size: 6,
    colors: 'transparent',
    strokeColors: 'transparent',
    strokeWidth: 4,
    discrete: [
      {
        fillColor: config.colors.white,
        seriesIndex: 0,
        dataPointIndex: 7,
        strokeColor: config.colors.primary,
        strokeWidth: 2,
        size: 6,
        radius: 8,
      },
    ],
    hover: {
      size: 7,
    },
  },
  colors: [config.colors.primary],
  fill: {
    type: 'gradient',
    gradient: {
      shade: config.colors.primary,
      shadeIntensity: 0.6,
      opacityFrom: 0.5,
      opacityTo: 0.25,
      stops: [0, 95, 100],
    },
  },
  grid: {
    borderColor: config.colors.borderColor,
    strokeDashArray: 3,
    padding: {
      top: -20,
      bottom: -8,
      left: -10,
      right: 8,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: 'Hours',
    },
    labels: {
      show: true,
      align: 'right',
      style: {
        fontSize: '13px',
        colors: config.colors.axisColor,
      },
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
};

$(() => {

  let moodChart = {
    template: $('#chart-template').html(),
    element: $('#mood-div'),
    header: 'Feelings',
    bars: [
      { icon: 'assets/Icon_extremely_happy.svg' },
      { icon: 'assets/Icon_happy.svg' },
      { icon: 'assets/Icon_neutral.svg' },
      { icon: 'assets/Icon_confused.svg' },
      { icon: 'assets/Icon_surprised.svg' }
    ]
  };

  let ageChart = {
    template: $('#chart-template').html(),
    element: $('#age-div'),
    header: 'Age distribution',
    bars: [
      { title: 'Child' },
      { title: 'Young adult' },
      { title: 'Adult' },
      { title: 'Middle aged' },
      { title: 'Senior' }
    ]
  };

  let averageData = {
    template: $('#average-template').html(),
    element: $('#averages'),
    header: 'Visitors',
    visitors: [
      { title: 'Total', value: '17 554' },
      { title: 'Men', value: '66%' },
      { title: 'Women', value: '34%' }
    ],
    average: {
      title: 'Average visitor',
      gender: 'Woman',
      age: 'Adult',
      mood: 'Happy'
    }
  };

  let render = () => {
    [moodChart, ageChart, averageData].forEach((chart) => {
      Mustache.parse(chart.template);
      chart.element.html(Mustache.render(chart.template, chart));
    });
  };

  let loadData = () => {

    /* TODO: get real data from API */

    let parsedChartData = [ 
      Math.floor(Math.random()*100),
      Math.floor(Math.random()*100),
      Math.floor(Math.random()*100),
      Math.floor(Math.random()*100),
      Math.floor(Math.random()*100)
    ];

    [moodChart, ageChart].forEach((chart) => {
      chart.bars.map((bar, index) => {
        bar.height = parsedChartData[index];
        bar.label = bar.height + '%';
        return bar;
      });
    });

    render();
  };

  loadData();
  window.setInterval(loadData, 5000);
});

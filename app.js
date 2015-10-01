$(() => {

  let config = {
    updateInterval: 5000,
    getUrl: 'http://localhost:8080/analysis'
  };

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

  let loadData = async () => {

    let data;

    try {
      data = await $.get(config.getUrl);
    } catch (err) {
      console.error(err);
      return;
    }

    if (data.moods && data.moods.length === moodChart.bars.length) {
      data.moods.forEach( (mood, index) => {
        moodChart.bars[index].height = mood;
        moodChart.bars[index].label = `${mood}%`;
      });
    }

    if (data.ages && data.ages.length === ageChart.bars.length) {
      data.ages.forEach( (age, index) => {
        ageChart.bars[index].height = age;
        ageChart.bars[index].label = `${age}%`;
      });
    }

    render();
  };

  loadData();
  window.setInterval(loadData, config.updateInterval);
});

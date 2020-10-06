import React from 'react'

import Chart from 'react-google-charts'

export default props => {

  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        console.log("Selected ", chartWrapper.getChart().getSelection());
      }
    }
  ];
  const data = [
    ["peso", "gordura"],
    [82, 24],
    [81, 23],
    [80, 21],
    [81, 18],
    [79, 17.5],
    [78.5, 17]
  ];

/*   const data = props.avaliacoes.map( avaliacao => { [
      [
        [avaliacao.desempenho.peso, avaliacao.desempenho.gorduraCorporal]
      ] 
    ]
  } */
   
  const options = {
    title: "Peso vs. Gordura Corporal",
    hAxis: { title: "Peso", viewWindow: { min: 0, max: 100 } },
    vAxis: { title: "Gordura Corporal", viewWindow: { min: 0, max: 40 } },
    legend: "none"
  };

  return (
    <Chart
      chartType="ScatterChart"
      data={data}
      options={options}
      graphID="ScatterChart"
      width="100%"
      height="400px"
      chartEvents={chartEvents}
    />
  );
}
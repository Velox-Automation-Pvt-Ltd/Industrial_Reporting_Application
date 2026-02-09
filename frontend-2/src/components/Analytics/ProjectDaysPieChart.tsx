import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ProjectDaysPieChartProps {
  total: number;
  remaining: number;
  title?: string | undefined;
}

const ProjectDaysPieChart: React.FC<ProjectDaysPieChartProps> = ({ total, remaining, title }) => {
  const used = total - remaining;

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },

    title: {
      text: title || 'Pie Chart',
      align: 'center',
      style: { fontSize: '16px', fontWeight: '600' },
    },
    tooltip: {
      pointFormat: '<b>{point.y} days</b> ({point.percentage:.1f}%)',
    },
    accessibility: {
      point: { valueSuffix: '%' },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderColor: '#fff',
        borderWidth: 3,
        showInLegend: false,
        colors: ['#f07f3c', ' #03979d'],
        dataLabels: {
          enabled: true,
          distance: 20,
          connectorShape: 'crookedLine',
          connectorWidth: 2,
          connectorColor: '#6b7280',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#111827',
            textOutline: 'none',
          },
          format: '{point.name}: <b>{point.percentage:.1f}%</b>',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Days',
        // colorByPoint: true,
        data: [
          { name: 'Used', y: used, sliced: true, selected: true },
          { name: 'Remaining', y: remaining },
        ],
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full md:w-[45%] flex flex-col items-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="mt-2 text-sm text-gray-700">
        <p>
          <span className="font-medium text-blue-900">Total:</span>{' '}
          <span className="font-bold">{total}</span>
        </p>
        <p>
          <span className="font-medium text-blue-900">Used:</span>{' '}
          <span className="font-bold">{used}</span>
        </p>
        <p>
          <span className="font-medium text-blue-900">Remaining:</span>{' '}
          <span className="font-bold">{remaining}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectDaysPieChart;

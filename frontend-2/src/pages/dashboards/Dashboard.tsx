import ProductSales from 'src/components/dashboard/ProductSales';
import TopPayingClients from 'src/components/dashboard/TopPayingClients';
import TrafficDistribution from 'src/components/dashboard/TrafficDistribution';

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-6 col-span-12">
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 mb-6">
              <TrafficDistribution title={'Office'} />
            </div>
            <div className="col-span-12">
              <ProductSales title={'WFH'} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 mb-6">
              <TrafficDistribution title={'Site'} />
            </div>
            <div className="col-span-12">
              <ProductSales title={'Leave'} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-12 col-span-12">
          <TopPayingClients />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

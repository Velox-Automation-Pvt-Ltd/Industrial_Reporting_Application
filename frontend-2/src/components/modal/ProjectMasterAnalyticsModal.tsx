import { Modal } from 'antd';
import ProjectDaysPieChart from '../Analytics/ProjectDaysPieChart';
import { ProjectMasterType } from 'src/types/master';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  data?: ProjectMasterType | null;
}
const ProjectMasterAnalyticsModal = ({ visible, onClose, onSubmit, data }: Props) => {
  const totalSoftDevDays = data?.swDevDays ?? 0;
  const SoftDevRemainingDays = data?.swDevDaysRemaining ?? 0;

  const usedSoftDevDays = totalSoftDevDays - SoftDevRemainingDays;

  const totalCommDays = data?.commissioningDays ?? 0;
  const CommRemainingDays = data?.commissioningDaysRemaining ?? 0;
  const usedCommDays = totalCommDays - CommRemainingDays;

  return (
    <Modal
      title={'Project Analytics for ' + data?.projectName}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <div className="p-2">
        <div className="flex flex-wrap justify-center gap-6">
          <ProjectDaysPieChart
            title={'Software Dev Days Usage'}
            remaining={SoftDevRemainingDays}
            total={totalSoftDevDays}
          />
          <ProjectDaysPieChart
            title={'Commissioning Days Usage'}
            remaining={CommRemainingDays}
            total={totalCommDays}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProjectMasterAnalyticsModal;

import React, { useEffect } from 'react';
import { Modal, Form, DatePicker, Radio, Select, Input, Button } from 'antd';
import dayjs from 'dayjs';
import { tomorrowsDate } from 'src/constant/constants';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  workOptions: Record<string, string[]>;
  workTypeOptions: string[];
}

const EditScheduleModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  workOptions,
  workTypeOptions,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        ...initialData,
        date: initialData.date ? dayjs(initialData.date) : null,
      });
    }
  }, [visible, initialData, form]);

  const handleFinish = (values: any) => {
    const payload = {
      ...initialData,
      ...values,
      date: values.date ? values.date.toISOString() : null,
    };
    onSubmit(payload);
    onClose();
  };

  const location = Form.useWatch('location', form);
  const workType = Form.useWatch('workType', form);
  const projectId = Form.useWatch('projectId', form);

  return (
    <Modal title="Edit Schedule" open={visible} onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{
          date: tomorrowsDate,
        }}
      >
        <Form.Item name="date" label="Schedule Date" rules={[{ required: true }]}>
          <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Radio.Group>
            {['Site', 'Office', 'Site + Office', 'WFH', 'Leave'].map((loc) => (
              <Radio key={loc} value={loc}>
                {loc}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {location !== 'Leave' && (
          <>
            <Form.Item name="workType" label="Work Type" rules={[{ required: true }]}>
              <Radio.Group>
                {workTypeOptions.map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            {workType === 'Project' && (
              <Form.Item name="projectId" label="Project">
                <Select allowClear placeholder="Select Project">
                  {['20122', '20265', '22098', '259098', '24098', 'other'].map((proj) => (
                    <Select.Option key={proj} value={proj}>
                      {proj}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {workType === 'Project' && projectId === 'other' && (
              <Form.Item name="other" label="Specify Other Project">
                <Input placeholder="Please specify the other project" />
              </Form.Item>
            )}

            <Form.Item name="work" label="Work" rules={[{ required: true }]}>
              <Select placeholder="Select Work Type">
                {workOptions[location]?.map((work) => (
                  <Select.Option key={work} value={work}>
                    {work}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="isChargeable"
              label="Work Category"
              rules={[{ required: true, message: 'Work category is required' }]}
            >
              <Radio.Group>
                <Radio value={true}>Chargeable</Radio>
                <Radio value={false}>Non-Chargeable</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={3}
                placeholder="Describe the work you will perform... (Optional)"
              />
            </Form.Item>
          </>
        )}

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Update Schedule
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditScheduleModal;

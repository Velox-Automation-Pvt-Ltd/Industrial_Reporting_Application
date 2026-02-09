import React, { useEffect } from 'react';
import { Modal, Form, Select, Input, Button, Row, Col, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { tomorrowsDate } from 'src/constant/constants';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

dayjs.extend(customParseFormat);
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  mode: 'create' | 'edit' | 'view';
}

const ServiceMasterModal: React.FC<Props> = ({ visible, onClose, onSubmit, initialData, mode }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' || (mode == 'view' && initialData)) {
        form.setFieldsValue({
          ...initialData,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialData, form, mode]);

  const handleFinish = (values: any) => {
    const payload =
      mode === 'edit'
        ? {
            ...values,
            // ...initialData,
          }
        : {
            ...values,
          };

    onSubmit(payload);
    // console.log('Submited Payload : ', payload);
    onClose();
  };

  const statusSelectionField = () => {
    return ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED']?.map((status: string, index: number) => (
      <Select.Option key={index} value={status} label={`${status}`} data-customer={status}>
        <div>{status.toLowerCase()}</div>
      </Select.Option>
    ));
  };

  return (
    <Modal
      title={
        mode === 'edit' ? `Edit Service` : mode == 'view' ? 'View Service' : 'Create New Service'
      }
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="horizontal" onFinish={handleFinish} disabled={mode == 'view'}>
        <br />

        <Form.Item
          name="servicePoNumber"
          label={<span className="font-semibold">Service Po Number</span>}
          rules={[{ required: true, message: 'Service Po Number is required' }]}
        >
          <Input placeholder="XXXXXXX" />
        </Form.Item>

        <Form.Item
          name="customerName"
          label={<span className="font-semibold">Customer Name</span>}
          rules={[{ required: true, message: 'Customer Name is required' }]}
        >
          <Input placeholder="Enter Customer Name" />
        </Form.Item>

        <Form.Item
          name="serviceDays"
          label={<span className="font-semibold">Service Days</span>}
          rules={[{ required: true, message: 'Service Days is required' }]}
        >
          <InputNumber placeholder="Enter service days" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="serviceRemainingDays"
          label={<span className="font-semibold">Service Remaining Days</span>}
        >
          <InputNumber placeholder="Enter service remaining days" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {mode === 'edit' ? 'Update Service' : 'Add Service'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceMasterModal;

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

const AmcServiceModal: React.FC<Props> = ({ visible, onClose, onSubmit, initialData, mode }) => {
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

  return (
    <Modal
      title={
        mode === 'edit'
          ? `Edit Amc Service`
          : mode == 'view'
          ? 'View Amc Service'
          : 'Create New Amc Service'
      }
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="horizontal" onFinish={handleFinish} disabled={mode == 'view'}>
        <br />

        <Form.Item
          name="amcPoNo"
          label={<span className="font-semibold">Amc Service Po Number</span>}
          rules={[{ required: true, message: 'Amc Service Po Number is required' }]}
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
          name="totalDays"
          label={<span className="font-semibold">Total Days</span>}
          rules={[{ required: true, message: 'Amc Total Days is required' }]}
        >
          <InputNumber placeholder="Enter Amc service total days" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="totalDaysRemaining"
          label={<span className="font-semibold">Remaining Days</span>}
        >
          <InputNumber placeholder="Enter amc reamining days" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="recurringMonth"
          label={<span className="font-semibold">Recurring Month</span>}
          rules={[{ required: true, message: 'Recurring month is required' }]}
        >
          <InputNumber placeholder="Enter Amc service Recurring month" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {mode === 'edit' ? 'Update Amc Service' : 'Add Amc Service'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AmcServiceModal;

import React, { useEffect } from 'react';
import { Modal, Form, Select, Input, Button, Row, Col, InputNumber } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  mode: 'create' | 'edit' | 'view';
}

const ProjectMasterModal: React.FC<Props> = ({ visible, onClose, onSubmit, initialData, mode }) => {
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

  const location = Form.useWatch('locationId', form);

  const statusSelectionField = () => {
    return ['NOT_STARTED', 'IN_PROCESS', 'COMPLETED', 'OVERDUE']?.map(
      (status: string, index: number) => (
        <Select.Option key={index} value={status} label={`${status}`} data-customer={status}>
          <div>{status.toLowerCase()}</div>
        </Select.Option>
      ),
    );
  };

  return (
    <Modal
      title={
        mode === 'edit' ? `Edit Project` : mode == 'view' ? 'View Project' : 'Create New Project'
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form form={form} layout="horizontal" onFinish={handleFinish} disabled={mode == 'view'}>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="projectNo"
              label={<span className="font-semibold">Project No</span>}
              rules={[{ required: true, message: 'Project No is required' }]}
            >
              <Input placeholder="25XXXX" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="customerCode"
              label={<span className="font-semibold">Customer Code</span>}
            >
              <Input placeholder="Enter Customer Code" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="projectName"
          label={<span className="font-semibold">Project Name</span>}
          rules={[{ required: true, message: 'Project Name is required' }]}
        >
          <Input placeholder="Enter Project Name" />
        </Form.Item>
        <Form.Item
          name="customerName"
          label={<span className="font-semibold">Customer Name</span>}
          rules={[{ required: true, message: 'Customer Name is required' }]}
        >
          <Input placeholder="Enter Customer Name" />
        </Form.Item>

        <div className="flex flex-wrap items-center gap-1 text-xs">
          {/* SW Dev Section */}
          <div className="flex items-center justify-between w-full p-3 bg-teal-50 border border-teal-200 rounded-xl shadow-sm">
            <div className="flex flex-col w-full">
              <h4 className="font-bold text-blue-900 text-sm mb-4">
                Software Development Details :
              </h4>
              <Form.Item
                name="swDevDays"
                label={<span className="font-semibold text-blue-900">Software Dev Total Days</span>}
                rules={[{ required: true, message: 'Software Development Days is required' }]}
              >
                <InputNumber
                  placeholder="Enter Software Dev Total Days"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="swDevDaysRemaining"
                label={
                  <span className="font-semibold text-blue-900">Software Dev Remaining Days</span>
                }
              >
                <InputNumber
                  placeholder="Enter Software Dev Remaining Days"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="swDevStatus"
                label={<span className="font-semibold text-blue-900">Software Dev Status</span>}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select software development status"
                  filterOption={(input, option) => {
                    const searchString =
                      option?.label?.toString().toLowerCase() +
                      ' ' +
                      option?.['data-customer']?.toString().toLowerCase();
                    return searchString.includes(input.toLowerCase());
                  }}
                  optionLabelProp="label"
                >
                  {statusSelectionField()}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 mt-4 text-xs">
          {/* Commissioning Section */}
          <div className="flex items-center justify-between w-full p-3 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
            <div className="flex flex-col w-full">
              <h4 className="font-bold text-orange-900 text-sm mb-4">Commissioning Details : </h4>

              <Form.Item
                name="commissioningDays"
                label={
                  <span className="font-semibold text-orange-900">Commissioning Total Days</span>
                }
                rules={[{ required: true, message: 'Commissioning Days is required' }]}
              >
                <InputNumber
                  placeholder="Enter Commissioning Total Days"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="commissioningDaysRemaining"
                label={
                  <span className="font-semibold text-orange-900">
                    Commissioning Remaining Days
                  </span>
                }
              >
                <InputNumber
                  placeholder="Enter Commissioning Remaining Days"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="commissioningStatus"
                label={<span className="font-semibold text-orange-900">Commissioning Status</span>}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder="Select commissioning status"
                  filterOption={(input, option) => {
                    const searchString =
                      option?.label?.toString().toLowerCase() +
                      ' ' +
                      option?.['data-customer']?.toString().toLowerCase();
                    return searchString.includes(input.toLowerCase());
                  }}
                  optionLabelProp="label"
                >
                  {statusSelectionField()}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center h-auto p-3 pb-0 mt-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex flex-col w-full mt-2">
            <Form.Item
              name="completionStatus"
              label={
                <span className="font-semibold text-green-900">Project Completion Status</span>
              }
              rules={[{ required: true, message: 'Project Completion Status is required' }]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Select project completion status"
                filterOption={(input, option) => {
                  const searchString =
                    option?.label?.toString().toLowerCase() +
                    ' ' +
                    option?.['data-customer']?.toString().toLowerCase();
                  return searchString.includes(input.toLowerCase());
                }}
                optionLabelProp="label"
              >
                {statusSelectionField()}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="mt-5">
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              {mode === 'edit' ? 'Update Project' : 'Add Project'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ProjectMasterModal;

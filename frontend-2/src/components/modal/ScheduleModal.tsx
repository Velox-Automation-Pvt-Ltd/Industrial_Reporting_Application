import React, { useEffect, useState } from 'react';
import { Modal, Form, DatePicker, Radio, Select, Input, Button } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { tomorrowsDate } from 'src/constant/constants';
import { PartyPopper } from 'lucide-react';
import { WorkOption } from 'src/types';
import { useQuery } from '@tanstack/react-query';
import { fetchMasterData, fetchWorkOptions } from 'src/actions/schedule/ScheduleAction';
import {
  masterDataType,
  projectsType,
  locationsType,
  amcOptionsType,
  serviceOrdersType,
  Schedule,
} from 'src/types/data';
import { icons } from 'src/assets/assets';
import toast from 'react-hot-toast';
import { formatDate } from 'src/utils/dateFormatter';
import { fetchAllUsersInGroup } from 'src/actions/Auth/authAction';
import { UserType } from 'src/types/auth/auth';
import { DisablePastDates } from 'src/utils/disableDatesUtil';
import { getScheduleDate } from 'src/utils/getScheduleDateUtil';

dayjs.extend(customParseFormat);
interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  // workOptions: Record<WorkLocation, WorkOption[]>;
  // workTypeOptions?: string[];
  mode: 'create' | 'edit' | 'view';
  modalTitle?: string;
  teamMembersData?: UserType[];
  assign?: boolean;
}

const ScheduleModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  mode,
  modalTitle,
  teamMembersData,
  assign = false,
}) => {
  const [form] = Form.useForm();

  const [isProject, setIsProject] = useState<'yes' | 'no' | null>(null);
  const [isSalesOrProject, setIsSalesOrProject] = useState<'project' | 'sales' | 'service' | null>(
    null,
  );

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialData) {
        const isProjectValue = initialData?.project ? 'yes' : 'no';
        const supportPurpose = initialData?.supportFor ?? initialData?.clientPurpose;

        form.setFieldsValue({
          ...initialData,
          locationId: initialData?.location,
          workId: initialData?.work,
          projectId: initialData?.project,
          serviceOrderId: initialData?.serviceOrderId,
          amcOrderId: initialData?.amcOrderId,
          supportFor: supportPurpose,
          isProject: isProjectValue,
          scheduleDate: initialData.scheduleDate
            ? dayjs(initialData.scheduleDate, 'DD-MM-YYYY')
            : null,
        });

        setIsProject(isProjectValue);
        setIsSalesOrProject(supportPurpose);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialData, form, mode]);

  const {
    data: masterData,
    isError,
    error,
  } = useQuery<masterDataType>({
    queryKey: ['master'],
    queryFn: fetchMasterData,
  });

  if (isError) {
    toast.error(error?.message);
  }

  const { data: workOptions = {} as Record<string, WorkOption[]> } = useQuery<
    Record<string, WorkOption[]>
  >({
    queryKey: ['work'],
    queryFn: fetchWorkOptions,
  });

  const locationData: locationsType[] = masterData?.locations ?? [];
  const projectOptions: projectsType[] = masterData?.projects ?? [];
  const serviceOptions: serviceOrdersType[] = masterData?.serviceOrders ?? [];
  const amcOptions: amcOptionsType[] = masterData?.amcOrders ?? [];

  const handleFinish = (values: any) => {
    const formattedDate = values.scheduleDate
      ? dayjs(values.scheduleDate).format('DD-MM-YYYY')
      : null;

    const payload =
      mode === 'edit'
        ? {
            // ...initialData,
            scheduleId: initialData?.scheduleId,
            ...values,
            // scheduleDate: formattedDate,
          }
        : {
            ...values,
            scheduleDate: formattedDate,
          };

    onSubmit(payload);

    onClose();
  };

  const location = Form.useWatch('locationId', form);
  const work = Form.useWatch('workId', form);
  const project = Form.useWatch('projectId', form);
  const service = Form.useWatch('serviceOrderId', form);
  const amcService = Form.useWatch('amcOrderId', form);
  const supportFor = Form.useWatch('supportFor', form);

  const projectSelectionField = () => {
    return (
      <>
        <Form.Item
          name="projectId"
          label={
            <span className="font-semibold">
              <div>Project</div>
            </span>
          }
          rules={[{ required: true, message: 'Please Select Project!' }]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Select Project"
            filterOption={(input, option) => {
              const searchString =
                option?.label?.toString().toLowerCase() +
                ' ' +
                option?.['data-customer']?.toString().toLowerCase();
              return searchString.includes(input.toLowerCase());
            }}
            optionLabelProp="label"
          >
            {projectOptions?.map((proj: projectsType) => (
              <Select.Option
                key={proj.projectId}
                value={proj.projectId}
                label={`${proj.projectNo} - ${proj.customerName}`}
                data-customer={proj.customerName}
              >
                <div>
                  <strong>{proj.projectNo}</strong> - {proj.customerName}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {selectedProjectName === 'other' && (
          <Form.Item
            name="otherProject"
            required
            label={<span className="font-semibold">Specify Other Project</span>}
          >
            <Input placeholder="Please specify the other project" />
          </Form.Item>
        )}
      </>
    );
  };

  const serviceSelectionField = () => {
    return (
      <>
        <Form.Item
          label={<span className="font-semibold">PO No / Customer</span>}
          name="serviceOrderId"
          // rules={[{ required: true }]}
        >
          <Select
            allowClear
            placeholder="PO No. / Customer"
            showSearch
            filterOption={(input, option) => {
              const searchString =
                option?.label?.toString().toLowerCase() +
                ' ' +
                option?.['data-customer']?.toString().toLowerCase();
              return searchString.includes(input.toLowerCase());
            }}
            optionLabelProp="label"
          >
            {serviceOptions.map((proj: serviceOrdersType) => (
              <Select.Option
                key={proj.serviceId}
                value={proj.serviceId}
                label={`${proj.servicePoNumber} - ${proj.customerName}`}
                data-customer={proj.customerName}
              >
                <div>
                  <strong>{proj.servicePoNumber}</strong> - {proj.customerName}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {selectedServiceName === 'other' && (
          <Form.Item
            name="otherService"
            required
            label={<span className="font-semibold">Specify Other Service</span>}
          >
            <Input placeholder="Please specify the other Service" />
          </Form.Item>
        )}
      </>
    );
  };

  const workFieldConfig: Record<string, (props: any) => JSX.Element> = {
    'Project Commissioning': ({ projectSelectionField }) => projectSelectionField(),
    'Software Development': ({ projectSelectionField }) => projectSelectionField(),

    'Sales Support': ({ projectSelectionField, isProject, setIsProject }) => (
      <>
        <Form.Item
          label={<span className="font-semibold">Is Project?</span>}
          name="isProject"
          required
        >
          <Radio.Group onChange={(e) => setIsProject(e.target.value)}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        {isProject === 'yes' && projectSelectionField()}
      </>
    ),

    'Client Meeting': ({ projectSelectionField, isSalesOrProject, setIsSalesOrProject }) => (
      <>
        <Form.Item
          label={<span className="font-semibold">Is it for?</span>}
          name="clientPurpose"
          required
        >
          <Radio.Group onChange={(e) => setIsSalesOrProject(e.target.value)}>
            <Radio value="project">Project</Radio>
            <Radio value="sales">Sales</Radio>
          </Radio.Group>
        </Form.Item>
        {isSalesOrProject === 'project' && projectSelectionField()}
      </>
    ),

    Service: ({ serviceSelectionField }) => serviceSelectionField(),

    'AMC Service': ({ amcOptions }) => (
      <>
        <Form.Item
          label={<span className="font-semibold">AMC Number</span>}
          name="amcOrderId"
          // rules={[{ required: true }]}
          // required
        >
          <Select
            allowClear
            placeholder="Select Project"
            showSearch
            filterOption={(input, option) => {
              const searchString =
                option?.label?.toString().toLowerCase() +
                ' ' +
                option?.['data-customer']?.toString().toLowerCase();
              return searchString.includes(input.toLowerCase());
            }}
            optionLabelProp="label"
          >
            {amcOptions.map((proj: amcOptionsType) => (
              <Select.Option
                key={proj.amcOrderId}
                value={proj.amcOrderId}
                label={`${proj.amcPoNo} - ${proj.customerName}`}
                data-customer={proj.customerName}
              >
                <div>
                  <strong>{proj.amcPoNo}</strong> - {proj.customerName}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {selectedAmcServiceName === 'other' && (
          <Form.Item
            name="otherAmcService"
            required
            label={<span className="font-semibold">Specify Other Amc Service</span>}
          >
            <Input placeholder="Please specify the other Amc Service" />
          </Form.Item>
        )}
      </>
    ),

    'Online Support': ({
      projectSelectionField,
      serviceSelectionField,
      isSalesOrProject,
      setIsSalesOrProject,
    }) => (
      <>
        <Form.Item
          label={<span className="font-semibold">Support For</span>}
          name="supportFor"
          required
        >
          <Radio.Group onChange={(e) => setIsSalesOrProject(e.target.value)}>
            <Radio value="project">Project</Radio>
            <Radio value="service">Service</Radio>
          </Radio.Group>
        </Form.Item>
        {isSalesOrProject === 'project' && projectSelectionField()}
        {isSalesOrProject === 'service' && serviceSelectionField()}
      </>
    ),

    FAT: ({ projectSelectionField }) => projectSelectionField(),
  };

  const selectedLocationName = locationData?.find(
    (loc: locationsType) => loc?.locationId === location,
  )?.locationName;

  const selectedProjectName = projectOptions?.find(
    (loc: projectsType) => loc?.projectId === project,
  )?.customerName;

  const selectedServiceName = serviceOptions?.find(
    (ser: serviceOrdersType) => ser?.serviceId === service,
  )?.customerName;

  const selectedAmcServiceName = amcOptions?.find(
    (amc: amcOptionsType) => amc?.amcOrderId === amcService,
  )?.customerName;

  const selectedWork = workOptions[selectedLocationName as string]?.find(
    (w: any) => w.workId === work,
  )?.workName;

  const renderConditionalFields = () => {
    if (!location || !work) return null;

    if (selectedWork && workFieldConfig[selectedWork]) {
      return workFieldConfig[selectedWork]({
        projectSelectionField,
        serviceSelectionField,
        projectOptions,
        amcOptions,
        serviceOptions,
        isProject,
        setIsProject,
        isSalesOrProject,
        setIsSalesOrProject,
      });
    }

    return null;
  };

  useEffect(() => {
    const isFatWork = selectedWork?.includes('C-FAT') || selectedWork?.includes('I-FAT');
    if (isFatWork) {
      form.setFieldsValue({ isChargeable: false });
    }
  }, [selectedWork, form]);

  return (
    <Modal
      title={
        mode === 'edit'
          ? `Edit Schedule for ${initialData?.employeeName}`
          : modalTitle || 'Create New Schedule'
      }
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{
          scheduleDate: getScheduleDate(),
        }}
      >
        {assign && (
          <Form.Item
            name="userId"
            label={
              <span className="font-semibold">
                <div>Select Engineer </div>
              </span>
            }
            rules={[{ required: true, message: 'Please Select Engineer to Assign Schedule!' }]}
          >
            <Select
              allowClear
              showSearch
              placeholder="Select Engineer to whom you want to assign schedule"
              filterOption={(input, option) => {
                const searchString =
                  option?.label?.toString().toLowerCase() +
                  ' ' +
                  option?.['data-customer']?.toString().toLowerCase();
                return searchString.includes(input.toLowerCase());
              }}
              optionLabelProp="label"
            >
              {teamMembersData?.map((user: UserType) => (
                <Select.Option
                  key={user?.userId}
                  value={user?.userId}
                  label={`${user?.username}`}
                  data-customer={user?.userId}
                >
                  <div>{user?.username}</div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="scheduleDate"
          label={<span className="font-semibold">Schedule Date</span>}
          rules={[{ required: true }]}
        >
          <DatePicker
            disabledDate={(current) => DisablePastDates(current, 3)}
            disabled={mode === 'edit'}
            format="DD-MM-YYYY"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="locationId"
          label={<span className="font-semibold">Location</span>}
          rules={[{ required: true }]}
        >
          <Radio.Group
            onChange={() => {
              form.setFieldsValue({ workId: undefined });
            }}
          >
            {locationData?.map((loc: any) => (
              <Radio key={loc.locationId} value={loc.locationId}>
                {loc.locationName}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {selectedLocationName !== 'Leave' &&
          location &&
          workOptions[selectedLocationName as string]?.length > 0 && (
            <Form.Item
              name="workId"
              label={
                <span className="font-semibold flex">
                  <div>Work</div>
                  <div>
                    <img className="w-5 ml-2" src={icons.workIcon} alt="" />
                  </div>
                </span>
              }
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Work Type"
                allowClear
                showSearch
                optionLabelProp="label"
                filterOption={(input, option) => {
                  const inputValue = input.toLowerCase();
                  const label = option?.label?.toString().toLowerCase() || '';
                  return label.includes(inputValue);
                }}
                onChange={() => {
                  form.setFieldsValue({
                    projectId: undefined,
                  });
                }}
              >
                {workOptions[selectedLocationName as string]?.map((opt: WorkOption) => (
                  <Select.Option key={opt.workId} value={opt.workId} label={opt.workName}>
                    {opt.workName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

        {renderConditionalFields()}

        {work && (
          <Form.Item
            name="isChargeable"
            label={<span className="font-semibold">Work Category</span>}
            rules={[{ required: true, message: 'Work category is required' }]}
          >
            <Radio.Group>
              <Radio value={true}>Chargeable</Radio>
              <Radio value={false}>Non-Chargeable</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        {selectedLocationName !== 'Leave' && (
          <Form.Item name="description" label={<span className="font-semibold">Description</span>}>
            <Input.TextArea
              rows={3}
              placeholder="Describe the work you will perform..."
              autoComplete="on"
              autoCorrect="on"
              allowClear
            />
          </Form.Item>
        )}
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {mode === 'edit'
              ? 'Update Schedule'
              : selectedLocationName === 'Leave'
              ? 'Submit Leave'
              : assign
              ? 'Assign Schedule'
              : 'Create Schedule'}
          </Button>
        </Form.Item>

        {selectedLocationName === 'Leave' && (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-blue-100/50 animate-pulse" />
            <div className="relative z-10">
              <div className="flex justify-center items-center gap-2 mb-3">
                <PartyPopper className="h-8 w-8 text-green-600 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">🎉 Enjoy Your Leave! 🎉</h3>
              <p className="text-green-600 font-medium">
                Time to relax and recharge! Have a wonderful time off.
              </p>
              <div className="mt-3 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    ✨
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ScheduleModal;

import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal, Form, Select as AntDesignSelect } from 'antd';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Wifi, Shield, Zap, UserPlus, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { PasswordInput } from '@/components/common/PasswordInput';
import { Link, useNavigate } from 'react-router';
import { Images } from 'src/assets/assets';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getAllGroups } from 'src/actions/Auth/authAction';
import { GroupByScheduleType } from 'src/types/data';
import toast from 'react-hot-toast';
import { RegisterResponse, signUpRequestType } from 'src/types/auth/auth';
import { useSignUpMutation } from 'src/api/mutations/auth/useSignInMutation';
import { useAppDispatch } from 'src/store/hooks/reduxHooks';
import { setloginSuccess } from 'src/store/slices/authSlice';
import { USER_LOCAL_STORAGE_KEY } from 'src/constant/constants';

interface Props {
  visible?: boolean;
  onClose?: () => void;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}
export default function CreateNewUserModal({
  visible = false,
  setVisible = () => {},
  onClose = () => {},
}: Props) {
  const [formData, setFormData] = useState<signUpRequestType>({
    firstName: '',
    lastName: '',
    email: '',
    group: undefined,
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });
  const GroupData = data || [];

  const { mutate: signUpCall, isPending: isLoading } = useSignUpMutation({
    onSuccess: (data: RegisterResponse) => {
      toast.success(data?.message || 'User Register successfully!');
      setVisible(false);
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        group: undefined,
        password: '',
        confirmPassword: '',
      });
      onClose();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength when password changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSelectChange = (value: string): void => {
    setFormData((prev) => ({ ...prev, group: parseInt(value, 10) }));
  };

  const checkPasswordStrength = (password: string): void => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    signUpCall(formData);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      group: undefined,
      password: '',
      confirmPassword: '',
    });
    // console.log('Form submitted:', formData);
  };

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', met: formData.password.length >= 8 },
    { id: 2, text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { id: 3, text: 'One number', met: /[0-9]/.test(formData.password) },
    { id: 4, text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={600} centered>
      <div className="bg-gradient-to-br flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-2 bg-slate-50 dark:bg-slate-800/50">
              <CardTitle className="text-center flex items-center justify-center space-x-2 text-slate-800 dark:text-slate-100">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-lg font-semibold">Create New User Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name_proj@velox-internal.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group" className="text-slate-700 dark:text-slate-300">
                    Group
                  </Label>
                  <Select
                    value={formData.group ? formData.group.toString() : undefined}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600">
                      {!formData.group ? (
                        <span className="text-slate-400">
                          Select your Group follow by Group Leader
                        </span>
                      ) : (
                        <span className="text-slate-900 dark:text-white">
                          {
                            GroupData.find(
                              (group: GroupByScheduleType) =>
                                group.groupId.toString() === formData.group?.toString(),
                            )?.groupLeaderName
                          }
                          's{' '}
                          {
                            GroupData.find(
                              (group: GroupByScheduleType) =>
                                group.groupId.toString() === formData.group?.toString(),
                            )?.groupName
                          }
                        </span>
                      )}
                    </SelectTrigger>

                    <SelectContent>
                      {GroupData?.map((group: GroupByScheduleType) => (
                        <SelectItem key={group.groupId} value={group.groupId.toString()}>
                          {group.groupLeaderName}'s {group.groupName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="space-y-2 pt-1">
                      <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength === 0
                              ? 'w-0 bg-red-500'
                              : passwordStrength === 1
                              ? 'w-1/4 bg-red-500'
                              : passwordStrength === 2
                              ? 'w-1/2 bg-yellow-500'
                              : passwordStrength === 3
                              ? 'w-3/4 bg-blue-500'
                              : 'w-full bg-green-500'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {passwordRequirements?.map((req) => (
                          <div key={req.id} className="flex items-center space-x-1">
                            <CheckCircle
                              size={14}
                              className={
                                req.met ? 'text-green-500' : 'text-slate-300 dark:text-slate-600'
                              }
                            />
                            <span
                              className={
                                req.met
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-slate-500 dark:text-slate-400'
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Passwords don't match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 py-2.5 text-white  bg-primary duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  disabled={formData.password !== formData.confirmPassword || passwordStrength < 2}
                >
                  {isLoading ? '...Loading' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Modal>
  );
}

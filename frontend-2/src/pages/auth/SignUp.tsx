import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function SignUp() {
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });
  const GroupData = data || [];

  const { mutate: signUpCall, isPending: isLoading } = useSignUpMutation({
    onSuccess: (data: RegisterResponse) => {
      toast.success(data?.message || 'User Register successfully!');
      navigate('/login');
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
    // Convert string value to number for group
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
    // console.log('Form submitted:', formData);
  };

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', met: formData.password.length >= 8 },
    { id: 2, text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { id: 3, text: 'One number', met: /[0-9]/.test(formData.password) },
    { id: 4, text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center mr-4">
            <Link to="/">
              <img className="w-28" src={Images.companyDarkLogo} alt="Company Logo" />
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Velox Automation
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Join the Schedule Management System
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-2 bg-slate-50 dark:bg-slate-800/50">
            <CardTitle className="text-center flex items-center justify-center space-x-2 text-slate-800 dark:text-slate-100">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold">Create Your Account</span>
            </CardTitle>
            <CardDescription className="text-center text-slate-600 dark:text-slate-400">
              Get started with our scheduling platform
            </CardDescription>
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
                className="w-full mt-2 py-2.5 text-white bg-gradient-to-r bg-secondary hover:bg-blue-900 transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={formData.password !== formData.confirmPassword || passwordStrength < 2}
              >
                {isLoading ? '...Loading' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 pt-2 pb-5">
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center pt-2">
          <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">Secure</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise-grade security</p>
          </div>
          <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
              <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">Connected</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Seamless integration</p>
          </div>
          <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">Efficient</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Time-saving automation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

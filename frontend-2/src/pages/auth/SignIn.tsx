import { Separator } from '@/components/ui/separator';
import { Wifi, Shield, Zap } from 'lucide-react';
import { PasswordInput } from '@/components/common/PasswordInput';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/store/hooks/reduxHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useSignInMutation } from '@/api/mutations/auth/useSignInMutation';
import CompanyLogoDark from '@/assets/images/logo/veloxLogoDark.png';
import { useQuery } from '@tanstack/react-query';
import { getAllGroups } from 'src/actions/Auth/authAction';

const loginSchema = z.object({
  email: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignIn() {
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: login, isPending: isLoading } = useSignInMutation({
    onSuccess: (data) => {
      toast.success('Logged in successfully!');
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    login({
      email: values.email,
      password: values.password,
      dispatch,
    });
  };

  return (
    <div className="min-h-screen  bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center items-center mr-5 mb-2">
              <Link to="/">
                <img className="w-24" src={CompanyLogoDark} alt="Company Logo" />
              </Link>
            </div>

            <CardTitle className="text-2xl font-bold text-center text-secondary">
              Industrial Reporting Solution
            </CardTitle>
            <CardDescription className="text-center">Welcome Back</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            {...field}
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          {/* <Link
                            to="/login"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Forgot password?
                          </Link> */}
                        </div>

                        <FormControl>
                          <PasswordInput
                            {...field}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full text-white mt-5 bg-secondary hover:bg-blue-900 transition-all duration-200 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  {/* <Button type="submit" color={'primary'} className="w-full bg-primary text-white">
                    Sign in
                  </Button> */}
                </CardFooter>
                {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 mt-3 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div> */}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pt-4">
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              {"Don't have an account? "}
              {/* <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign up
              </Link> */}
              <span className="text-accent font-medium transition-colors">Contact Admin</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import DashboardHeader from '@/components/ui/DashboardHeader';
import { useSession } from 'next-auth/react';
import { UserRound } from 'lucide-react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Row, Col, Avatar, Typography, Divider } from 'antd';
import ProfileForm from '@/components/ui/ProfileForm';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '@/lib/queries';
import { UPDATE_USER } from '@/lib/mutations/user';
import { toast } from 'sonner';

const { Text } = Typography;

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  city: Yup.string(),
});

const ProfilePage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();

  const userId =
    session?.provider === 'credentials' ? session?.user?.id : session?.userId;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
    },
  });

  const { data: userData, loading: loadingGetUser } = useQuery(GET_USER, {
    variables: {
      id: userId,
    },
    skip: !userId,
    onCompleted: (data) => {
      reset({
        name: data.getUser.name || '',
        lastName: data.getUser.last_name || '',
        email: data.getUser.email || '',
        phone: data.getUser.phone || '',
        city: data.getUser.city || '',
      });
    },
  });

  const [updateUser, { loading: loadingUpdateUser }] = useMutation(UPDATE_USER);

  const user = userData?.getUser;

  const onSubmit = async (data) => {
    try {
      const updateVariables = {
        id: userId,
        input: {},
      };

      if (data.name) updateVariables.input.name = data.name;
      if (data.lastName) updateVariables.input.last_name = data.lastName;
      if (data.email) updateVariables.input.email = data.email;
      if (data.phone) updateVariables.input.phone = data.phone;
      if (data.city) updateVariables.input.city = data.city;

      await updateUser({
        variables: updateVariables,
        refetchQueries: [
          {
            query: GET_USER,
            variables: { id: userId },
          },
        ],
      });

      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(error?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader />

      <div className="flex flex-1 items-start justify-center">
        <div className="flex h-full w-full max-w-[1200px] flex-col items-start justify-start gap-4 md:p-10 lg:p-32 lg:py-5">
          {/* header */}
          <div className="mb-4 flex h-fit w-full flex-wrap items-start justify-between gap-3 md:mb-8">
            <div className="flex w-fit items-center justify-start gap-1">
              <UserRound size={isMobile ? 23 : 38} />
              <h1 className="text-xl uppercase md:text-2xl lg:text-4xl">
                your profile
              </h1>
            </div>
          </div>

          {/* info section */}
          <div className="w-full p-4 px-0">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={4}>
                <Avatar
                  style={{
                    backgroundColor: '#ccff00',
                    verticalAlign: 'middle',
                  }}
                  size="large"
                >
                  {session?.user?.name?.split(' ')?.[0]}
                </Avatar>
              </Col>
              <Col xs={24} md={20} className="space-y-2">
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={6}>
                    <Text type="secondary">Username:</Text>
                    <div className="font-semibold">{user?.name}</div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Text type="secondary">Membership Date:</Text>
                    <div className="font-semibold">6/30/2025 (Test)</div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Text type="secondary">Active Plan:</Text>
                    <div className="font-semibold">Gold Plan (Test)</div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Text type="secondary">Last Payment:</Text>
                    <div className="font-semibold">
                      4/25/2025 - 11:56 PM (Test)
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="mt-4 flex w-full items-center gap-4">
              <div className="w-fit">
                <h2 className="text-lg font-normal md:text-2xl">
                  User Settings
                </h2>
              </div>
              <div className="flex-1">
                <Divider />
              </div>
            </div>
          </div>

          {/* form */}
          <div className="w-full">
            <ProfileForm
              loading={loadingGetUser || loadingUpdateUser}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

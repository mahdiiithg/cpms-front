'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Avatar, Spin } from 'antd';
import { UserRound } from 'lucide-react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'sonner';
import ProfileForm from '@/components/ui/ProfileForm';
import { GET_USER } from '@/lib/queries';
import { UPDATE_USER } from '@/lib/mutations/user';
import { pageSurfaceClass, panelClass } from '@/lib/brandTheme';
import { userInitials } from '@/lib/demoContact';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().nullable(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().nullable(),
  city: Yup.string().nullable(),
});

function formatJoinedDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = session?.userId || session?.user?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
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
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const user = data?.getUser;
      if (!user) return;
      reset({
        name: user.name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
      });
    },
    onError: () => {
      // Fall back to session identity if profile API is unavailable
      reset({
        name: session?.user?.name?.split(' ')?.[0] || '',
        lastName: session?.user?.name?.split(' ')?.slice(1).join(' ') || '',
        email: session?.user?.email || '',
        phone: '',
        city: '',
      });
    },
  });

  const [updateUser, { loading: loadingUpdateUser }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fdashboard%2Fprofile');
    }
  }, [status, router]);

  const user = userData?.getUser;
  const displayName = useMemo(() => {
    const full = [user?.name, user?.last_name].filter(Boolean).join(' ');
    return full || session?.user?.name || 'Coast Planet member';
  }, [user, session]);

  const joinedLabel = formatJoinedDate(user?.createdAt);

  const onSubmit = async (data) => {
    if (!userId) {
      toast.error('You must be signed in to update your profile.');
      return;
    }

    try {
      const input = {
        name: data.name,
        last_name: data.lastName || null,
        email: data.email,
        phone: data.phone || null,
        city: data.city || null,
      };

      await updateUser({
        variables: { id: userId, input },
        refetchQueries: [{ query: GET_USER, variables: { id: userId } }],
      });

      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(error?.message || 'Failed to update profile.');
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
          Account
        </p>
        <div className="mt-2 flex items-center gap-2">
          <UserRound className="h-7 w-7 text-cp-lime" />
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Your profile
          </h1>
        </div>
        <p className="mt-2 text-cp-muted">
          Keep your Coast Planet contact details up to date for property
          enquiries and account access.
        </p>
      </div>

      <div className={`${panelClass} mb-6 p-6`}>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            size={64}
            style={{
              backgroundColor: '#ccff00',
              color: '#171717',
              fontWeight: 700,
            }}
          >
            {userInitials(
              displayName,
              user?.email || session?.user?.email,
              user?.last_name,
            )}
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold text-white">
              {displayName}
            </h2>
            <p className="truncate text-sm text-cp-subtle">
              {user?.email || session?.user?.email}
            </p>
            {joinedLabel ? (
              <p className="mt-1 text-xs text-cp-faint">
                Member since {joinedLabel}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className={`${panelClass} p-6`}>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Profile details
        </h3>
        <ProfileForm
          loading={loadingGetUser || loadingUpdateUser}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ProfilePage;

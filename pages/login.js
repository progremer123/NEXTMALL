import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }),
    [router, session, redirect];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', {
        redirect: false,
      });
      console.log('Github login:' + result);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const googleLoginHandler = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
      });
      console.log('Google login:' + result);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const kakaoLoginHandler = async () => {
    try {
      const result = await signIn('kakao', {
        redirect: false,
      });
      console.log('Kakao login:' + result);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const naverLoginHandler = async () => {
    try {
      const result = await signIn('naver', {
        redirect: false,
      });
      console.log('Naver login:' + result);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full text-black"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 3, message: 'pawwrod is more than 3 chars' },
            })}
            className="w-full text-black"
            id="password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an accout? &nbsp;
          <Link href="register">Register</Link>
        </div>
        <div className="p-5 bg-gray-500 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full text-black"
              type="button"
              onClick={githubLoginHandler}
            >
              Github Login
            </button>
            <button
              className="primary-button w-full text-black"
              type="button"
              onClick={googleLoginHandler}
            >
              GOOGLE Login
            </button>
            <button
              className="primary-button w-full text-black"
              type="button"
              onClick={kakaoLoginHandler}
            >
              KAKAO Login
            </button>
            <button
              className="primary-button w-full text-black"
              type="button"
              onClick={naverLoginHandler}
            >
              NAVER Login
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

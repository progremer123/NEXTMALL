import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function loginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandle)}
      >
        <h1 className="text-xl mb-4">Login</h1>
        <div className="mb-4 bg-slate-200">
          <label htmlfor="email">email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: '유효한 이메일 주소를 입력하세요',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 bg-slate-200">
          <label htmlfor="passwd">passwd</label>
          <imput type="passwd" className="w-full" id="email" autoFocus />
        </div>
        <div className="mb-4">
          <button className="primary-button px-5">Login</button>
        </div>
        <div className="mb-4">
          계정이 없으면 등록하세요. &nbsp; <Link href="register">register</Link>
        </div>
      </form>
    </Layout>
  );
}

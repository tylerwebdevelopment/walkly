import {betterAuth} from 'better-auth';

import { prismaAdapter } from 'better-auth/adapters/prisma';
import {prisma} from '@/prisma/client';
import { nextCookies } from 'better-auth/next-js';

import { Resend } from 'resend';

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: false,
      sendResetPassword: async ({user, url}) => {
        const {data, error} = await resend.emails.send({
          from: 'security@walkly.fit',
          to: user.email,
          subject: "Walkly Password Reset",
          html: `
            <h2>Account Password Reset Link</h2>
            <p>Here is your request password reset link! If you did not request this please ignore.</p>
            <a href="${url}">Reset Password</a>
          `
        });

        if(error){
          console.log(error);
        }
        return console.log(data);
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({user, url}) => {
         const {data, error} = await resend.emails.send({
          from: 'no-reply@walkly.fit',
          to: user.email,
          subject: 'Verify Email For Walkly Account',
          html: `
            <h2>Please Verify Your Email For Your Walkly Account</h2>
            <p>Please click the link to verify your email address: </p>
            <a href="${url}">Verify Email</a>
            `
        })

        if(error){
          console.log(error);
        }
        return console.log(data);
      }
    },
    trustedOrigins: ['http://localhost:3000'],
    plugins: [nextCookies()]
});
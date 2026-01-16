"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";
import { Chrome, Github, ZapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <section
      className="flex min-h-screen bg-black dark:bg-transparent px-16 py-16 md:py-32"
      style={{
        backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
        backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
      }}
    >
      <div className="m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] p-0.5 shadow-md bg-zinc-900 border-zinc-700 border-1 text-white">
        <div className="p-8 pb-8">
          <div>
            <Link href={"/"}>
              <div className="flex">
                <svg
                  fill="none"
                  height="45"
                  viewBox="0 0 48 48"
                  width="45"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <filter
                    id="a"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="54"
                    width="48"
                    x="0"
                    y="-3"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="-3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite
                      in2="hardAlpha"
                      k2="-1"
                      k3="1"
                      operator="arithmetic"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      in2="shape"
                      mode="normal"
                      result="effect1_innerShadow_3051_46919"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite
                      in2="hardAlpha"
                      k2="-1"
                      k3="1"
                      operator="arithmetic"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
                    />
                    <feBlend
                      in2="effect1_innerShadow_3051_46919"
                      mode="normal"
                      result="effect2_innerShadow_3051_46919"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feMorphology
                      in="SourceAlpha"
                      operator="erode"
                      radius="1"
                      result="effect3_innerShadow_3051_46919"
                    />
                    <feOffset />
                    <feComposite
                      in2="hardAlpha"
                      k2="-1"
                      k3="1"
                      operator="arithmetic"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0"
                    />
                    <feBlend
                      in2="effect2_innerShadow_3051_46919"
                      mode="normal"
                      result="effect3_innerShadow_3051_46919"
                    />
                  </filter>
                  <filter
                    id="b"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="44.3333"
                    width="37.9993"
                    x="4.99935"
                    y="4.20833"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feMorphology
                      in="SourceAlpha"
                      operator="erode"
                      radius="1.58333"
                      result="effect1_dropShadow_3051_46919"
                    />
                    <feOffset dy="2.375" />
                    <feGaussianBlur stdDeviation="2.375" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
                    />
                    <feBlend
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="effect1_dropShadow_3051_46919"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_3051_46919"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="c"
                    gradientUnits="userSpaceOnUse"
                    x1="24"
                    x2="26"
                    y1=".000001"
                    y2="48"
                  >
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".12" />
                  </linearGradient>
                  <linearGradient id="d">
                    <stop offset="0" stopColor="#fff" stopOpacity=".8" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".5" />
                  </linearGradient>
                  <linearGradient
                    id="e"
                    gradientUnits="userSpaceOnUse"
                    x1="19.1575"
                    x2="19.1575"
                    xlinkHref="#d"
                    y1="8.16614"
                    y2="30.1492"
                  />
                  <linearGradient
                    id="f"
                    gradientUnits="userSpaceOnUse"
                    x1="23.9993"
                    x2="23.9993"
                    xlinkHref="#d"
                    y1="13.0076"
                    y2="34.9906"
                  />
                  <linearGradient
                    id="g"
                    gradientUnits="userSpaceOnUse"
                    x1="28.8411"
                    x2="28.8411"
                    xlinkHref="#d"
                    y1="17.8495"
                    y2="39.8326"
                  />
                  <linearGradient
                    id="h"
                    gradientUnits="userSpaceOnUse"
                    x1="24"
                    x2="24"
                    y1="0"
                    y2="48"
                  >
                    <stop offset="0" stopColor="#fff" stopOpacity=".12" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="i">
                    <rect height="48" rx="12" width="48" />
                  </clipPath>
                  <g filter="url(#a)">
                    <g clipPath="url(#i)">
                      <rect fill="#22262F" height="48" rx="12" width="48" />
                      <path d="m0 0h48v48h-48z" fill="url(#c)" />
                      <g filter="url(#b)">
                        <path
                          d="m29.3786 8.93657c2.2283 2.22823-.5414 8.61083-6.1864 14.25573-5.645 5.645-12.0275 8.4147-14.25575 6.1865-2.22827-2.2283.5415-8.6108 6.18645-14.2558 5.645-5.64493 12.0275-8.4147 14.2557-6.18643z"
                          fill="url(#e)"
                          opacity=".7"
                        />
                        <path
                          d="m34.2204 13.778c2.2283 2.2283-.5415 8.6108-6.1864 14.2557-5.645 5.645-12.0275 8.4148-14.2558 6.1865-2.2282-2.2283.5415-8.6108 6.1865-14.2557 5.645-5.645 12.0275-8.4148 14.2557-6.1865z"
                          fill="url(#f)"
                          opacity=".5"
                        />
                        <path
                          d="m39.0622 18.6199c2.2283 2.2283-.5415 8.6108-6.1864 14.2558-5.645 5.6449-12.0275 8.4147-14.2558 6.1864-2.2282-2.2283.5415-8.6108 6.1865-14.2557 5.645-5.645 12.0275-8.4148 14.2557-6.1865z"
                          fill="url(#g)"
                          opacity=".3"
                        />
                      </g>
                    </g>
                    <rect
                      height="46"
                      rx="11"
                      stroke="url(#h)"
                      strokeWidth="2"
                      width="46"
                      x="1"
                      y="1"
                    />
                  </g>
                </svg>
                <h1 className="text-3xl font-semibold ml-4 mt-1.5">Reqon</h1>
              </div>
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign in to Reqon
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="w-full bg-zinc-800 border-1 border-zinc-700 hover:bg-zinc-600 hover:text-white"
              onClick={() =>
                signIn.social({
                  provider: "github",
                  callbackURL: "/",
                })
              }
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>

          {/* <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                signIn.social({
                  provider: "google",
                  callbackURL: "/",
                })
              }
            >
              <Chrome className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

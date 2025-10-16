"use client";

import UserButton from "@/modules/authentication/components/user-button";
import { Unplug, Search } from "lucide-react";
import React from "react";
import { UserProps } from "../types";
import SearchBar from "./search-bar";
import InviteMember from "./invite-member";
import Workspace from "./workspace";

interface Props {
  user: UserProps;
}

const Header = ({ user }: Props) => {
  return (
    <header className="grid grid-cols-5 grid-rows-1 gap-2 overflow-x-auto overflow-hidden p-2 border">
      <div className="col-span-2 flex items-center justify-between space-x-2 hover:cursor-pointer hover:opacity-80 ml-4">
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
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
            height="54"
            width="48"
            x="0"
            y="-3"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
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
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
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
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
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
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
            height="44.3333"
            width="37.9993"
            x="4.99935"
            y="4.20833"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            <stop offset="0" stop-color="#fff" stop-opacity="0" />
            <stop offset="1" stop-color="#fff" stop-opacity=".12" />
          </linearGradient>
          <linearGradient id="d">
            <stop offset="0" stop-color="#fff" stop-opacity=".8" />
            <stop offset="1" stop-color="#fff" stop-opacity=".5" />
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
            <stop offset="0" stop-color="#fff" stop-opacity=".12" />
            <stop offset="1" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
          <clipPath id="i">
            <rect height="48" rx="12" width="48" />
          </clipPath>
          <g filter="url(#a)">
            <g clip-path="url(#i)">
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
              stroke-width="2"
              width="46"
              x="1"
              y="1"
            />
          </g>
        </svg>
        {/* <Unplug size={28} className="text-indigo-400" /> */}
      </div>

      <div className="col-span-1 flex items-center justify-between space-x-2">
        <div
          className="border-animation relative p-[1px] rounded flex-1 self-stretch overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          <SearchBar />
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-end space-x-2 jover:cursor-pointer hover:opacity-80">
        {/*Invite Memeber*/}
        <InviteMember />
        {/*Workspace*/}
        <Workspace />
        <UserButton user={user} size="sm" />
      </div>
    </header>
  );
};

export default Header;

/*!
 * Copyright 2023, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { BlockAttributes, SBUserProfile, WidgetApi } from "widget-sdk";
import { useForm } from "react-hook-form";

/**
 * React Component
 */
export interface ProfileUpdateProps extends BlockAttributes {
  widgetApi: WidgetApi;
}

export const ProfileUpdate = ({ widgetApi }: ProfileUpdateProps): ReactElement | null => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  useEffect(() => {
    widgetApi.getUserInformation().then((user) => {
      console.log("user" , user)
      localStorage.setItem('items', JSON.stringify(user));
      setUser(user);
      userFetch(user)
    }
    );
  }, []);

  const userFetch = (inp: { externalID: any; }) => {
    console.log("user", inp)
    const url = `https://my.fgsglobal.com/api/users/${inp?.externalID}`
  const token ='NjU5NTJkNTJjYzBmNTMzMmU3ZTlmYzA0Ok0yfSt7TzleWSlwKHVhSV55NWhbSzFIJlFdU0hGOSpBQUwpdG5CLERmX2QsenBFK05nLWoqN1Q1M0czZXY4X14=';
  axios({
      url: url,
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`,
        },
   })
   .then(response => {
      console.log("response" , response)
   })
   .catch(err => {
      console.log("err", err);
   });
  }

  return <>
     {/* { user ? 
      <div>
        <h1 style={{ marginBottom: 10 }}>
           {user.firstName} {user.lastName} 🎉
        </h1>
      </div>
      : 
      null 
    } */}


   <form onSubmit={handleSubmit(onSubmit)} className="hook"  style={{width: '400px', marginTop: '100px'}}>
     
      <label className="profile-update-lable"  
       style={{ display: "block", fontSize:"15px", margin:"10px"}}>
        Name
      </label>
      <input 
        type="text" 
        defaultValue = {user?.firstName}
        // placeholder="Name" 
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("first_name", {required: true, maxLength: 80})} />
        {errors.first_name && (
        <p className="hook__error">Name is required and must be valid</p>
      )}

      <label className="profile-update-lable"  style={{ display: "block", fontSize:"15px", margin:"10px"}}>Last Name</label>
      <input 
        type="text" 
        defaultValue = {user?.lastName}
        // placeholder="last Name" 
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("last_name", {required: true, maxLength: 80})} />
        {errors.last_name && (
        <p className="hook__error">Last Name is required and must be valid</p>
      )}

      <label className="profile-update-lable"  style={{ display: "block", fontSize:"15px", margin:"10px"}}>Phone Number</label>
      <input 
        type="text" 
        defaultValue = {user?.phoneNumber}
        // placeholder="phone_number" 
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("phone_number", {required: true, maxLength: 80})} />
        {errors.phone_number && (
        <p className="hook__error">Phone Numberis required and must be valid</p>
      )}

      <label className="profile-update-lable"  style={{ display: "block", fontSize:"15px", margin:"10px"}}>External Phone Number</label>
      <input 
        type="text" 
        // placeholder="external_phone_number" 
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("external_phone_number", {required: false, maxLength: 80})} />
        {errors.external_phone_number && (
        <p className="hook__error">External Phone Numberis required and must be valid</p>
      )}


      <label className="profile-update-lable"  style={{ display: "block", fontSize:"15px", margin:"10px"}}>Email</label>
      <input
        type="email"
        defaultValue = {user?.primaryEmail}
        className="profile-update-input"
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <p className="hook__error">Email is required and must be valid</p>
      )}

<label className="profile-update-lable"  style={{ display: "block", fontSize:"15px", margin:"10px"}}>Work Anniversary</label>
      <input
        type="text"
        className="work-anniversary"
        style={{ width: "100%", fontSize:" 15px"}}
        {...register("work_anniversary", {required: true, maxLength: 80} )}
      />
      {errors.work_anniversary && (
        <p className="hook__error">work anniversary is required</p>
      )}


      {/* <label className="hook__text" style={{ display: "block", fontSize:"15px", margin:"10px"}}>Password</label>
      <input
        type="password"
        className="hook__input"
        style={{ width: "100%", fontSize:" 15px"}}

        {...register("password", { required: true })}
      />
      {errors.password && <p className="hook__error">Password is required</p>} */}

      <button className="hook__button" type="submit"  style={{  margin:"10px"}}>
        Update
      </button>
    </form>
  
 
  </>
};


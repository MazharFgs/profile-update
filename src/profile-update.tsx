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
import { BlockAttributes, widgetApi, SBUserProfile } from "widget-sdk";

/**
 * React Component
 */
export interface ProfileUpdateProps extends BlockAttributes {
  widgetApi: widgetApi;
}

export const ProfileUpdate = ({ widgetApi }: ProfileUpdateProps): ReactElement | null => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  
  useEffect(() => {
    widgetApi.getUserInformation().then((user) => {
      console.log("user" , user)
      localStorage.setItem('items', JSON.stringify(user));
      setUser(user);
      userFetch(user)
    });
  }, []);

  const userFetch = (inp) => {
    console.log("uuuu", inp)
    const url = `https://my.fgsglobal.com/api/users/${inp?.externalID}`
  const token ='NjU5NTJkNTJjYzBmNTMzMmU3ZTlmYzA0Ok0yfSt7TzleWSlwKHVhSV55NWhbSzFIJlFdU0hGOSpBQUwpdG5CLERmX2QsenBFK05nLWoqN1Q1M0czZXY4X14=';
  axios({
      url: url,
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`,
        },
      // data : {
      //   firstName : inp.firstName,
      //   lastName : inp.lastName,
      //   profile: {
      //     "hobbies": inp.hobbies.join()
      // },
      // }
   })
   .then(response => {
      console.log("response" , response)
   })
   .catch(err => {
      console.log("err", err);
   });
  }

  return <>
    { user ? 
      <div>
        <h1 style={{ marginBottom: 10 }}>
           {user.firstName} {user.lastName} 🎉
        </h1>
        <p>is from the {user.location} office and works in the {user.department} department.</p>
      </div>
      : 
      null 
    }
  </>
};


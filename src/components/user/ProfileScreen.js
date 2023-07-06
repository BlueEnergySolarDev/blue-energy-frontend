import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ProfileGeneralScreen } from "./ProfileGeneralScreen";
import { ChangePasswordScreen } from "./ChangePasswordScreen";

export const ProfileScreen = () => {
  return (
    <div className="container">
      <h1 className="mb-2 text-dark text-center">PROFILE</h1>
      <Tabs selectedTabClassName="secondary-back text-light rounded">
        <TabList className="line-color">
          <Tab>General</Tab>
          <Tab>Password</Tab>
        </TabList>

        <TabPanel>
          <ProfileGeneralScreen />
        </TabPanel>
        <TabPanel>
          <ChangePasswordScreen />
        </TabPanel>
      </Tabs>
    </div>
  );
};

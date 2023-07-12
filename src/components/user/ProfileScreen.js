import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useTranslation } from 'react-i18next';

import { ProfileGeneralScreen } from "./ProfileGeneralScreen";
import { ChangePasswordScreen } from "./ChangePasswordScreen";

export const ProfileScreen = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="mb-2 text-dark text-center">{t('profile.title')}</h1>
      <Tabs selectedTabClassName="secondary-back text-light rounded">
        <TabList className="line-color">
          <Tab>{t('profile.general')}</Tab>
          <Tab>{t('profile.password')}</Tab>
        </TabList>

        <TabPanel>
          {user &&
            <ProfileGeneralScreen user={user} />
          }
        </TabPanel>
        <TabPanel>
          <ChangePasswordScreen />
        </TabPanel>
      </Tabs>
    </div>
  );
};

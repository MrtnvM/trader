import React, { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import { Home } from './panels/Home';
import { Persik } from './panels/Persik';
import { useSystemColorScheme } from './vk-api/vk-sdk';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const { user, isLoading } = useVkUserInfo();
  useSystemColorScheme();

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={activePanel} popout={isLoading ? <ScreenSpinner /> : null}>
      <Home id="home" user={user} go={go} />
      <Persik id="persik" go={go} />
    </View>
  );
};

const useVkUserInfo = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { user, isLoading };
};

export default App;

import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

export const useSystemColorScheme = () => {
  useEffect(() => {
    bridge.subscribe(({ detail }) => {
      const { data, type } = detail;

      if (type === 'VKWebAppUpdateConfig') {
        const scheme = data && data['scheme'];
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = scheme || 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
  });
};

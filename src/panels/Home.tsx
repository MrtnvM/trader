import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { UserInfo } from '@vkontakte/vk-bridge';

export type HomeProps = {
  id: string;
  user: UserInfo | null;
  go: (e: any) => void;
};

export const Home = (props: HomeProps) => {
  const { id, user, go } = props;

  return (
    <Panel id={id}>
      <PanelHeader>Трейдер</PanelHeader>
      {user && (
        <Group title="User Data Fetched with VK Bridge">
          <UserCell user={user} />
        </Group>
      )}

      <Group title="Navigation Example">
        <ShowPersikButton go={go} />
      </Group>
    </Panel>
  );
};

const UserCell = ({ user }) => {
  const avatarUrl = user.photo_200;
  const city = user.city?.title ?? '';
  const userName = `${user.first_name} ${user.last_name}`;

  return (
    <Cell before={avatarUrl ? <Avatar src={avatarUrl} /> : null} description={city}>
      {userName}
    </Cell>
  );
};

const ShowPersikButton = ({ go }) => {
  return (
    <Div>
      <Button size="xl" onClick={go} data-to="persik">
        Show me the Persik
      </Button>
    </Div>
  );
};

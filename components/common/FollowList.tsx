import { StopOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import React, { FC } from 'react';

interface Props {
  header: string;
  data: { nickname: string }[];
}

const FollowList: FC<Props> = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ column: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>more</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

export default FollowList;

import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Popover, Comment } from 'antd';
import React, { FC, useCallback, useState } from 'react';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { IPost } from '@/store/post';

interface Props {
  post: any;
  userId: number | undefined;
}

const PostCard: FC<Props> = ({ post, userId }) => {
  console.log(post);
  const [liked, setLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const onToggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setShowCommentForm((prev) => !prev);
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heartTwoTone" onClick={onToggleLiked} />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLiked} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {userId === post.User.id ? (
                  <div>
                    <Button type="primary">Modify</Button>
                    <Button type="primary" style={{ background: 'red' }}>
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Button>Report</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {showCommentForm && (
        <div>
          <CommentForm post={post} userId={userId} />
          <List
            header={`${post.Comments.length} comment`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item: any) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  content={item.content}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <Comments /> */}
    </div>
  );
};

export default PostCard;

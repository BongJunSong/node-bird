import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  postData: string;
}

const PostCardContent: FC<Props> = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/).map((cur, idx) => {
        if (cur.match(/(#[^\s#]+)/)) {
          console.log(cur.slice(1));
          return (
            <Link href={`/hashtag/${cur.slice(1)}`} key={idx}>
              {cur}
            </Link>
          );
        }
        return cur;
      })}
    </div>
  );
};

export default PostCardContent;

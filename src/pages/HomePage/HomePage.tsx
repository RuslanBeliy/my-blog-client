import { FC, useEffect, useRef, useState } from 'react';

import s from './HomePage.module.scss';

import {
  Button,
  Container,
  Error,
  ListOfComments,
  ListOfPosts,
  ListOfTags,
  SidebarBoxLayout,
  SortList,
} from '../../components';
import { sortList, ISortList } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentsSelector } from '../../store/slices/comments/commentsSelector';
import { getLastComments } from '../../store/slices/comments/commentsSlice';
import { postsSelector } from '../../store/slices/posts/postsSelectors';
import { getMorePosts, getPosts } from '../../store/slices/posts/postsSlice';
import { getPopularTags } from '../../store/slices/tags/tagsSlice';
import { FetchStatus } from '../../types';

interface Props {}

export const HomePage: FC<Props> = () => {
  const [activeSort, setActiveSort] = useState(sortList[0]);
  const [activeTag, setActiveTag] = useState('');
  const { comments } = useAppSelector(commentsSelector);
  const { status, errorMessage, countDocuments, posts } = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();
  const skipPosts = useRef(10);

  const handleActiveTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? '' : tag));
  };
  const handleActiveSort = (item: ISortList) => {
    setActiveSort(item);
  };

  useEffect(() => {
    skipPosts.current = 0;
    const req: Record<string, unknown> = {};
    if (activeTag) req['tag'] = activeTag;
    if (activeSort.order) req['rating'] = activeSort.order;
    dispatch(getPosts(req));
  }, [activeTag, activeSort]);

  const handleMorePosts = () => {
    skipPosts.current += 10;
    const req: Record<string, unknown> = {};
    if (activeTag) req['tag'] = activeTag;
    if (activeSort.order) req['rating'] = activeSort.order;
    if (skipPosts) req['skip'] = skipPosts.current;

    dispatch(getMorePosts(req));
  };

  useEffect(() => {
    dispatch(getPopularTags());
    dispatch(getLastComments());
  }, []);

  if (status === FetchStatus.Error) {
    return <Error text={errorMessage} />;
  }

  return (
    <Container className={s.homePage}>
      <SortList
        className={s.sortList}
        activeSort={activeSort}
        handleActiveSort={handleActiveSort}
      />

      <div className={s.wrap}>
        <ListOfPosts className={s.listOfPosts} />
        <div className={s.sidebar}>
          <SidebarBoxLayout title='Популярные тэги'>
            <ListOfTags activeTag={activeTag} handleActiveTag={handleActiveTag} />
          </SidebarBoxLayout>
          <SidebarBoxLayout title='Последние комментарии'>
            <ListOfComments comments={comments} />
          </SidebarBoxLayout>
        </div>
      </div>
      {countDocuments !== posts.length && status === FetchStatus.Success && (
        <div className={s.btn}>
          <Button onClick={handleMorePosts} variant='outline'>
            Загрузить больше постов
          </Button>
        </div>
      )}
    </Container>
  );
};

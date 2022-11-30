import { FC, MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addComment } from '../../store/tasks/tasksActions';
import { selectComments } from '../../store/tasks/tasksSelectors';
import { CommentItem } from './CommentItem/CommentItem';
import styles from './TaskComments.module.scss';

interface Props {
  taskId: string;
}

export const TaskComments: FC<Props> = (props) => {
  const { taskId } = props;

  const dispatch = useAppDispatch();

  const [comment, setComment] = useState('');

  const comments = useAppSelector((state) => selectComments(state, taskId));

  const handleAddComment = (event: MouseEvent) => {
    event.preventDefault();
    if (comment)
      dispatch(
        addComment({
          taskId,
          text: comment,
        })
      );
    setComment('');
  };

  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="What are your thoughts?"
          onChange={(event) => {
            setComment(event.currentTarget.value);
          }}
          value={comment}
        />
        <button onClick={handleAddComment} disabled={!comment}>
          comment
        </button>
      </form>
      {comments ? (
        <div className={styles.comments}>
          {comments?.map((comment) => (
            <CommentItem key={comment.id} taskId={taskId} comment={comment} />
          ))}
        </div>
      ) : null}
    </>
  );
};

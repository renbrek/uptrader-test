import { FC, MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  addReplyComment,
  removeComment,
} from '../../../store/tasks/tasksActions';
import { selectReplyComments } from '../../../store/tasks/tasksSelectors';
import { Comment } from '../../../types/Task';
import styles from './CommentItem.module.scss';

interface Props {
  taskId: string;
  comment: Comment;
}

export const CommentItem: FC<Props> = (props) => {
  const { taskId, comment } = props;

  const dispatch = useAppDispatch();

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const [reply, setReply] = useState('');

  const replies = useAppSelector((state) =>
    selectReplyComments(state, taskId, comment.id)
  );

  const handleOpenReplyForm = () => {
    setIsReplyFormOpen(true);
  };

  const handleCancelReplyCreation = (event: MouseEvent) => {
    event.preventDefault();
    setReply('');
    setIsReplyFormOpen(false);
  };

  const handleAddReplyComment = (event: MouseEvent, parentId: string) => {
    event.preventDefault();
    if (reply)
      dispatch(
        addReplyComment({
          taskId,
          parentId,
          text: reply,
        })
      );
    setReply('');
    setIsReplyFormOpen(false);
  };

  const handleRemoveComment = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      removeComment({
        taskId,
        commentId: comment.id,
      })
    );
  };

  return (
    <div key={comment.id} className={styles.item}>
      {comment.text ? (
        <div className={styles.comment}>
          <div className={styles.content}>
            <span>{comment.text}</span>
            <div>{comment.id}</div>
            <div className={styles.buttons}>
              <button onClick={handleOpenReplyForm}>reply</button>
              <button onClick={handleRemoveComment}>delete</button>
            </div>
          </div>
          {isReplyFormOpen ? (
            <form
              className={`${styles.addReplyForm} ${styles.replies} ${styles.item}`}
            >
              <input
                type="text"
                onChange={(event) => {
                  setReply(event.currentTarget.value);
                }}
                value={reply}
                placeholder="What are your thoughts?"
              />
              <div className={styles.buttons}>
                <button
                  onClick={(event) => handleAddReplyComment(event, comment.id)}
                  disabled={!reply}
                >
                  reply
                </button>
                <button onClick={handleCancelReplyCreation}>cancel</button>
              </div>
            </form>
          ) : null}
        </div>
      ) : (
        <>
          <p>Comment was deleted {comment.id}</p>
          <br />
        </>
      )}

      {replies ? (
        <div className={styles.replies}>
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} taskId={taskId} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

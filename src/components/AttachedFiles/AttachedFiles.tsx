import { ChangeEvent, FC, useRef, useState } from 'react';
import styles from './AttachedFiles.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addFile, removeFile } from '../../store/tasks/tasksActions';
import { Task } from '../../types/Task';

interface Props {
  task: Task;
}

export const AttachedFiles: FC<Props> = (props) => {
  const { task } = props;

  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : null;
    if (selectedFiles) {
      const myFiles = selectedFiles?.map((file, index) => ({
        id: (Date.now() + index).toString(),
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      dispatch(
        addFile({
          taskId: task.id,
          file: myFiles,
        })
      );
    }
  };

  const handlePick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    dispatch(removeFile({ taskId: task.id, fileId }));
  };

  return (
    <div>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleUpload}
      />
      <div>
        <div>
          {task.attachedFiles.map((file) => (
            <div key={file.id} className={styles.fileItem}>
              <p>{file.name}</p>
              <button onClick={() => handleRemoveFile(file.id)}>remove</button>
            </div>
          ))}
        </div>
        <button onClick={handlePick}>add files</button>
      </div>
    </div>
  );
};

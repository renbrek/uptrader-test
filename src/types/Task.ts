export type Task = {
  id: number;
  header: string;
  description: string;
  creationDate: Date;
  developmentTime: Date;
  doneTime: Date;
  priority: Priority;
  attachedFiles?: FileList;
  status: Status;
  subtasks: Subtask[];
  parentTaskId?: string;
  projectTaskId?: string;
};

type Subtask = {
  id: number;
  title: string;
  status: boolean;
};

enum Status {
  Queue,
  Development,
  Done,
}

enum Priority {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
}

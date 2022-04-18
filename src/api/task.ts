import { Result } from '#/axios'
import { defHttp, rawResultHttp } from '@/utils/http'
import { TaskUrlEnum } from './apiUrl'
import { AssignTaskForm, CreateTaskForm, TaskListVO, TaskVO, UserTaskVO } from './models'

/**
 *
 * @summary addTaskLabel???????
 * @param {number} taskId
 * @param {string} label
 * @throws {RequiredError}
 */
export function addTaskLabel(taskId: number, label: string): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.ADD_TASK_LABEL, params: { taskId, label } })
}
/**
 *
 * @summary assignTask
 * @param {AssignTaskForm} [data]
 * @throws {RequiredError}
 */
export function assignTask(data: AssignTaskForm): Promise<Result<boolean>> {
  return rawResultHttp.post({ url: TaskUrlEnum.ASSIGN_TASK, data })
}
/**
 *
 * @summary changeTaskFinishState
 * @param {number} taskId
 * @throws {RequiredError}
 */
export function changeTaskFinishState(taskId: number): Promise<Result<boolean>> {
  return rawResultHttp.post(
    { url: TaskUrlEnum.CHANGE_TASK_FINISH_STATE, params: { taskId } },
    { joinParamsToUrl: true }
  )
}
/**
 *
 * @summary checkTask?????????
 * @param {number} taskId
 * @throws {RequiredError}
 */
export function checkTask(taskId: number): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.CHECK_TASK, params: { taskId } })
}
/**
 *
 * @summary createTask
 * @param {CreateTaskForm} [data]
 * @throws {RequiredError}
 */
export function createTask(data: CreateTaskForm): Promise<Result<boolean>> {
  return rawResultHttp.post({ url: TaskUrlEnum.CREATE_TASK, data })
}
/**
 *
 * @summary createTaskList
 * @param {number} projectId
 * @param {string} name
 * @throws {RequiredError}
 */
export function createTaskList(projectId: number, name: string): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.CREATE_TASK_LIST, params: { projectId, name } })
}
/**
 *
 * @summary deleteTask
 * @param {number} taskId
 * @throws {RequiredError}
 */
export function deleteTask(taskId: number): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.DELETE_TASK, params: { taskId } })
}
/**
 *
 * @summary deleteTaskList
 * @param {number} taskListId
 * @throws {RequiredError}
 */
export function deleteTaskList(taskListId: number): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.DELETE_TASK_LIST, params: { taskListId } })
}
/**
 *
 * @summary getTaskInfo
 * @param {number} taskId
 * @throws {RequiredError}
 */
export function getTaskInfo(taskId: number): Promise<TaskVO> {
  return defHttp.get({ url: TaskUrlEnum.GET_TASK_INFO, params: { taskId } })
}
/**
 *
 * @summary getTaskLists
 * @param {number} projectId
 * @throws {RequiredError}
 */
export function getTaskLists(projectId: number): Promise<TaskListVO[]> {
  return defHttp.get({ url: TaskUrlEnum.GET_TASK_LISTS, params: { projectId } })
}
/**
 *
 * @summary getUserTaskList
 * @param {number} userId
 * @throws {RequiredError}
 */
export function getUserTaskList(userId: number): Promise<UserTaskVO[]> {
  return defHttp.get({ url: TaskUrlEnum.GET_USER_TASK_LIST, params: { userId } })
}
/**
 *
 * @summary updateTask
 * @param {TaskVO} [data]
 * @throws {RequiredError}
 */
export function updateTask(data: TaskVO): Promise<Result<boolean>> {
  return rawResultHttp.post({ url: TaskUrlEnum.UPDATE_TASK, data })
}
/**
 *
 * @summary updateTaskListName
 * @param {number} taskListId
 * @param {string} name
 * @throws {RequiredError}
 */
export function updateTaskListName(taskListId: number, name: string): Promise<Result<boolean>> {
  return rawResultHttp.get({ url: TaskUrlEnum.UPDATE_TASK_LIST_NAME, params: { taskListId, name } })
}

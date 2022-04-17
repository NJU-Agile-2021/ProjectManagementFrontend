/* ====GENERATED==== */
export enum StatisticUrlEnum {
  GET_TASK_FINISHED_NUMBER_BY_DATE_CHART = '/api/statistic/getTaskFinishedNumberByDateChart',
  GET_TASK_FINISHED_NUMBER_BY_MEMBER_CHART = '/api/statistic/getTaskFinishedNumberByMemberChart',
  GET_OVERVIEW_STATISTIC = '/api/statistic/getOverviewStatistic',
  GET_STATISTIC_DETAILS = '/api/statistic/getStatisticDetails',
}

export enum UserUrlEnum {
  SEARCH_USERS_BY_NAME_OR_EMAIL = '/api/user/searchUsersByNameOrEmail',
  LOGIN = '/api/user/login',
  REGISTER = '/api/user/register',
}

export enum TaskUrlEnum {
  GET_TASK_INFO = '/api/task/getTaskInfo',
  ASSIGN_TASK = '/api/task/assignTask',
  GET_USER_TASK_LIST = '/api/task/getUserTaskList',
  CHANGE_TASK_FINISH_STATE = '/api/task/changeTaskFinishState',
  CHECK_TASK = '/api/task/checkTask',
  ADD_TASK_LABEL = '/api/task/addTaskLabel',
  DELETE_TASK_LIST = '/api/task/deleteTaskList',
  UPDATE_TASK_LIST_NAME = '/api/task/updateTaskListName',
  CREATE_TASK_LIST = '/api/task/createTaskList',
  CREATE_TASK = '/api/task/createTask',
  DELETE_TASK = '/api/task/deleteTask',
  UPDATE_TASK = '/api/task/updateTask',
  GET_TASK_LISTS = '/api/task/getTaskLists',
}

export enum ProjectUrlEnum {
  GET_ROLE_OF_USER_IN_PROJECT = '/api/project/getRoleOfUserInProject',
  ADD_PROJECT_MEMBER = '/api/project/addProjectMember',
  UPDATE_ROLE_OF_PROJECT_MEMBER = '/api/project/updateRoleOfProjectMember',
  DELETE_PROJECT_MEMBER = '/api/project/deleteProjectMember',
  GET_ANNOUNCEMENTS = '/api/project/getAnnouncements',
  CREATE_ANNOUNCEMENT = '/api/project/createAnnouncement',
  UPDATE_ANNOUNCEMENT = '/api/project/updateAnnouncement',
  DELETE_ANNOUNCEMENT = '/api/project/deleteAnnouncement',
  CREATE_PROJECT = '/api/project/createProject',
  GET_PROJECT_MEMBERS = '/api/project/getProjectMembers',
  GET_PROJECT_LIST = '/api/project/getProjectList',
}

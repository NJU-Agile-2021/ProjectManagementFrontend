import { Result } from '#/axios'
import { defHttp, rawResultHttp } from '@/utils/http'
import { StatisticUrlEnum } from './apiUrl'
import {
  DateAndNumberOfFinishTasksForm,
  MemberAndNumberOfFinishTasksForm,
  StatisticTaskVO,
  TaskFinishedInPeriodForm,
} from './models'

/**
 * @summary getOverviewStatistic
 * @param {number} projectId
 */
export function getOverviewStatistic(projectId: number): Promise<Record<string, number>> {
  return defHttp.get({ url: StatisticUrlEnum.GET_OVERVIEW_STATISTIC, params: { projectId } })
}

/**
 * @summary getStatisticDetails
 * @param {number} projectId
 */
export function getStatisticDetails(projectId: number): Promise<Record<string, StatisticTaskVO>> {
  return defHttp.get({ url: StatisticUrlEnum.GET_STATISTIC_DETAILS, params: { projectId } })
}
/**
 * @summary getTaskFinishedNumberByDateChart
 * @param {TaskFinishedInPeriodForm} [data]
 */
export function getTaskFinishedNumberByDateChart(
  data: TaskFinishedInPeriodForm
): Promise<Result<DateAndNumberOfFinishTasksForm>> {
  return rawResultHttp.post({ url: StatisticUrlEnum.GET_TASK_FINISHED_NUMBER_BY_DATE_CHART, data })
}
/**
 * @summary getTaskFinishedNumberByMemberChart
 * @param {number} projectId
 */
export function getTaskFinishedNumberByMemberChart(
  projectId: number
): Promise<Array<MemberAndNumberOfFinishTasksForm>> {
  return defHttp.get({
    url: StatisticUrlEnum.GET_TASK_FINISHED_NUMBER_BY_MEMBER_CHART,
    params: { projectId },
  })
}

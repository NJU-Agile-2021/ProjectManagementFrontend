/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { TaskVO } from './task-vo';
import { UserIdAndNameVO } from './user-id-and-name-vo';
/**
 * ????
 * @export
 * @interface StatisticTaskVO
 */
export interface StatisticTaskVO {
    /**
     * 
     * @type {TaskVO}
     * @memberof StatisticTaskVO
     */
    baseTaskInfo: TaskVO;
    /**
     * 
     * @type {Array<UserIdAndNameVO>}
     * @memberof StatisticTaskVO
     */
    belongUsersInfo: Array<UserIdAndNameVO>;
    /**
     * 
     * @type {string}
     * @memberof StatisticTaskVO
     */
    taskListName: string;
}

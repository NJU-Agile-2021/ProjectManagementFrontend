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
 * @interface UserTaskVO
 */
export interface UserTaskVO {
    /**
     * 
     * @type {TaskVO}
     * @memberof UserTaskVO
     */
    baseTaskInfo: TaskVO;
    /**
     * 
     * @type {string}
     * @memberof UserTaskVO
     */
    projectName: string;
    /**
     * 
     * @type {Array<UserIdAndNameVO>}
     * @memberof UserTaskVO
     */
    assignUsers: Array<UserIdAndNameVO>;
}

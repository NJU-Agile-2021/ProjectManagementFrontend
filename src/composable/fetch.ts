import { Result } from '#/axios'
import { ElMessage } from 'element-plus'
import { Ref } from 'vue'
import { UseFetchOption } from '.'

/**
 * 【统一封装】使用根据id获取详情方法
 * @param getDetailApi 获取详情API
 * @param messagePrefix 消息提示前缀
 */
export function useGetDetail<T>(
  getDetailApi: () => Promise<T>,
  option: UseFetchOption = {
    messagePrefix: '获取详情',
  }
) {
  return () => {
    const detail = ref<T>()
    const loading = ref(false)
    const hasError = ref(false)
    const fetchDetail = async () => {
      try {
        loading.value = true
        detail.value = await getDetailApi()
      } catch (error) {
        console.log(error)
        ElMessage.error({ message: `${option.messagePrefix}失败` })
        hasError.value = true
      } finally {
        loading.value = false
      }
    }
    onMounted(() => {
      if (option.onMounted) {
        fetchDetail()
      }
    })
    return { detail, fetchDetail, loading, hasError }
  }
}

/**
 * 【统一封装】使用删除方法
 * @param deleteDataApi 删除表格某一行数据的api
 * @returns 删除函数
 */
export function useDeleteData<U>(
  deleteDataApi: (arg: U) => Promise<Result<boolean>>,
  option: UseFetchOption = {
    messagePrefix: '删除',
  }
) {
  return (fetchData: () => Promise<void>) => {
    const handleDelete = async (id: U) => {
      try {
        const { content: success, message } = await deleteDataApi(id)
        if (success) {
          ElMessage.success({ message: `${option.messagePrefix}成功` })
          fetchData()
        } else {
          ElMessage.error({ message })
        }
      } catch (error) {
        ElMessage.error({ message: `${option.messagePrefix}失败` })
      }
    }
    return { handleDelete }
  }
}

/**
 * 【统一封装】使用根据id获取详情方法
 * @param getDetailApi 获取详情API
 * @param messagePrefix 消息提示前缀
 */
export function useGetDetailById<T, U extends number | string>(
  getDetailApi: (arg: U) => Promise<T>,
  option: UseFetchOption = {
    messagePrefix: '获取详情',
  }
) {
  return (idRef: Ref<U>) => {
    const detail = ref<T>()
    const loading = ref(false)
    const hasError = ref(false)
    const fetchDetail = async (id: U) => {
      try {
        loading.value = true
        detail.value = await getDetailApi(id)
      } catch (error) {
        console.log(error)
        ElMessage.error({ message: `${option.messagePrefix}失败` })
        hasError.value = true
      } finally {
        loading.value = false
      }
    }
    onMounted(() => {
      if (option.onMounted) {
        fetchDetail(idRef.value)
      }
    })
    watch(idRef, (newId) => {
      fetchDetail(newId)
    })
    return { detail, fetchDetail, loading, hasError }
  }
}

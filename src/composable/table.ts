import { ConditionalKeys } from 'type-fest'
import { Ref, UnwrapRef } from 'vue'
import { UseFetchOption } from '.'

type fetcherFunc<T> = () => Promise<UnwrapRef<T[]>>
/**
 * 【统一封装】使用后端获取列表数据
 * @param getDataApi 获取表格数据的后端api
 * @returns loading, fetchData
 */
export function useTableData<T>(getDataApi: fetcherFunc<T>, option?: UseFetchOption) {
  return () => {
    const data = ref<T[]>([])
    const loading = ref(false)
    const hasError = ref(false)
    const fetchData = async () => {
      try {
        loading.value = true
        hasError.value = false
        data.value = await getDataApi()
      } catch (e) {
        console.log(e)
        hasError.value = true
      } finally {
        loading.value = false
      }
    }
    onMounted(() => {
      if (option?.onMounted) {
        fetchData()
      }
    })
    return { loading, data, hasError, fetchData }
  }
}

/**
 * 【统一封装】使用过滤方法（默认键值类型为string，泛型限制可以把string改为number|string诸如此类）
 * 例如：对于 A{username: string, uid: number}[]数据，只能输入键值为string类型的key，
 * 使用useFilteredData(data: Ref<A[]>, 'username')，而不能输入'uid'
 * @param data 需要过滤的列表数据
 * @param paths 数据模型的键key
 * @returns search：每一个键对应的绑定输入的响应式对象
 */
export function useFilteredData<T extends object, K extends ConditionalKeys<T, string>>(
  data: Ref<Array<T>>,
  ...paths: Array<K>
) {
  const search = reactive(paths.map(() => ref<T[K]>()))
  const filteredData = computed(() => {
    return data.value.filter((d) => {
      for (let i = 0; i < search.length; i++) {
        const s = search[i]
        // console.log(s.value)
        if (
          s.value &&
          !(d[paths[i]] as unknown as string)
            ?.toLowerCase()
            .includes((s.value as unknown as string).toLowerCase())
        ) {
          // console.log(d[paths[i]])
          return false
        }
      }
      return true
    })
  })
  return { search, filteredData }
}

/**
 * 【统一封装】使用分页的数据
 * @param data 需要分页的数据
 * @param initialPageSize 原始页大小
 * @returns 分页后的数据
 */
export function usePagingData<T>(data: Ref<Array<T>>, initialPageSize = 10) {
  const currentPage = ref(1)
  const pageSize = ref(initialPageSize)
  const handleCurrentPageChange = (...res: any) => {
    console.log(res)
  }
  const pagingData = computed(() =>
    data.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
  )
  return { currentPage, handleCurrentPageChange, pagingData, pageSize }
}

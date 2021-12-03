import { isFunction } from '@tarojs/shared'
import { computed, Ref, ref, unref } from 'vue'
import HTTPREQUEST from '../utils/http'
import type { StringObject, MaybeRef } from '../types/index'

interface ListAttr<T = StringObject> {
  url: MaybeRef<string>
  transform?: (form: T) => T
  immediate?: boolean
  limit?: number
  queryDefault?:T
}

/**
 * 封装获取列表
 * @param url 请求地址
 * @param transform 转换搜索
 * @param immediate 是否在初始化时加载，默认: `true`
 * @param limit 单次请求获取数据的条数，默认: `10`
 * @param queryDefault 默认查询条件
 */
export function useList<Item = StringObject, Serach = Item>({
  url,
  transform,
  immediate = true,
  limit = 10,
  queryDefault
}: ListAttr<Serach>): {
  query: Ref<Serach>
  isFetching: Ref<boolean>
  isRefresh: Ref<boolean>
  isEnd: Ref<boolean>
  list: Ref<Item[]>
  loadList: () => Promise<void>
  refreshList: () => void
} {
  const page = ref(1)
  const isEnd = ref(false)
  const isFetching = ref(false)
  const isRefresh = ref(false)
  const query = ref<Serach>( queryDefault ? queryDefault:{} as Serach ) as Ref<Serach>
  const list = ref<Item[]>([]) as Ref<Item[]>
  const payload = computed(() => {
    const _query = transform ? transform(unref(query)) : query.value
    return Object.assign({}, _query, { pageNo: page.value, pageSize: limit })
  })

  immediate && loadList()

  async function loadList() {
    if (isFetching.value) return
    isFetching.value = true
    const res = await HTTPREQUEST.get(unref(url), unref(payload)) as { data?: Item[] }

    if (res?.data) {
      list.value = list.value.concat(res.data)
      page.value++
      if (res.data.length < limit) {
        isEnd.value = true
      }
    } else {
      isEnd.value = true
    }
    isFetching.value = false
  }

  async function refreshList(done?: () => void) {
    isRefresh.value = true
    page.value = 1
    isEnd.value = false
    list.value = []
    await loadList()
    isRefresh.value = false
    isFunction(done) && done()
  }

  return {
    query,
    isFetching,
    isRefresh,
    isEnd,
    list,
    loadList,
    refreshList,
  }
}

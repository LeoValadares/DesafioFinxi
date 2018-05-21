import axios from '~/plugins/axios'
import EventBus from '~/EventBus'

// TODO gerenciar erros de http
export const fetchRepos = async (page = 1) => {
  let data = await apiCall(`/search/repositories?q=language:java&sort=stars&order=desc&page=${page}`)
  return data.items
}

export const fetchRepoInfos = async (repoId) => {
  let data = await apiCall(`/repositories/${repoId}`)
  return data
}

export const fetchRepoPRs = async (repoId) => {
  const data = await apiCall(`/repositories/${repoId}/pulls`)
  return data
}

const apiCall = async (url) => {
  try {
    let { data } = await axios.get(url)
    return data
  } catch (error) {
    let msg
    if (error.request.status === 403) msg = 'Too many API calls per minute, wait for more...'
    else msg = 'Unspecified error, try again'
    EventBus.$emit('toastr', msg)
    throw error
  }
}

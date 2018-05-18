<template>
  <div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <li v-for="repo in repos">
        {{ repo.name }} {{ repo.stargazers_count }}
        <nuxt-link class="button" :to="'/' + repo.id">Ver</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

// TODO gerenciar erros de http
const fetchRepos = async (page = 1) => {
  try {
    let { data } = await axios.get(`/search/repositories?q=language:java&sort=stars&order=desc&page=${page}`)
    return data.items
  } catch (error) {
    return []
  }
}

export default {
  async asyncData () {
    return { repos: await fetchRepos(), currentPage: 1 }
  },
  head () {
    return {
      title: 'Repos'
    }
  },
  methods: {
    loadMore: async function () {
      this.currentPage++
      this.repos.push(...await fetchRepos(this.currentPage))
    }
  }
}
</script>

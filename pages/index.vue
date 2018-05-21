<template>
  <v-flex>
    <h1 class="display-3">Repos</h1>
    <v-data-table v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
      :headers="headers"
      :items="repos"
      :loading="isLoading"
      hide-actions
      class="elevation-1 mt-5">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

      <template slot="items" slot-scope="props">
        <td>
          <v-card-media 
            :src="props.item.owner.avatar_url"
            height="38px"
            contain></v-card-media>
        </td>
        <td class="text-xs-left">{{ props.item.owner.login }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.stargazers_count }}</td>
        <td>{{ props.item.forks }}</td>
        <td><nuxt-link class="button" :to="'/' + props.item.id">More</nuxt-link></td>
      </template>

    </v-data-table>
  </v-flex>
</template>

<script>
import { fetchRepos } from '~/ApiClient'

export default {
  head () {
    return {
      title: 'Repos'
    }
  },
  async asyncData () {
    let fetchedRepos
    try {
      fetchedRepos = await fetchRepos()
    } catch (error) {
      fetchedRepos = []
    }
    return {
      repos: fetchedRepos,
      currentPage: 1
    }
  },
  data () {
    return {
      headers: [
        { text: 'Owner', sortable: false },
        { text: '', sortable: false },
        { text: 'Repos', sortable: false },
        { text: 'Description', sortable: false },
        { text: 'Stars', sortable: false },
        { text: 'Forks', sortable: false },
        { text: 'More Info', sortable: false }
      ],
      isLoading: false
    }
  },
  methods: {
    loadMore: async function () {
      try {
        this.isLoading = true
        this.currentPage++
        this.repos.push(...await fetchRepos(this.currentPage))
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

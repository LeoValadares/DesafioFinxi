<template>
  <section class="container">
    
    <h1 class="display-2"> {{ repoInfo.full_name }} </h1>
    <h3 class="display-1"> {{ repoInfo.description }} </h3>

    <v-container grid-list-md text-xs-center class="mt-5">
      <pull-request-list :repo-id="repoInfo.id"></pull-request-list>
    </v-container>
    
  </section>
</template>

<script>
import { fetchRepoInfos } from '~/ApiClient'
import PullRequestList from '~/components/PullRequestList'

export default {
  name: 'id',
  components: {
    PullRequestList
  },
  async asyncData ({ params, error }) {
    return { repoInfo: await fetchRepoInfos(params.id) }
  },
  head () {
    return {
      title: this.repoInfo.full_name
    }
  }
}
</script>

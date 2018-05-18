<template>
  <section class="container">
    
    <h1> {{ repoInfo.full_name }} </h1>
    <h3> {{ repoInfo.description }} </h3>

    <v-container grid-list-md text-xs-center>
      <pull-request-list :repo-id="repoInfo.id"></pull-request-list>
    </v-container>
    
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import PullRequestList from '~/components/PullRequestList'

const fetchRepoInfos = async (repoId) => {
  let { data } = await axios.get(`/repositories/${repoId}`)
  return data
}

export default {
  name: 'id',
  components: {
    PullRequestList
  },
  async asyncData ({ params, error }) {
    return { repoInfo: await fetchRepoInfos(params.id) }
    // error({ statusCode: 404, message: 'User not found' })
  },
  head () {
    return {
      title: this.repoInfo.full_name
    }
  }
}
</script>

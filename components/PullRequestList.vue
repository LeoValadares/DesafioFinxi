<template>
  <v-layout row wrap v-if="prs !== null">
    <v-flex v-for="pr in prs" xs6>
      <pull-request-card class="ma-2"
        :author-name="pr.user.login"
        :author-pic-url="pr.user.avatar_url"
        :title="pr.title"
        :date="pr.created_at"
        :body="pr.body"
        :pr-url="pr.html_url"
      ></pull-request-card>
    </v-flex>
  </v-layout>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { fetchRepoPRs } from '~/ApiClient'
import PullRequestCard from '~/components/PullRequestCard'

export default {
  props: {
    repoId: { type: Number, required: true }
  },
  components: {
    PullRequestCard
  },
  data () {
    return { prs: null }
  },
  async mounted () {
    const fetchedPRs = await fetchRepoPRs(this.repoId)
    this.prs = fetchedPRs
  }
}
</script>

<style>
</style>

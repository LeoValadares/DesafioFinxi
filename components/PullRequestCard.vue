<template>
  <v-card class="text-xs-left" :href="prUrl" target="_blank">
    <!-- pr title -->
    <v-layout row>
      <!-- card title -->
      <v-flex xs10>
        <v-card-title>
          <div>
            <h1>{{ title }}</h1>
            <h3>by {{ authorName }} @ {{ date }}</h3>
          </div>
        </v-card-title>
      </v-flex>
      <!-- card body -->
      <v-flex xs2>
        <v-card-media 
          :src="authorPicUrl" 
          height="136px"
        contain></v-card-media>
      </v-flex>
    </v-layout>
    <!-- pr body -->
    <v-layout row>
      <v-flex>
        <p class="pa-4">{{ body }}</p>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    authorName: { type: String, required: true },
    authorPicUrl: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    body: { type: String, required: true },
    prUrl: { type: String, required: true }
  }
}
</script>

<style scoped>
.card__media {
  border-radius: 50%;
}

div.flex {
  overflow: hidden;
  word-wrap: break-word;
}
</style>


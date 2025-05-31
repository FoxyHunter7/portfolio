<script setup lang="ts">
import type { BlogPostOverview } from '@/types/BlogDataTypes';
import { useRouter } from 'vue-router';

const { blogPost } = defineProps<{
  blogPost: BlogPostOverview
}>();

const router = useRouter();

function formatDateLocal(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(date);
}

function openPost() {
  router.push(`/posts/${blogPost.slug}`)
}
</script>

<template>
  <div class="blog-card" @click="openPost" tabindex="0">
    <div class="thumbnail" v-if="blogPost.thumbnail_url">
      <img :src="blogPost.thumbnail_url" :alt="blogPost.title" />
    </div>
    <div class="content">
      <h2>{{ blogPost.title }}</h2>
      <p class="meta">
        Posted <time :datetime="blogPost.date">{{ formatDateLocal(blogPost.date) }}</time>
      </p>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
  box-sizing: border-box;
  background: var(--secondary-background-color);
  border-radius: 0.7rem;
  border: 1px solid var(--primary-background-color);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.12s;
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 0 auto;
  outline: none;
}

.blog-card:focus,
.blog-card:hover {
  box-shadow: 0 6px 16px 0 rgba(240,121,0,0.18), 0 3px 8px 0 rgba(0,0,0,0.12);
  border: 1px solid var(--darker-accent-color);
}

.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.content {
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h2 {
  font-family: var(--secondary-font);
  font-size: 1.5rem;
  color: var(--font-color);
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0,0,0,0.12);
}

.meta {
  font-size: 0.95rem;
  color: var(--darker-font-color);
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .blog-card {
    max-width: 95vw;
    font-size: 0.98rem;
  }
  .content {
    padding: 0.9rem 0.7rem 0.8rem 0.7rem;
  }
}
</style>

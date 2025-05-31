<script setup lang="ts">
import { ServiceFactory } from '@/factories/ServiceFactory';
import type { BlogPost } from '@/types/BlogDataTypes';
import { onMounted, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

const route = useRoute()
const router = useRouter()
const blogPostService = ServiceFactory.getBlogPostService();

const blogPost = ref<BlogPost>();
const failed = ref<boolean>(false);

async function getBlogPost() {
  const post = await blogPostService.getBlogPost(
    (Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug)?.toString()
  );

  if (post === null) {
    failed.value = true;
  } else {
    failed.value = false;
    blogPost.value = post;
    await nextTick();
    hljs.highlightAll();
  }
}

onMounted(getBlogPost);

function formatDateLocal(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(date);
}
</script>

<template>
  <div class="blog-post-wrapper">
    <header class="blog-post-header">
      <button class="back-btn" @click="router.back">← Go Back</button>
      <div class="blog-post-meta" v-if="blogPost">
        <span class="blog-post-date">
          {{ formatDateLocal(blogPost.date) }}
        </span>
      </div>
    </header>

    <img class="gandalf-error" v-if="failed" src="/gandalf.png" alt="gandalf">

    <article
      id="blog-post"
      v-if="blogPost && !failed"
      v-html="blogPost.html"
      class="blog-post-content"
    ></article>
  </div>
</template>

<style>
.blog-post-wrapper {
  max-width: 800px;
  margin: 3rem auto 6rem auto;
  background: var(--secondary-background-color);
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12), 0 1.5px 4px 0 rgba(0,0,0,0.08);
  padding: 2.5rem 2.5rem 3rem 2.5rem;
  min-height: 60vh;
}

.blog-post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1rem;
}

.back-btn {
  background: none;
  border: none;
  color: var(--main-accent-color);
  font-family: var(--primary-font);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.4rem 1rem 0.4rem 0.3rem;
  border-radius: 0.5rem;
  transition: background 0.15s;
  outline: none;
}
.back-btn:hover,
.back-btn:focus {
  color: var(--darker-accent-color);
}

.gandalf-error {
  display: block;
  margin: 0 auto;
  max-height: 60vh;
}

.blog-post-meta {
  color: var(--darker-font-color);
  font-size: 1rem;
  font-style: italic;
  align-self: flex-end;
}

.blog-post-content {
  font-size: 1.18rem;
  line-height: 1.3;
  color: var(--font-color);
  font-family: var(--primary-font);
}

.blog-post-content h1,
.blog-post-content h2,
.blog-post-content h3,
.blog-post-content h4 {
  font-family: var(--secondary-font);
  color: var(--main-accent-color);
  margin: 2.2rem 0 1rem 0;
  line-height: 1.2;
}
.blog-post-content h1 { font-size: 2.2rem; }
.blog-post-content h2 { font-size: 1.7rem; }
.blog-post-content h3 { font-size: 1.3rem; }
.blog-post-content h4 { font-size: 1.1rem; }

.blog-post-content p {
  margin: 1.1rem 0;
}
.blog-post-content blockquote {
  border-left: 4px solid var(--main-accent-color);
  background: rgba(240,121,0,0.07);
  margin: 1.5rem 0;
  padding: 0.8rem 1.2rem;
  font-style: italic;
  color: var(--darker-font-color);
}

.blog-post-content ul,
.blog-post-content ol {
  margin: 1.1rem 0 1.1rem 2rem;
  padding-left: 1.2rem;
}

.blog-post-content img {
  display: block;
  max-width: 100%;
  margin: 1.5rem auto;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}

.blog-post-content a,
.blog-post-content a:visited {
  color: var(--main-accent-color);
  text-decoration: underline;
  transition: color 0.15s;
  word-break: break-all;
}
.blog-post-content a:hover,
.blog-post-content a:focus {
  color: var(--lighter-accent-color);
  text-decoration: underline wavy;
}

.blog-post-content pre,
.blog-post-content code {
  background: rgb(36, 33, 36);
  color: var(--lighter-accent-color);
  border-radius: 0.4rem;
  padding: 0.2em 0.5em;
  font-family: "Fira Mono", "Consolas", "Menlo", monospace;
  font-size: 0.8rem;
}
.blog-post-content pre {
  padding: 1.1em;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.blog-post-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}
.blog-post-content th,
.blog-post-content td {
  border: 1px solid var(--darker-accent-color);
  padding: 0.6em 1em;
  text-align: left;
}
.blog-post-content th {
  color: var(--main-accent-color);
  background-color: var(--primary-background-color);
}

@media (max-width: 700px) {
  .blog-post-wrapper {
    padding: 1.2rem 0.4rem 2rem 0.4rem;
    margin: 1rem 1rem 4rem 1rem;
    background: none;
    border-radius: 0;
    box-shadow: none;
  }
  .blog-post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
  .blog-post-content th {
    color: var(--main-accent-color);
    background-color: var(--secondary-background-color);
  }
}
</style>

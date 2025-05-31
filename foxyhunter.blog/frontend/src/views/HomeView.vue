<script setup lang="ts">
import BlogPostCard from '@/components/BlogPostCard.vue';
import { ServiceFactory } from '@/factories/ServiceFactory';
import type { BlogPostOverview } from '@/types/BlogDataTypes';
import { onMounted, ref } from 'vue';

const blogPostService = ServiceFactory.getBlogPostService();

const blogPosts = ref<BlogPostOverview[]>([]);
const failed = ref<boolean>(false);

async function getBlogPosts() {
  const posts = await blogPostService.getBlogPosts();

  if (posts === null) {
    failed.value = true;
  } else {
    failed.value = false;
    blogPosts.value = posts;
  }
}

onMounted(getBlogPosts);
</script>

<template>
  <div class="blog-overview-layout">
    <aside class="sidebar">
      <img src="/fox-writing.png" alt="FoxyHunter mascot" />
      <h1>FoxyHunter's Blog</h1>
    </aside>

    <main class="main-content">
      <div class="posts-grid">
        <BlogPostCard
          v-for="blogPost in blogPosts"
          :key="blogPost.slug"
          :blog-post="blogPost"
        />
      </div>
    </main>

    <aside class="timeline">
      <div class="timeline-year">2025</div>
      <div class="timeline-bar"></div>
    </aside>
  </div>
</template>

<style lang="css" scoped>
.blog-overview-layout {
  display: grid;
  grid-template-columns: 240px 1fr 80px;
  background: var(--primary-background-color);
}

.sidebar {
  background: var(--secondary-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 2rem 1rem;
  border-right: 2px solid var(--darker-accent-color);
  position: sticky;
  top: 0;
}

.sidebar img {
  max-width: 160px;
  margin-bottom: 2rem;
}

.sidebar h1 {
  font-size: 2.1rem;
  text-align: center;
  font-family: var(--secondary-font);
  color: var(--font-color);
}

/* Posts grid */
.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem 1rem 6rem 1rem;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(306px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
}

.timeline-bar {
  width: 4px;
  height: 80vh;
  background: var(--darker-accent-color);
  border-radius: 2px;
  margin-bottom: 1rem;
}

.timeline-years {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.timeline-year {
  color: var(--main-accent-color);
  background: var(--primary-background-color);
  padding: 0.3rem 1.1rem;
  border-radius: 1rem;
  font-family: var(--secondary-font);
  font-size: 1.1rem;
  margin-top: 1rem;
  border: 2px solid var(--main-accent-color);
}

@media (max-width: 1000px) {
  .blog-overview-layout {
    display: block;
  }
  .sidebar {
    background: none;
    border-right: none;
    position: static;
    padding: 2rem 0 1rem 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    box-shadow: none;
  }
  .sidebar img {
    max-width: 70px;
    margin-bottom: 0;
    margin-right: 1rem;
  }
  .sidebar h1 {
    font-size: 1.5rem;
    margin: 0;
    text-align: left;
  }
  .timeline {
    display: none;
  }
  .main-content {
    padding: 2rem 1rem 2rem 1rem;
  }
  .posts-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>

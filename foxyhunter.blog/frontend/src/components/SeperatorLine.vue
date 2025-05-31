<script setup lang="ts">
</script>

<template>
  <div class="seperator">
    <div class="diamond">
        <div class="diamond"></div>
    </div>
    <div class="diamond">
        <div class="diamond">
            <div class="square"></div>
        </div>
    </div>
    <div class="diamond">
        <div class="diamond"></div>
    </div>
  </div>
</template>

<style scoped lang="css">
.seperator {
    display: flex;
    justify-content: space-between;
    height: 4rem;
    transform: translateY(2rem);
    margin: 0 10%;

    z-index: 10;

    position: relative;
}

.diamond {
    height: 100%;
    aspect-ratio: 1/1;
    background-color: var(--primary-background-color);
    border: 2px var(--darker-accent-color) solid;
    transform: rotate(45deg);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 10;
}

.square {
    height: 100%;
    aspect-ratio: 1/1;
    background-color: var(--primary-background-color);
    border: 2px var(--darker-accent-color) solid;

    z-index: 10;
}

.diamond .square {
    height: 40%;
    border-radius: 25%;
    transform: rotate(45deg);
}
</style>
